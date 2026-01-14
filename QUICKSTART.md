# Quick Start Guide

Get up and running with Word document comparison in 5 minutes!

## Step 1: Prerequisites Check

```bash
# Check Node.js version (should be 20+)
node --version

# Check Java version (should be 8+)
java -version

# Verify JAVA_HOME is set
echo $JAVA_HOME  # Linux/macOS
echo %JAVA_HOME% # Windows CMD
$env:JAVA_HOME   # Windows PowerShell
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Add Sample Files

Place your test files in the `sample-files/` directory:

```bash
# Copy your Word documents
cp /path/to/your/document.docx sample-files/source.docx
cp /path/to/your/document.docx sample-files/target.docx
```

**Note:** You can use the sample files from the GitHub examples repository if available.

## Step 4: Run Basic Comparison

```bash
npm run example:basic
```

This will:
1. Compare `sample-files/source.docx` with `sample-files/target.docx`
2. Save the result to `output/result_basic.docx`
3. Display the comparison status

## Step 5: View Results

Open the result file:
- **Windows:** `output\result_basic.docx`
- **Linux/macOS:** `output/result_basic.docx`

The result document will show:
- **Blue** text = Added content
- **Red** text = Deleted content  
- **Green** text = Modified content

## Next Steps

Try other examples:

```bash
# Advanced comparison with custom styles
npm run example:advanced

# Password-protected documents
npm run example:password

# Stream-based comparison
npm run example:stream
```

## Troubleshooting

### "Cannot find module '@groupdocs/groupdocs.comparison'"
```bash
npm install
```

### "npm.ps1 cannot be loaded because running scripts is disabled" (PowerShell Execution Policy)

This error occurs when PowerShell's execution policy prevents npm scripts from running.

**Quick Fix (Current Session Only):**
```powershell
# Set execution policy for current session
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

# Now try running npm again
npm run example:basic
```

**Permanent Fix (Recommended):**
```powershell
# Run PowerShell as Administrator, then:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Verify the change
Get-ExecutionPolicy -List
```

**Alternative: Use Command Prompt (CMD) instead**
If you prefer not to change PowerShell settings, you can use Windows Command Prompt (CMD) instead:
```cmd
npm run example:basic
```

**Understanding Execution Policies:**
- `Restricted` - No scripts can run (default on some systems)
- `RemoteSigned` - Local scripts can run, downloaded scripts need to be signed (recommended)
- `Unrestricted` - All scripts can run (less secure)

### "JAVA_HOME is not set" or "Java is not recognized"

**Step 1: Check if Java is installed**
```powershell
# Windows PowerShell
java -version

# If you get "command not found", Java is not installed or not in PATH
```

**Step 2: Install Java (if not installed)**
1. Download Java JDK 8 or higher from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
2. Run the installer and note the installation path (typically `C:\Program Files\Java\jdk-XX`)

**Step 3: Find Java installation path**
```powershell
# Check common installation locations
Get-ChildItem "C:\Program Files\Java" -ErrorAction SilentlyContinue
Get-ChildItem "C:\Program Files (x86)\Java" -ErrorAction SilentlyContinue

# Or check registry
Get-ItemProperty "HKLM:\SOFTWARE\JavaSoft\Java Development Kit\*" -ErrorAction SilentlyContinue | Select-Object PSChildName, JavaHome
```

**Step 4: Set JAVA_HOME (Temporary - for current session only)**
**Windows PowerShell:**
```powershell
# Replace with your actual Java installation path
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"
$env:Path="$env:JAVA_HOME\bin;$env:Path"

# Verify it's set
$env:JAVA_HOME
java -version
```

**Windows CMD:**
```cmd
set JAVA_HOME=C:\Program Files\Java\jdk-17
set Path=%JAVA_HOME%\bin;%Path%
```

**Linux/macOS:**
```bash
export JAVA_HOME=/usr/lib/jvm/java-17
export PATH="$JAVA_HOME/bin:$PATH"
```

**Step 5: Set JAVA_HOME Permanently (Recommended)**
**Windows:**
1. Open System Properties → Environment Variables
2. Under "System variables", click "New"
3. Variable name: `JAVA_HOME`
4. Variable value: `C:\Program Files\Java\jdk-17` (your Java path)
5. Edit the `Path` variable and add: `%JAVA_HOME%\bin`
6. Click OK and restart your terminal/PowerShell

**Or use PowerShell (Run as Administrator):**
```powershell
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Java\jdk-17", "Machine")
$oldPath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
[System.Environment]::SetEnvironmentVariable("Path", "$oldPath;C:\Program Files\Java\jdk-17\bin", "Machine")
```

### "File not found"
Make sure your sample files are in the `sample-files/` directory with the correct names:
- `source.docx`
- `target.docx`

## Need Help?

- Check the full [README.md](README.md) for detailed documentation
- Visit [GroupDocs.Comparison Documentation](https://docs.groupdocs.com/comparison/nodejs-java/)
- Ask questions on [GroupDocs Forum](https://forum.groupdocs.com/c/comparison/12)

---

**That's it!** You're now ready to compare Word documents programmatically. 🎉
