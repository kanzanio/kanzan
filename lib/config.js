var colors = require('colors');
var fs = require('fs-extra');

var config = module.exports =  {
  
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
