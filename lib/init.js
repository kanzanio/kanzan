var colors = require('colors');
var prompt = require('prompt');
var fs = require('fs-extra');



var init = module.exports =  {

  config: {},

  readConfig : function() {
    var file = process.cwd() + '/kanzan.json';
    var data = fs.readFileSync(file, 'utf8');
    init.config =  JSON.parse(data);
  },

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
          default: 'source',
          required: true
        }
      }
    };

    prompt.get(schema, function (err, result) {
      
      var kanzanfile = {
        sitename: result.sitename,
        source: result.source
      };

      // write a cherrycms.json
      fs.writeFile("kanzan.json", JSON.stringify(kanzanfile, null, 2), function (err) {
        if (err) throw err;
      });
      console.log('Setup complete.\nkanzan.json file added to your directory. \nPopulate your', result.source.blue, 'directory and then push your site to Kanzan with', 'kanzan push'.blue);
    });

  }

};

