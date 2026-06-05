// Build-output image optimization for local/Tauri manuals.
//
// This script only mutates the generated build-local output. It converts PNG
// files to lossless WebP when doing so reduces size, updates text references,
// and removes the original PNG files that were replaced.
//
// Usage: node scripts/optimize-local-images.mjs <build-dir>

import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const TEXT_FILE_EXTS = new Set(['.html', '.js', '.css', '.json', '.txt', '.xml']);

async function walk(dir, fn) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, fn);
    } else if (entry.isFile()) {
      await fn(fullPath);
    }
  }
}

function toUrlPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function referenceVariants(relPath) {
  const encodedRel = encodeURI(relPath);
  const escapedRel = relPath.replace(/[^\x00-\x7F]/g, (char) => {
    return [...char]
      .map((part) => `\\u${part.codePointAt(0).toString(16).padStart(4, '0')}`)
      .join('');
  });
  const variants = new Set([
    relPath,
    `/${relPath}`,
    encodedRel,
    `/${encodedRel}`,
    escapedRel,
    `/${escapedRel}`,
  ]);
  return [...variants];
}

async function commandExists(command) {
  try {
    await execFileAsync(command, ['-version'], { windowsHide: true });
    return true;
  } catch {
    return false;
  }
}

async function convertPngToWebp(sourcePath, targetPath) {
  await execFileAsync('magick', [
    sourcePath,
    '-define',
    'webp:lossless=true',
    targetPath,
  ], {
    windowsHide: true,
    maxBuffer: 1024 * 1024 * 8,
  });
}

async function main() {
  const outDir = process.argv[2];
  if (!outDir) {
    console.error('Usage: node scripts/optimize-local-images.mjs <build-dir>');
    process.exit(1);
  }

  if (!(await commandExists('magick'))) {
    console.warn('[optimize-local-images] ImageMagick `magick` not found; skipped image optimization.');
    return;
  }

  const absOut = path.resolve(outDir);
  const replacements = new Map();
  let scanned = 0;
  let converted = 0;
  let kept = 0;
  let failed = 0;
  let beforeBytes = 0;
  let afterBytes = 0;

  await walk(absOut, async (filePath) => {
    if (path.extname(filePath).toLowerCase() !== '.png') return;

    scanned++;
    const originalStat = await fs.stat(filePath);
    const webpPath = filePath.replace(/\.png$/i, '.webp');

    try {
      await convertPngToWebp(filePath, webpPath);
      const webpStat = await fs.stat(webpPath);
      if (webpStat.size < originalStat.size) {
        await fs.unlink(filePath);
        converted++;
        beforeBytes += originalStat.size;
        afterBytes += webpStat.size;

        const relPng = toUrlPath(path.relative(absOut, filePath));
        const relWebp = relPng.replace(/\.png$/i, '.webp');
        replacements.set(relPng, relWebp);
      } else {
        await fs.unlink(webpPath);
        kept++;
      }
    } catch (err) {
      failed++;
      await fs.unlink(webpPath).catch(() => {});
      console.warn(`[optimize-local-images] failed ${filePath}: ${err.message}`);
    }
  });

  let patchedFiles = 0;
  if (replacements.size > 0) {
    await walk(absOut, async (filePath) => {
      if (!TEXT_FILE_EXTS.has(path.extname(filePath).toLowerCase())) return;

      const original = await fs.readFile(filePath, 'utf8');
      let next = original;
      for (const [from, to] of replacements) {
        const fromVariants = referenceVariants(from);
        const toVariants = referenceVariants(to);
        fromVariants.forEach((fromVariant, index) => {
          next = next.replaceAll(fromVariant, toVariants[index]);
        });
      }

      if (next !== original) {
        await fs.writeFile(filePath, next, 'utf8');
        patchedFiles++;
      }
    });
  }

  const savedBytes = beforeBytes - afterBytes;
  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
  console.log('[optimize-local-images]');
  console.log(`  scanned ${scanned} PNG file(s)`);
  console.log(`  converted ${converted} PNG file(s) to lossless WebP`);
  console.log(`  kept ${kept} PNG file(s), failed ${failed}`);
  console.log(`  patched ${patchedFiles} text file(s)`);
  console.log(`  saved ${mb(savedBytes)} MB (${mb(beforeBytes)} MB -> ${mb(afterBytes)} MB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
