/**
 * Script to run all examples sequentially
 * This ensures each example properly exits before starting the next one
 */

'use strict';

const { spawn } = require('child_process');
const path = require('path');

const examples = [
  'src/examples/basicComparison.js',
  'src/examples/advancedComparison.js',
  'src/examples/passwordProtectedComparison.js',
  'src/examples/streamComparison.js'
];

async function runExample(examplePath) {
  return new Promise((resolve, reject) => {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Running: ${examplePath}`);
    console.log('='.repeat(80));

    const child = spawn('node', [examplePath], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✓ ${examplePath} completed successfully\n`);
        resolve();
      } else {
        console.error(`\n✗ ${examplePath} failed with exit code ${code}\n`);
        reject(new Error(`Example ${examplePath} failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      console.error(`Error running ${examplePath}:`, error);
      reject(error);
    });
  });
}

async function runAllExamples() {
  console.log('\n🚀 Starting to run all examples...\n');

  for (let i = 0; i < examples.length; i++) {
    try {
      await runExample(examples[i]);
      
      // Small delay between examples to ensure cleanup
      if (i < examples.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`\n❌ Failed to run all examples. Stopped at: ${examples[i]}`);
      console.error(error.message);
      process.exit(1);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ All examples completed successfully!');
  console.log('='.repeat(80) + '\n');
  process.exit(0);
}

runAllExamples().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
