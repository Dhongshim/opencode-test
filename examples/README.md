# opencode Test Examples

This directory contains practical examples to help you get started with opencode-test.

## Quick Start Example

Follow these steps to run the example tests:

1. **Initialize opencode-test in this directory:**
   ```bash
   cd examples
   opencode-test init
   ```

2. **Copy example files:**
   ```bash
   # Copy test cases
   cp test-cases/* .opencode/test-cases/
   
   # Copy step libraries  
   cp steps/* .opencode/steps/
   
   # Copy test suites
   cp test-suites/* .opencode/test-suites/
   
   # Copy environment files
   cp .env.* .
   ```

3. **Run example tests:**
   ```bash
   # Run a single test
   /run-yaml-test file:login.yml env:dev
   
   # Run smoke tests
   /run-yaml-test tags:smoke env:dev
   
   # Run a complete test suite
   /run-test-suite suite:e-commerce.yml env:dev
   ```

4. **View test reports:**
   ```bash
   /view-reports-index
   ```

## Example Structure

- `test-cases/` - Individual YAML test cases
- `steps/` - Reusable step libraries
- `test-suites/` - Test suite configurations
- `.env.*` - Environment configurations

## Notes

- These examples use placeholder URLs and credentials
- Modify the `.env` files to match your actual test environment
- The examples demonstrate best practices for organizing tests
- All examples include comprehensive documentation and comments
