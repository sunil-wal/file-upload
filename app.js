var express =   require("express");
var multer  =   require('multer');
var app     =   express();
var storage =   multer.diskStorage({
  // file upload destination
  destination: function (req, file, callback) {
    callback(null, './');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('avatar');
app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});
app.post('/api/avatar',function(req,res){
    upload(req,res,function(err) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
app.listen(3000,function(){
    console.log("Working on port 3000");
});