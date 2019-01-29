var i= 0;
$(function(){

   var socket = io.connect("localhost:3000");

   var message = $("#msg");
   var username = $("#chuser_field");
   var send_username = $("#chuserbutton");
   var send_message = $("#msg_send");
   var chatroom = $("#chat");

   send_username.click(function(){
      console.log("New username :- "+ username.val());
      socket.emit('change_username', {username: username.val()});
   });
   send_message.click(function(){
      i=i+1;
      console.log("This is " + i + " th message and it is :- '" + message.val() + "'");
      socket.emit("new_message", {message: message.val()});
   });

   socket.on("new_message", function(data){
      console.log("Username :- "+ data.username);
      console.log("Message :- " + data.message);
      chatroom.prepend("<div class='messages'><span class = 'username_box'>"+ data.username + "</span><span class='message_data'>"+ data.message + "</span></div>");
   });
});

