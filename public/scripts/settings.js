
firebase.auth().onAuthStateChanged(function(user){
  if(user){
    var avatarRef = firebase.storage().ref().child(user.uid +"/avatar.png")

    userRef.child(user.uid).once('value', function(data){
      $('.user-img').attr('src',  data.val().profile_picture);
      $('.first-name').attr('value',  data.val().first_name);
      $('.last-name').attr('value',  data.val().last_name);
      $('.profession').attr('value',  data.val().profession);
      $('.bio').val(data.val().bio);
    })

    $('button').click(function(){
      userRef.child(uid).update({
        first_name: $('.first-name').val(),
        last_name: $('.last-name').val(),
        profession: $('.profession').val(),
        bio:   $('.bio').val()
      })
    })

  } else {

  }

  $('.user-img').click(function(){
    //alert('test')
    changePicture();
  })

  function changePicture(){
    $('body').append(FILE_INPUT);
    $('#file-input').trigger('click');
    var filePath = "null";
    $('#file-input').on("change", function(event){
      selectedFile = event.target.files[0];
      //alert(selectedFile.type.toString().split('/')[1])
      if((selectedFile.type.toString().split('/')[1] == 'jpeg') || (selectedFile.type.toString().split('/')[1] == 'png')){
        //alert(selectedFile.type)
        var uploadTask = avatarRef.put(selectedFile);

        uploadTask.on('state_changed', function(snapshot){

          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            userRef.child(user.uid).update({
              profile_picture: downloadURL
            }).then(function(){
              //location.reload()
            })

          });

        }, function(error){}, function(){






          //alert(uploadTask.snapshot.downloadURL
        })

      } else { alert('PLEASE UPLOAD A PNG OR JPEG') }
    })
  }




})


var FILE_INPUT = "<input type='file' id='file-input' hidden></input> "
