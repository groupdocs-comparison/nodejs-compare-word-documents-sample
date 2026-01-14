/**
 * Basic Word Document Comparison Example
 * 
 * This example demonstrates the simplest way to compare two Word documents
 * using GroupDocs.Comparison for Node.js via Java.
 */

'use strict';

const { compareWordDocuments } = require('../compareWordDocuments');
const { setLicense } = require('../utils/licenseHelper');
const { PATHS, FILE_NAMES } = require('../utils/constants');
const path = require('path');

/**
 * Demonstrates basic Word document comparison using file paths.
 * @remarks This example uses GroupDocs.Comparison to compare two Word documents
 *          from the sample-files directory. The result document highlights differences
 *          with default colors: blue for inserted content, red for deleted content,
 *          and green for modified content. This is the simplest way to compare documents.
 */
async function main() {
  try {
    // Set license before using any comparison methods
    setLicense();

    // Define file paths
    const sourceWord = path.join(PATHS.SAMPLE_FILES, FILE_NAMES.SOURCE);
    const targetWord = path.join(PATHS.SAMPLE_FILES, FILE_NAMES.TARGET);
    const resultPath = path.join(PATHS.OUTPUT, FILE_NAMES.RESULT_BASIC);

    // Perform comparison
    await compareWordDocuments(sourceWord, targetWord, resultPath);

    console.log('Basic comparison example completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error in basic comparison example:', error.message);
    process.exit(1);
  }
}

// Run the example
if (require.main === module) {
  main();
}

module.exports = main;
