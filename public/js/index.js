var socket=io();

socket.on('connect', function(){
    console.log('Connected to Server');
});

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
 });

 //on new text message 
 socket.on('newMessage', function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=jQuery('#message-template').html();
    var html=Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
 });


 //on new location message
 socket.on('newLocationMessage', function(message) {
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=jQuery('#location-message-template').html();
    var html=Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
 });


 var locationButton=jQuery('#send-location');
 locationButton.on('click', function(){
    if(! navigator.geolocation){
        return alert('Geolocation not supported by your browser!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        //Permission granted
        locationButton.removeAttr('disabled').text('Send Location');
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function(){
         alert('Unable to fetch location');
         locationButton.removeAttr('disabled').text('Send Location');
    });

 });

 jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextbox=jQuery('input[name$="message"]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        //To clear the input after click on submit button
        messageTextbox.val('');
    });

 });   