/**
 * Constants and configuration for the project
 * 
 * @module constants
 */

const path = require('path');

// Default license path
const DEFAULT_LICENSE_PATH = path.resolve('GroupDocs.Comparison.lic');

// File paths
const PATHS = {
  SAMPLE_FILES: path.join(__dirname, '../../sample-files'),
  OUTPUT: path.join(__dirname, '../../output'),
  LICENSE: DEFAULT_LICENSE_PATH
};

// File names
const FILE_NAMES = {
  SOURCE: 'source.docx',
  TARGET: 'target.docx',
  SOURCE_PROTECTED: 'source_protected.docx',
  TARGET_PROTECTED: 'target_protected.docx',
  RESULT_BASIC: 'result_basic.docx',
  RESULT_ADVANCED: 'result_advanced.docx',
  RESULT_PROTECTED: 'result_protected.docx',
  RESULT_STREAM: 'result_stream.docx',
  RESULT: 'result.docx'
};

// Supported file extensions
const SUPPORTED_EXTENSIONS = ['.docx', '.doc'];

module.exports = {
  PATHS,
  FILE_NAMES,
  SUPPORTED_EXTENSIONS,
  DEFAULT_LICENSE_PATH
};
