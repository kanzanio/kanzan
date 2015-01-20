var gitty = require('gitty');
var repo = gitty('/path/to/repo');


var push = module.exports =  {

  addKanzanRemote : function(){

    console.log("adding remote");

    var slug = "kanzan-reference";
    var url = "git@localhost.kanzan.io:" + slug;

    repo.addRemote('kanzan', url, function(err, succ){
      
      if (err) return console.log(err);
      
      console.log("Kanzan remote added.");
      
    });
    

  }

};
