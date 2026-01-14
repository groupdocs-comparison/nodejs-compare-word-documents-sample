/**
 * Stream-Based Word Document Comparison Example
 * 
 * This example demonstrates how to compare Word documents
 * loaded from Java input streams instead of file paths.
 * Useful for documents stored in memory or from network sources.
 */

'use strict';

const groupdocs = require('@groupdocs/groupdocs.comparison');
const java = require('java');
const { setLicense } = require('../utils/licenseHelper');
const { PATHS, FILE_NAMES } = require('../utils/constants');
const { fileExists, ensureDirectoryExists } = require('../utils/fileHelper');
const path = require('path');

// Import Java classes
const FileInputStream = java.import('java.io.FileInputStream');

/**
 * Demonstrates Word document comparison using Java input streams instead of file paths.
 * @remarks This example uses GroupDocs.Comparison with Java FileInputStream objects
 *          to load documents from streams. This approach is useful when documents are
 *          stored in memory, loaded from network sources, or when you need to avoid
 *          direct file system access. The streams are properly closed after comparison.
 */
async function main() {
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

    console.log('\n================================================================================');
    console.log('Stream-Based Word Document Comparison');
    console.log('================================================================================');
    console.log(`Source Word: ${sourceWord}`);
    console.log(`Target Word: ${targetWord}`);
    console.log(`Output: ${resultPath}\n`);

    // Create Java input streams for source and target documents
    console.log('Creating input streams...');
    const sourceInputStream = new FileInputStream(sourceWord);
    const targetInputStream = new FileInputStream(targetWord);

    // Initialize comparer with source Word stream
    console.log('Initializing comparer with source Word stream...');
    const comparer = new groupdocs.Comparer(sourceInputStream);

    // Add target Word document stream
    console.log('Adding target Word document stream...');
    comparer.add(targetInputStream);

    // Perform comparison
    console.log('Comparing documents from streams...');
    await comparer.compare(resultPath);

    // Close streams (Java streams are automatically managed, but good practice)
    sourceInputStream.close();
    targetInputStream.close();

    console.log('\n✓ Stream-based comparison completed successfully!');
    console.log(`  Result saved to: ${resultPath}\n`);

    console.log('Stream comparison example completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error in stream comparison example:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the example
if (require.main === module) {
  main();
}

module.exports = main;
