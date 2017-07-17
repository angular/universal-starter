var glob = require("glob")
var compile =require("./sass-to-css");
var files=glob.sync("src/**/*.scss" );
files.forEach(function(path){
    compile(path);
})
