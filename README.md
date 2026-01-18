# Compare Word Documents with Node.js

<div align="center">

[![Product Page](https://img.shields.io/badge/Product%20Page-2865E0?style=for-the-badge&logo=appveyor&logoColor=white)](https://products.groupdocs.com/comparison)
[![Docs](https://img.shields.io/badge/Docs-2865E0?style=for-the-badge&logo=Hugo&logoColor=white)](https://docs.groupdocs.com/comparison/nodejs-java/)
[![Blog](https://img.shields.io/badge/Blog-2865E0?style=for-the-badge&logo=WordPress&logoColor=white)](https://blog.groupdocs.com/categories/groupdocs.comparison-product-family/)
[![Free Support](https://img.shields.io/badge/Free%20Support-2865E0?style=for-the-badge&logo=Discourse&logoColor=white)](https://forum.groupdocs.com/c/comparison/12)
[![Temporary License](https://img.shields.io/badge/Temporary%20License-2865E0?style=for-the-badge&logo=rocket&logoColor=white)](https://purchase.groupdocs.com/temp-license/107398)

</div>

## 🚀 Quick Start

Get started with GroupDocs.Comparison for Node.js to compare Word documents programmatically. This repository provides ready-to-use examples that demonstrate document comparison with change tracking and customizable styling. Perfect for developers who need to automate document review or version control.

## ✨ What You'll Learn

- Perform basic Word document comparison using default settings.
- Apply custom styling to highlight inserted, deleted, and changed content.
- Compare password‑protected documents by providing load options.
- Use Java input streams for document comparison without file‑system paths.
- Generate a summary page that aggregates all changes in the result document.

## 📋 Table of Contents

- [About This Repository](#-about-this-repository)
- [Key Features](#-key-features)
- [Prerequisites](#-prerequisites)
- [Repository Structure](#-repository-structure)
- [Implementation Examples](#-implementation-examples)
- [Related Resources](#-related-resources)
- [Keywords](#-keywords)

## 📖 About This Repository

This repository demonstrates comparing Word documents using GroupDocs.Comparison for Node.js via Java. It provides ready‑to‑use comparison scripts that enable developers to quickly identify document differences without manual review. The examples are designed for developers who need to integrate document comparison into their applications.

## 🔑 Key Features

### GroupDocs.Comparison Capabilities

GroupDocs.Comparison provides powerful document processing capabilities:

| Feature | Description |
|---------|-------------|
|  **Document Comparison** | Compare two or more documents and detect insertions, deletions, and modifications. |
|  **Change Highlighting** | Automatic visual cues (colors, font styles) for added, removed, or altered content. |
|  **Multi‑format Support** | Works with DOCX, PDF, PPTX, and many other popular formats. |
|  **Password‑Protected Handling** | Load and compare encrypted documents by supplying passwords. |
|  **Summary Page Generation** | Produce a consolidated page summarising all detected changes. |

### What This Repository Demonstrates

- Basic comparison with default colors
- Advanced comparison with custom styling
- Comparison of password‑protected Word files
- Stream‑based comparison using Java input streams

## Prerequisites

Before you begin, ensure you have:

- **📦 Runtime** – Node.js >=20.0.0
- **📦 Java** – JRE/JDK 8+ (Java 17 recommended)
- **📦 License** – Temporary GroupDocs.Comparison license (obtain via the Temporary License badge above)

## Repository Structure

```
groupdocs-comparison-word-documents-nodejs/
│
├── src/
│   ├── compareWordDocuments.js
│   ├── examples/
│   │   ├── basicComparison.js
│   │   ├── advancedComparison.js
│   │   ├── passwordProtectedComparison.js
│   │   └── streamComparison.js
│   └── utils/
│       └── fileHelper.js
├── sample-files/                # Input Word documents (add your own samples here)
├── output/                      # Generated result documents (created at runtime)
├── QUICKSTART.md
├── package.json
└── package-lock.json
```

### File Overview

- **compareWordDocuments.js** – Core functions for comparing Word files, creating style settings, and performing advanced comparisons.
- **basicComparison.js** – Minimal example showing default comparison.
- **advancedComparison.js** – Example with custom styling and summary page generation.
- **passwordProtectedComparison.js** – Demonstrates handling of password‑protected documents.
- **streamComparison.js** – Shows how to compare documents using Java input streams.
- **fileHelper.js** – Helper utilities for file existence checks and directory creation.
- **package.json** – Project metadata and dependency declarations.
- **package-lock.json** – Exact versions of all npm dependencies.
- **QUICKSTART.md** – Step‑by‑step guide for getting started quickly.
- **README.md** – This documentation file.

## Implementation Examples

### Example 1: Compares two Word documents and generates a result document highlighting differences.

This function validates input files, prepares the output directory, configures `Comparer` with optional passwords, adds the target document, and executes the comparison. Inserted content appears in blue, deleted in red, and modified in green.

```javascript
  // Validate input files exist
  if (!fileExists(sourceWordPath)) {
    throw new Error(`Source Word file not found: ${sourceWordPath}`);
  }
  if (!fileExists(targetWordPath)) {
    throw new Error(`Target Word file not found: ${targetWordPath}`);
  }

  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputPath);
  ensureDirectoryExists(outputDir);

  // Initialize comparer with source Word document
  let comparer;
  if (options.loadOptions?.sourcePassword) {
    const loadOptions = new groupdocs.LoadOptions(options.loadOptions.sourcePassword);
    comparer = new groupdocs.Comparer(sourceWordPath, loadOptions);
  } else {
    comparer = new groupdocs.Comparer(sourceWordPath);
  }

  // Add target Word document
  if (options.loadOptions?.targetPassword) {
    const targetLoadOptions = new groupdocs.LoadOptions(options.loadOptions.targetPassword);
    comparer.add(targetWordPath, targetLoadOptions);
  } else {
    comparer.add(targetWordPath);
  }

  // Perform comparison
  const compareOptions = options.compareOptions || null;
  
  if (compareOptions) {
    await comparer.compare(outputPath, compareOptions);
  } else {
    await comparer.compare(outputPath);
  }

  return outputPath;
```

**What This Example Shows:**

The snippet demonstrates the end‑to‑end workflow for a standard Word‑to‑Word comparison, including input validation, optional password handling, and the execution of the comparison request. It returns the path to the generated result document where changes are visually highlighted.

---

### Example 2: Creates style settings for comparison options with customizable formatting.

This helper builds a `StyleSettings` object, allowing callers to specify highlight color, font color, and text decorations such as bold, underline, italic, or strikethrough. The function falls back to sensible defaults when a particular property is omitted.

```javascript
  const java = require('java');
  const Color = java.import('java.awt.Color');
  const styleSettings = new groupdocs.StyleSettings();

  styleSettings.setHighlightColor(styleConfig?.highlightColor || defaultColor);
  styleSettings.setFontColor(styleConfig?.fontColor || defaultColor);
  styleSettings.setBold(styleConfig?.bold !== false);
  styleSettings.setUnderline(styleConfig?.underline || false);
  styleSettings.setItalic(styleConfig?.italic || false);
  styleSettings.setStrikethrough(styleConfig?.strikethrough || false);

  return styleSettings;
```

**What This Example Shows:**

The code illustrates how to configure visual attributes for each type of change (inserted, deleted, or modified). By exposing a reusable function, developers can easily apply consistent styling across multiple comparison operations.

---

### Example 3: Compares Word documents with custom styling options for different change types.

This function assembles `CompareOptions` with distinct `StyleSettings` for inserted, deleted, and changed items, using Java `Color` constants. It also optionally enables a summary page that consolidates all changes.

```javascript
  const java = require('java');
  const Color = java.import('java.awt.Color');

  // Create comparison options
  const compareOptions = new groupdocs.CompareOptions();

  // Configure styles for inserted, deleted, and changed items
  compareOptions.setInsertedItemStyle(
    createStyleSettings(styleConfig.inserted, Color.BLUE)
  );
  compareOptions.setDeletedItemStyle(
    createStyleSettings(styleConfig.deleted, Color.RED)
  );
  compareOptions.setChangedItemStyle(
    createStyleSettings(styleConfig.changed, Color.GREEN)
  );

  // Generate summary page if requested
  if (styleConfig.generateSummaryPage !== false) {
    compareOptions.setGenerateSummaryPage(true);
  }

  return compareWordDocuments(sourceWordPath, targetWordPath, outputPath, {
    compareOptions: compareOptions
  });
```

**What This Example Shows:**

By constructing a `CompareOptions` object with tailored `StyleSettings`, the example demonstrates fine‑grained control over how each change type is rendered in the output document. The optional summary page provides a high‑level overview of all differences.

---

### Example 4: Demonstrates basic Word document comparison using file paths.

The script sets the license, resolves file locations, and calls the core `compareWordDocuments` function with default options. It exits with a success status on completion.

```javascript
  try {
    // Set license before using any comparison methods
    setLicense();

    // Define file paths
    const sourceWord = path.join(PATHS.SAMPLE_FILES, FILE_NAMES.SOURCE);
    const targetWord = path.join(PATHS.SAMPLE_FILES, FILE_NAMES.TARGET);
    const resultPath = path.join(PATHS.OUTPUT, FILE_NAMES.RESULT_BASIC);

    // Perform comparison
    await compareWordDocuments(sourceWord, targetWord, resultPath);

    process.exit(0);
  } catch (error) {
    console.error('Error in basic comparison example:', error.message);
    process.exit(1);
  }
```

**What This Example Shows:**
A straightforward usage scenario that compares two Word documents located in the `sample-files` folder. It relies on the default styling (blue insertions, red deletions, green modifications) and produces `result_basic.docx` in the `output` directory.

---

### Example 5: Demonstrates advanced Word document comparison with custom styling options.

The script configures a rich `styleConfig` object, specifying colors, boldness, underline, and summary page generation. It then invokes `compareWordDocumentsWithStyles` to apply these settings.

```javascript
  try {
    // Set license before using any comparison methods
    setLicense();

    // Define file paths
    const sourceWord = path.join(PATHS.SAMPLE_FILES, FILE_NAMES.SOURCE);
    const targetWord = path.join(PATHS.SAMPLE_FILES, FILE_NAMES.TARGET);
    const resultPath = path.join(PATHS.OUTPUT, FILE_NAMES.RESULT_ADVANCED);

    // Configure custom styles
    const styleConfig = {
      inserted: {
        highlightColor: Color.BLUE,
        fontColor: Color.BLUE,
        bold: true,
        underline: true,
        italic: false,
        strikethrough: false
      },
      deleted: {
        highlightColor: Color.RED,
        fontColor: Color.RED,
        bold: true,
        strikethrough: true,
        underline: false,
        italic: false
      },
      changed: {
        highlightColor: Color.GREEN,
        fontColor: Color.GREEN,
        bold: true,
        underline: true,
        italic: false,
        strikethrough: false
      },
      generateSummaryPage: true
    };

    // Perform comparison with custom styles
    await compareWordDocumentsWithStyles(sourceWord, targetWord, resultPath, styleConfig);

    process.exit(0);
  } catch (error) {
    console.error('Error in advanced comparison example:', error.message);
    process.exit(1);
  }
```

**What This Example Shows:**

An in‑depth demonstration of how to apply distinct visual treatments for inserted, deleted, and changed content, as well as how to generate a summary page that aggregates all modifications for quick review.

---

### Example 6: Demonstrates comparison of password‑protected Word documents.

The example loads source and target files that require passwords, supplying those credentials via `loadOptions`. It handles errors related to incorrect passwords and logs helpful guidance.

```javascript
  try {
    // Set license before using any comparison methods
    setLicense();

    // Define file paths
    const sourceWord = path.join(PATHS.SAMPLE_FILES, FILE_NAMES.SOURCE_PROTECTED);
    const targetWord = path.join(PATHS.SAMPLE_FILES, FILE_NAMES.TARGET_PROTECTED);
    const resultPath = path.join(PATHS.OUTPUT, FILE_NAMES.RESULT_PROTECTED);

    // Define passwords (replace with actual passwords)
    const sourcePassword = 'source_password_123';
    const targetPassword = 'target_password_123';

    // Perform comparison with password options
    await compareWordDocuments(sourceWord, targetWord, resultPath, {
      loadOptions: {
        sourcePassword: sourcePassword,
        targetPassword: targetPassword
      }
    });

    process.exit(0);
  } catch (error) {
    if (error.message.includes('password') || error.message.includes('Password')) {
      console.error('\n✗ Password error:', error.message);
      console.error('  Please ensure:');
      console.error('  1. The source Word file exists and password is correct');
      console.error('  2. The target Word file exists and password is correct');
      console.error('  3. Update the passwords in this file if needed');
    } else {
      console.error('Error in password-protected comparison example:', error.message);
    }
    process.exit(1);
  }
```

**What This Example Shows:**

How to handle encrypted Word documents by providing the appropriate passwords for both source and target files. The snippet also includes robust error handling to guide developers when password‑related issues arise.

---

### Example 7: Demonstrates Word document comparison using Java input streams instead of file paths.

The script creates `FileInputStream` objects for source and target files, passes them to the `Comparer`, runs the comparison, and ensures streams are closed afterwards. This approach is useful when documents are obtained from memory or network sources.

```javascript
  try {
    // Set license before using any comparison methods
    setLicense();

    // Define file paths
    const sourceWord = path.join(PATHS.SAMPLE_FILES, FILE_NAMES.SOURCE);
    const targetWord = path.join(PATHS.SAMPLE_FILES, FILE_NAMES.TARGET);
    const resultPath = path.join(PATHS.OUTPUT, FILE_NAMES.RESULT_STREAM);

    // Validate files exist
    if (!fileExists(sourceWord)) {
      throw new Error(`Source Word file not found: ${sourceWord}`);
    }
    if (!fileExists(targetWord)) {
      throw new Error(`Target Word file not found: ${targetWord}`);
    }

    // Create output directory if it doesn't exist
    ensureDirectoryExists(PATHS.OUTPUT);

    // Create Java input streams for source and target documents
    const sourceInputStream = new FileInputStream(sourceWord);
    const targetInputStream = new FileInputStream(targetWord);

    // Initialize comparer with source Word stream
    const comparer = new groupdocs.Comparer(sourceInputStream);

    // Add target Word document stream
    comparer.add(targetInputStream);

    // Perform comparison
    await comparer.compare(resultPath);

    // Close streams (Java streams are automatically managed, but good practice)
    sourceInputStream.close();
    targetInputStream.close();

    process.exit(0);
  } catch (error) {
    console.error('Error in stream comparison example:', error.message);
    console.error(error);
    process.exit(1);
  }
```

**What This Example Shows:**

A stream‑based workflow that avoids writing temporary files to disk. It is ideal for scenarios where documents are sourced from databases, cloud storage, or HTTP responses.

---

## Related Resources

Explore these additional resources to deepen your understanding of Word document comparison:

* **[**Optimize Document Comparison Performance: Scale to Millions of Files with Node.js**]([https://docs.groupdocs.com/comparison/nodejs-java/compare-word-documents](https://blog.groupdocs.com/comparison/optimize-document-comparison-performance-scale-millions-files-nodejs/))

* **[**Legal Document Comparison API: Automate Contract Review with Node.js**](https://blog.groupdocs.com/comparison/legal-document-comparison-api-contract-review-automation-nodejs/)

* **[**Handling Password‑Protected Documents with GroupDocs.Comparison**](https://docs.groupdocs.com/comparison/nodejs-java/password-protected) – Strategies for loading and comparing encrypted files.

## 🏷️ Keywords

`GroupDocs.Comparison`, `Node.js`, `Java`, `Word`, `DOCX`, `document comparison`, `compare documents`, `change tracking`, `password protection`, `custom styles`, `summary page`, `API`, `SDK`, `license`, `npm`, `JavaScript`, `file streams`, `highlight colors`, `inserted content`, `deleted content`, `modified content`, `automation`

---

<div align="center">

**Need help?** [Get Free Support](https://forum.groupdocs.com/c/comparison/12) | [Get Temporary License](https://purchase.groupdocs.com/temp-license/107398)

</div>
