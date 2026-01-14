/**
 * Advanced Word Document Comparison Example
 * 
 * This example demonstrates advanced comparison features including:
 * - Custom styling for inserted, deleted, and changed content
 * - Summary page generation
 * - Custom color schemes
 */

'use strict';

const { compareWordDocumentsWithStyles } = require('../compareWordDocuments');
const { setLicense } = require('../utils/licenseHelper');
const { PATHS, FILE_NAMES } = require('../utils/constants');
const path = require('path');
const java = require('java');
const Color = java.import('java.awt.Color');

/**
 * Demonstrates advanced Word document comparison with custom styling options.
 * @remarks This example uses GroupDocs.Comparison with custom StyleSettings to control
 *          how different types of changes appear in the result document. It configures
 *          separate styles for inserted, deleted, and changed content, and can generate
 *          a summary page showing all changes at a glance. Uses Java Color objects for styling.
 */
async function main() {
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

    console.log('\nRunning advanced comparison with custom styles...');
    console.log('  - Inserted items: Blue highlight, bold, underlined');
    console.log('  - Deleted items: Red highlight, bold, strikethrough');
    console.log('  - Changed items: Green highlight, bold, underlined');
    console.log('  - Summary page: Enabled\n');

    // Perform comparison with custom styles
    await compareWordDocumentsWithStyles(sourceWord, targetWord, resultPath, styleConfig);

    console.log('Advanced comparison example completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error in advanced comparison example:', error.message);
    process.exit(1);
  }
}

// Run the example
if (require.main === module) {
  main();
}

module.exports = main;
