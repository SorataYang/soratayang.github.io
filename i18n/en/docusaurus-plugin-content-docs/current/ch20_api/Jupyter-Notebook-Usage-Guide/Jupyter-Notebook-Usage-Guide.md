# Using Jupyter Notebook in VS Code

Jupyter Notebook is an open-source interactive computing environment that allows you to combine Markdown documents and executable code. VS Code natively supports Jupyter Notebook.

## Environment Preparation

### Install Dependencies

1. **Python Environment**: Ensure Python is installed.
2. **Jupyter Package**: Execute `pip install jupyter` in the terminal.
3. **VS Code Extensions**: Install the Python and Jupyter extensions.

### Select Interpreter

1. Press `Ctrl+Shift+P` to open the Command Palette.
2. Type "Python: Select Interpreter".
3. Select your installed Python environment.

## Creating and Opening Notebooks

### Create a New Notebook

**Method 1**: Using the Command Palette
1. Press `Ctrl+Shift+P`.
2. Type "Create: New Jupyter Notebook".
3. Press Enter.

**Method 2**: Creating a file directly
- Create a file with the `.ipynb` extension.

### Select Kernel

Click the kernel selector in the top right corner and select the Python kernel.

## Running Code Cells

### Common Shortcuts

| Shortcut | Function |
|----------|----------|
| `Ctrl+Enter` | Run current cell |
| `Shift+Enter` | Run current cell and jump to next |
| `Alt+Enter` | Run current cell and insert new one below |

### Batch Running

- **Run All**: Run all cells.
- **Run All Above**: Run all cells above the current one.
- **Run All Below**: Run all cells below the current one.

## Cell Operations

### Cell Modes

| Mode | Characteristics | How to Enter |
|------|-----------------|--------------|
| **Command Mode** | Blue bar on left; execute shortcut commands. | Press `Esc` |
| **Edit Mode** | Green bar on left; edit content. | Press `Enter` |

### Adding Cells

- Click the **+** button between cells.
- In Command Mode, press `A` to add above, `B` to add below.

### Deleting Cells

- Click the Delete icon in the cell toolbar.
- In Command Mode, press `dd`.

### Switching Cell Type

In Command Mode:
- Press `M` to switch to Markdown.
- Press `Y` to switch to Code.

## Variable Explorer

1. Run a code cell containing variables.
2. Click the "Variables" icon in the toolbar.
3. View all variables in the current session.

## Saving and Exporting

- Use `Ctrl+S` to save.
- Export to Python (.py), HTML, or PDF via the Export button.

## Debugging

### Run by Line

Click "Run by Line" button for step-by-step execution.

### Full Debugging

1. Set breakpoints by clicking the left margin.
2. Click "Debug Cell" to start debugging.
3. Use the Debug toolbar to control execution.

## Search

Press `Ctrl+F` to search. Use the funnel icon to filter search scope.
