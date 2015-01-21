var gitty = require('gitty');
var repo = gitty(process.cwd());
var options = require('./config').options();

var baseURL = "localhost.kanzan.io";
var s3baseURL = "-dot-kanzan-dot-io.s3-website-eu-west-1.amazonaws.com";


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
          console.log("  ✔  ".green + "Kanzan.io added as a git remote.".grey);
        });
      }

    });

  },

  push : function() {
    repo.getRemotes(function(err, remotes) {
      if (err) return console.log(err);
      if(remotes.kanzan) {
        repo.push('kanzan', 'master', function(err, succ) {
          if (err) return console.log(err);
          var cmsURL = "http://" + baseURL + "/site/" + options.sitename + "/cms";
          var previewURL = "http://" + options.sitename + s3baseURL;
          console.log("\n  ✔  ".green + "Templates uploaded to kanzan.io".grey + "\n");
          console.log("Manage your content and publish your site at:\n" + cmsURL.cyan + "\n");
          console.log("Preview your populated site at:\n" + previewURL.cyan + "\n");
        });
      } else {
        git.addKanzanRemote();
        git.push();
      }
    });

  }

};
  
