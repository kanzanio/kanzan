var colors = require('colors');
var prompt = require('prompt');
var fs = require('fs-extra');
var git = require('./git');



var init = module.exports =  {

  prompt: function() {

    console.log('Setting up a Kanzan site...'.green);

    prompt.message = "- ".green;
    prompt.delimiter = "";
    prompt.start();

    var schema = {
      properties: {
        sitename: {
          description: 'Site name',
          default: 'my-site',
          required: true
        },
        source: {
          description: 'Template source directory',
          default: 'src',
          required: true
        }
      }
    };

    prompt.get(schema, function (err, result) {
      
      var kanzanfile = {
        sitename: result.sitename,
        source: result.source
      };

      // write a kanzan.json
      fs.writeFile("kanzan.json", JSON.stringify(kanzanfile, null, 2), function (err) {
        if (err) throw err;
      });
      console.log('\nSetup complete.\nYour options have been stored in a kanzan.json file in this directory. \n\nPopulate your', result.source.blue, 'directory and then push your site to Kanzan with', 'kanzan push'.blue);
    });

  }

};

