navigator.getUserMedia({ video:true, audio: true}, function(stream){

  var ConnectedPeers = ['test']
  var socket = io();

  //peer = new Peer({
  //  initiator: location.hash === '#init',
  //  trickle: false
  //})

  var partnerUID;


      socket.on('connect', function(){
        console.log('Connected and signalling server!')
      })




      socket.on('peer', function(data){


        var peerId = data.peerId;

          var peer = new SimplePeer({
            initiator: data.initiator,
            stream: stream
          });


        console.log('Peer available for connection discovered from signalling server, ID: ' + peerId);

        socket.on('signal', function(data){
          if(data.peerId == peerId){


            if(!ConnectedPeers.includes(peerId)){
              peer.signal(data.signal);
              console.log('Recieved a signal from PeerID: ' + peerId);
              ConnectedPeers.push(peerId);
            }

          }
        });

        peer.on('signal', function(data){
          //$('body').append(JSON.stringify(data));
          console.log('Advertising signalling data' + data + 'to Peer ID:' + peerId);
          socket.emit('signal', {
            signal: data,
            peerId: peerId
          })
        })

        //peers[peerId] = peer;

        peer.on('stream', function(stream){
          console.log("CREATING VIDEO OBJECT")
          var video = document.createElement('video');
          $(video).appendTo('.hub-container');
          $(video).draggable();
          video.src = window.URL.createObjectURL(stream)
          video.play()
        })



        peer.on('error', function(e) {

        });
        peer.on('connect', function() {
          console.log('Peer connection established');
          peer.send("hey peer");
        });
        peer.on('data', function(data) {
          console.log('Recieved data from peer:' + data);
        });


      })




      //peer.on('signal', function(data){
      //  $('body').append(JSON.stringify(data))
        //socket.emit('key', data)
        //userRef.child(partnerUID).child('call').update({
        //  partner: user.uid
        //})
        //userRef.child(partnerUID).child('call').child('key').update({
        //  key: JSON.stringify(data)
        //})
      //})

      //userRef.child(user.uid).child('call').child('key').on('child_added', function(data){
      //  if(data.val().key !== 'undefined'){
      //    alert('KEY COMING!')
      //    var partnerKey = JSON.stringify(data);
      //    var str = fE.decode(partnerKey);
      //    var key = str.replace(new RegExp('\/\/', 'g'), "/")
          //peer.signal();
      //    $('body').append(key + '/n')
      //    $('body').append(partnerKey)
      //  }
      //})
      //socket.on('new partner', function(data){
      //  alert(data);
      //  peer.signal(data)
      //})




}, function(err){
  console.error(err)
});
