var express     = require('express');
var app         = express();

const server = require('http').createServer();
var io          = require("socket.io")(server);

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));


io.on("connection",(socket) =>{
   console.log("New user connected"); 
});

app.get("/",function(req,res){
   res.render("index");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server has been started");
});
