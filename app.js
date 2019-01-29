var express     = require('express');
var app         = express();
var i           = 0;

var server     = app.listen(process.env.PORT || 3000);
var io          = require("socket.io").listen(server);

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));


io.on("connection",(socket) =>{
   i=i+1;
   console.log("New User Connected who is number :- " + i + " .");
   
   socket.username = "Anonymous";

   socket.on('change_username', function(data){
      console.log("New Username :- "+ data.username);
      socket.username = data.username;
   });

   socket.on('new_message', function(data){
      io.sockets.emit('new_message', {message: data.message, username: socket.username});
   });
});

app.get("/",function(req,res){
   res.render("index");
});

app.listen(process.env.PORT || 5000, function(){
    console.log("The Server has been started");
});
