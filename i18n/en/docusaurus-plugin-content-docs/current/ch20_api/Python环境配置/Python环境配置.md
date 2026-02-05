# VSCode + Python Development Environment Configuration Guide

This article introduces how to configure the Python development environment on Windows, including Python interpreter installation, VSCode editor configuration, and the use of package management tools.

## 1. Install Python

### Download Python

1. Visit the Python official website: [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. Click the "Download Python" button to download the latest version.
3. Or select a specific version at the bottom of the page (3.10 or higher is recommended).

### Install Python

1. Run the downloaded installer.
2. **Important**: Check the **"Add Python to PATH"** option.
3. Click "Install Now" to install with default settings.
4. Wait for the installation to complete.

### Verify Installation

Open the Command Prompt (Press `Win+R`, type `cmd`, and press Enter), then execute:

```bash
python --version
```

If the Python version number is displayed, the installation is successful. Type `exit()` to exit the Python interactive mode.

### Manual Environment Variable Configuration (Optional)

If "Add Python to PATH" was not checked during installation, you need to configure it manually:

1. Press `Win+S` and search for "Environment Variables".
2. Click "Edit the system environment variables".
3. Click the "Environment Variables" button.
4. Find `Path` in "User variables" or "System variables".
5. Click "Edit" and add the following paths (adjust based on actual installation path):
   - `C:\Users\YourUsername\AppData\Local\Programs\Python\Python3x\`
   - `C:\Users\YourUsername\AppData\Local\Programs\Python\Python3x\Scripts\`

## 2. Install VSCode

1. Visit the VSCode official website: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
2. Select the Windows version to download.
3. Run the installer and follow the default settings to complete the installation.

## 3. Configure VSCode Python Extension

### Install Python Extension

1. Open VSCode.
2. Press `Ctrl+Shift+X` to open the Extensions Marketplace.
3. Search for "Python".
4. Install the official Python extension provided by Microsoft.

### Select Python Interpreter

1. Press `Ctrl+Shift+P` to open the Command Palette.
2. Type "Python: Select Interpreter".
3. Select your installed Python version.

### Run Python Code

**Method 1**: Use the Run button
- Open a Python file and click the Run button in the top right corner.

**Method 2**: Use the Context Menu
- Right-click in the editor and select "Run Python File in Terminal".

**Method 3**: Use Shortcut Keys
- Press `Ctrl+F5` to run the current file directly.

## 4. Use pip to Install Third-party Libraries

Python's power lies in its rich ecosystem of third-party libraries. Use the pip command to install the required libraries.

### Basic Usage

```bash
# Install a library
pip install library_name

# Install a specific version
pip install library_name==version_number

# Upgrade a library
pip install --upgrade library_name

# Uninstall a library
pip uninstall library_name

# View installed libraries
pip list
```

### Install Qiaotong Library

```bash
pip install qtmodel
```

### Configure Mirror Source (For Users in China)

The default PyPI source may be slow in China. Configure a mirror:

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### Other Common Mirror Sources

| Mirror Source | Address |
|---------------|---------|
| Tsinghua | https://pypi.tuna.tsinghua.edu.cn/simple |
| Aliyun | https://mirrors.aliyun.com/pypi/simple |
| USTC | https://pypi.mirrors.ustc.edu.cn/simple |
