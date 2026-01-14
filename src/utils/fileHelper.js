/**
 * File utility helper functions
 * 
 * @module fileHelper
 */

const fs = require('fs');
const path = require('path');

/**
 * Check if a file exists
 * 
 * @param {string} filePath - Path to the file
 * @returns {boolean} True if file exists, false otherwise
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Create directory if it doesn't exist
 * 
 * @param {string} dirPath - Path to the directory
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Get file extension
 * 
 * @param {string} filePath - Path to the file
 * @returns {string} File extension (e.g., '.pdf', '.docx')
 */
function getFileExtension(filePath) {
  return path.extname(filePath).toLowerCase();
}

/**
 * Validate file format
 * 
 * @param {string} filePath - Path to the file
 * @param {string[]} allowedExtensions - Array of allowed extensions (e.g., ['.pdf', '.docx'])
 * @returns {boolean} True if file format is valid
 */
function validateFileFormat(filePath, allowedExtensions) {
  const extension = getFileExtension(filePath);
  return allowedExtensions.includes(extension);
}

/**
 * Get file size in bytes
 * 
 * @param {string} filePath - Path to the file
 * @returns {number} File size in bytes
 */
function getFileSize(filePath) {
  if (!fileExists(filePath)) {
    return 0;
  }
  const stats = fs.statSync(filePath);
  return stats.size;
}

/**
 * Format file size for display
 * 
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size (e.g., "1.5 MB")
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

module.exports = {
  fileExists,
  ensureDirectoryExists,
  getFileExtension,
  validateFileFormat,
  getFileSize,
  formatFileSize
};

