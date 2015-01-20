#! /usr/bin/env node

var program = require('commander');
var colors = require('colors');
var kanzan = require("./lib");



program
  .command('init')
  .description('Setup a new kanzan site.')
  .action(function() {
    kanzan.init.prompt();
    kanzan.git.addKanzanRemote();
  });

program
  .command('push')
  .description('Push your HTML templates to kanzan.io')
  .action(function() {
    // kanzan.git.go();
  });




program.parse(process.argv);

var validCommands = program.commands.map(function(cmd) {
  return cmd._name;
});

if (!program.args.length) {
  console.log('\n', 'kanzan'.cyan, 'http://kanzan.io');
  program.help();
} else if (validCommands.indexOf(process.argv[2]) === -1) {
  console.log('Invalid argument:'.red, process.argv[2]);
  console.log('kanzan:'.cyan, 'http://kanzan.io');
  program.help();
}



