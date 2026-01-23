#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Sync templates from .opencode directory to lib/templates
 */
async function syncTemplates() {
  console.log(
    chalk.blue('🔄 Syncing templates from .opencode to lib/templates...'),
  );

  const projectRoot = process.cwd();
  const opencodeDir = path.join(projectRoot, '.opencode');
  const templatesDir = path.join(projectRoot, 'lib/templates');

  // Check if .opencode directory exists
  if (!(await fs.pathExists(opencodeDir))) {
    console.error(
      chalk.red('❌ .opencode directory not found in project root'),
    );
    process.exit(1);
  }

  try {
    // Ensure templates directory exists
    await fs.ensureDir(templatesDir);

    // Sync commands directory
    const commandsSrc = path.join(opencodeDir, 'commands');
    const commandsDest = path.join(templatesDir, 'commands');

    if (await fs.pathExists(commandsSrc)) {
      await fs.remove(commandsDest);
      await fs.copy(commandsSrc, commandsDest);
      console.log(chalk.green('✅ Commands directory synced'));

      // List synced files
      const commandFiles = await fs.readdir(commandsSrc);
      commandFiles.forEach((file) => {
        console.log(chalk.gray(`    commands/${file}`));
      });
    } else {
      console.warn(
        chalk.yellow('⚠️  Commands directory not found in .opencode'),
      );
    }

    // Sync scripts directory
    const scriptsSrc = path.join(opencodeDir, 'scripts');
    const scriptsDest = path.join(templatesDir, 'scripts');

    if (await fs.pathExists(scriptsSrc)) {
      await fs.remove(scriptsDest);
      await fs.copy(scriptsSrc, scriptsDest);
      console.log(chalk.green('✅ Scripts directory synced'));

      // List synced files
      const scriptFiles = await fs.readdir(scriptsSrc);
      scriptFiles.forEach((file) => {
        console.log(chalk.gray(`    scripts/${file}`));
      });
    } else {
      console.warn(
        chalk.yellow('⚠️  Scripts directory not found in .opencode'),
      );
    }

    // Skip settings file - it's local configuration, not a template
    console.log(
      chalk.gray('⏭️  Skipping settings.local.json (local configuration file)'),
    );

    console.log(chalk.blue('🎉 Template sync completed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Template sync failed:'), error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  syncTemplates();
}

module.exports = { syncTemplates };
