var sass=require("node-sass");
var fs=require("fs");

function compile(file){
    var outFile=file.replace(".scss",".css");
    var result=sass.renderSync({
      file: file,
      outputStyle: 'compressed',
      outFile: outFile,
      sourceMap: true
    })  
    fs.writeFileSync(outFile, result.css);  
}
module.exports=compile;