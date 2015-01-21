var gitty = require('gitty');
var repo = gitty(process.cwd());
var options = require('./config').options();


var baseURL = "localhost.kanzan.io";

var git = module.exports =  {


  addKanzanRemote : function(){

    
    var url = "git@" + baseURL + ":" + options.sitename;

    repo.getRemotes(function(err, remotes){

      if (err) return console.log(err);
    
      // create or set the kanzan remote
      if(remotes.kanzan) {
        console.log("updating kanzan remote:", url);
        repo.setRemoteUrl('kanzan', url, function(err, succ){
          if (err) return console.log(err);
        });
      } else {
        console.log("Adding kanzan git remote");
        repo.addRemote('kanzan', url, function(err, succ){
          if (err) return console.log(err);
          console.log("Done".green + " Kanzan.io added as a git remote.");
        });
      }

    });

  },

  push : function() {

    repo.push('kanzan', 'master', function(err, succ) {
      if (err) return console.log(err);
      var cmsURL = "http://" + baseURL + "/site/" + options.sitename + "/cms";
      console.log("\nTemplates uploaded to kanzan.io".green, "\nTo manage your content and publish your site, visit ".grey + cmsURL.white + "\n");
    });


  }

};
