/**
 * Main comparison function for Word documents
 * 
 * This module provides the core functionality to compare Word documents
 * using GroupDocs.Comparison for Node.js via Java.
 * 
 * @module compareWordDocuments
 */

'use strict';

const groupdocs = require('@groupdocs/groupdocs.comparison');
const path = require('path');
const fs = require('fs');
const { fileExists, ensureDirectoryExists } = require('./utils/fileHelper');

/**
 * Compares two Word documents and generates a result document highlighting differences.
 * @remarks This function uses GroupDocs.Comparison to perform the comparison.
 *          The result document will show inserted content in blue, deleted content in red,
 *          and modified content in green. Supports password-protected documents through options.
 * @param {string} sourceWordPath - Path to source Word document (DOCX)
 * @param {string} targetWordPath - Path to target Word document (DOCX)
 * @param {string} outputPath - Path where the result document will be saved
 * @param {Object} options - Optional comparison options
 * @param {Object} options.compareOptions - GroupDocs CompareOptions object for custom comparison settings
 * @param {Object} options.loadOptions - LoadOptions for source/target documents (supports passwords)
 * @returns {Promise<string>} Path to the result document
 * @throws {Error} If comparison fails or input files are not found
 */
async function compareWordDocuments(sourceWordPath, targetWordPath, outputPath, options = {}) {
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

  console.log('\n================================================================================');
  console.log('Word Document Comparison');
  console.log('================================================================================');
  console.log(`Source Word: ${sourceWordPath}`);
  console.log(`Target Word: ${targetWordPath}`);
  console.log(`Output: ${outputPath}\n`);

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
  console.log('Comparing documents...');
  const compareOptions = options.compareOptions || null;
  
  if (compareOptions) {
    await comparer.compare(outputPath, compareOptions);
  } else {
    await comparer.compare(outputPath);
  }

  console.log('\n✓ Comparison completed successfully!');
  console.log(`  Result saved to: ${outputPath}\n`);

  return outputPath;
}

/**
 * Creates style settings for comparison options with customizable formatting.
 * @remarks This function uses GroupDocs.StyleSettings to configure how changes are displayed.
 *          Supports highlight color, font color, bold, underline, italic, and strikethrough formatting.
 * @param {Object} styleConfig - Style configuration object with optional highlightColor, fontColor, bold, underline, italic, strikethrough
 * @param {Object} defaultColor - Default Java Color object to use when styleConfig properties are not provided
 * @returns {Object} StyleSettings object configured with the specified style options
 */
function createStyleSettings(styleConfig, defaultColor) {
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
}

/**
 * Compares Word documents with custom styling options for different change types.
 * @remarks This function uses GroupDocs.Comparison with custom StyleSettings to control
 *          how inserted, deleted, and changed content appears in the result document.
 *          Can generate a summary page showing all changes at a glance.
 * @param {string} sourceWordPath - Path to source Word document (DOCX)
 * @param {string} targetWordPath - Path to target Word document (DOCX)
 * @param {string} outputPath - Path where the result document will be saved
 * @param {Object} styleConfig - Style configuration object with inserted, deleted, changed properties and generateSummaryPage option
 * @returns {Promise<string>} Path to the result document with custom styling applied
 */
async function compareWordDocumentsWithStyles(sourceWordPath, targetWordPath, outputPath, styleConfig = {}) {
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
}

module.exports = {
  compareWordDocuments,
  compareWordDocumentsWithStyles
};
