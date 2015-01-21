var colors = require('colors');
var fs = require('fs-extra');

var config = module.exports =  {
  
  // popualte and return the options object
  options : function() {
    var file = process.cwd() + '/kanzan.json';
    try {
	    var data = fs.readFileSync(file, 'utf8');	
    } catch(e){
    	if (e.code === 'ENOENT') {
			  return {};
			} else {
			  throw e;
			}
    }
    return JSON.parse(data);
  },

  // display the options for the user
  show : function() {
  	var options = config.options();
  	console.log("\nKanzan options in kanzan.json:".grey);
  	for(var item in options) {
  		var label = item + ": "
  		console.log(label.blue, options[item]);
  	}
  	console.log("");
  }

}
