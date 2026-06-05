// Copies the Tauri release executable to a stable per-locale output directory.
//
// Tauri uses the Rust package name for the exe file, so the zh/en builds both
// create target/release/qiaotong-manual.exe. Keeping locale-specific copies
// avoids accidental overwrite/confusion when building both editions.
//
// Usage: node scripts/copy-tauri-exe.mjs <zh|en>

import fs from 'node:fs/promises';
import path from 'node:path';

const locale = process.argv[2] === 'en' ? 'en' : 'zh';
const rootDir = process.cwd();
const sourceExe = path.join(rootDir, 'src-tauri', 'target', 'release', 'qiaotong-manual.exe');
const outDir = path.join(rootDir, 'release-local', locale);
const outName = `qiaotong-manual-${locale}.exe`;
const outExe = path.join(outDir, outName);

async function main() {
  await fs.access(sourceExe);
  await fs.mkdir(outDir, { recursive: true });
  await fs.copyFile(sourceExe, outExe);
  console.log(`[copy-tauri-exe] copied ${sourceExe}`);
  console.log(`[copy-tauri-exe] wrote ${outExe}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
