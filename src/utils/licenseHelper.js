/**
 * License utility functions
 * 
 * @module licenseHelper
 */

'use strict';

const groupdocs = require('@groupdocs/groupdocs.comparison');
const path = require('path');
const fs = require('fs');

/**
 * Set the GroupDocs.Comparison license
 * 
 * @returns {boolean} True if license was set successfully, false otherwise
 */
function setLicense() {
  try {
    const resolvedPath = path.resolve("GroupDocs.Comparison.NodeJsViaJava.lic");
    
    if (!fs.existsSync(resolvedPath)) {
      console.warn(`Warning: License file not found at: ${resolvedPath}`);
      console.warn('  Continuing without license (evaluation mode with limitations)');
      return false;
    }

    const license = new groupdocs.License();
    license.setLicense(resolvedPath);
    console.log(`License set successfully from: ${resolvedPath}`);
    return true;
  } catch (error) {
    console.warn(`Warning: Failed to set license: ${error.message}`);
    console.warn('  Continuing without license (evaluation mode with limitations)');
    return false;
  }
}

module.exports = {
  setLicense
};
