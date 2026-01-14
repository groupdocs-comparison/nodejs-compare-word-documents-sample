/**
 * Password-Protected Word Document Comparison Example
 * 
 * This example demonstrates how to compare password-protected Word documents.
 * Both documents can have different passwords.
 */

'use strict';

const { compareWordDocuments } = require('../compareWordDocuments');
const { setLicense } = require('../utils/licenseHelper');
const { PATHS, FILE_NAMES } = require('../utils/constants');
const path = require('path');

/**
 * Demonstrates comparison of password-protected Word documents.
 * @remarks This example uses GroupDocs.Comparison with LoadOptions to handle
 *          password-protected documents. Both source and target documents can have
 *          different passwords. The comparison process requires correct passwords
 *          for both documents to proceed successfully.
 */
async function main() {
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

    console.log('\nRunning password-protected document comparison...');
    console.log('  - Source Word password: Required');
    console.log('  - Target Word password: Required\n');

    // Perform comparison with password options
    await compareWordDocuments(sourceWord, targetWord, resultPath, {
      loadOptions: {
        sourcePassword: sourcePassword,
        targetPassword: targetPassword
      }
    });

    console.log('Password-protected comparison example completed successfully!');
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
}

// Run the example
if (require.main === module) {
  main();
}

module.exports = main;
