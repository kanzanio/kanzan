#! /usr/bin/env node

var program = require('commander');
var colors = require('colors');
var kanzan = require("./lib");


program
  .command('init')
  .description('Setup a new Kanzan site.')
  .action(function() {
    kanzan.init.prompt();
  });

program
  .command('push')
  .description('Push your HTML templates to kanzan.io')
  .action(function() {
    kanzan.git.push();
  });

program
  .command('options')
  .description('Review the settings for this Kanzan site')
  .action(function() {
    kanzan.config.show();
  });


program.parse(process.argv);

var validCommands = program.commands.map(function(cmd) {
  return cmd._name;
});

if (!program.args.length) {
  console.log('\n', 'kanzan'.cyan, '- More infomation at http://kanzan.io');
  program.help();
} else if (validCommands.indexOf(process.argv[2]) === -1) {
  console.log('Invalid argument:'.red, process.argv[2]);
  program.help();
}



