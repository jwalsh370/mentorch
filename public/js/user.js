var userRef = firebase.database().ref("users");
var userID = $('#uid').html();
var ref = firebase.storage().ref()
var avatarRef = ref.child(uid +"/avatar.png")

$("#full-name").html();

userRef.child(userID).once('value', function(snap){
  var fullName = snap.val().full_name;
  var bio = snap.val().bio;
  var profilePicture = snap.val().profile_picture;

  $("#bio-pic").attr('src', profilePicture);
  $("#full-name").html(fullName);
  $("#bio-blurb").html(bio)
})

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    if(user.uid == userID){
      $("#bio-pic").click(function(){
        //alert('change picture')
        changePicture();
      })
      $("#full-name").click(function(){
        //alert('change name')
        changeName();
      })
      $("#bio-blurb").click(function(){
        //alert('change bio')
        changeBio();
      })
    }
  } else {
  }
})


function changeBio(){
  $("#bio-blurb").attr('hidden', '');
  $("#full-name").after(BIO_INPUT);
  $('#bio-input').val($("#bio-blurb").text());
  $('#bio-input').focus();
  $('#bio-input').focusout(function(){
  if($('#bio-input').val() != ""){
    userRef.child(userID).update({
      bio: $('#bio-input').val()
    })
  }
    location.reload(true);
  })
}

function changeName(){
  $("#full-name").attr('hidden', '');
  $("#full-name").after(FULL_NAME_INPUT);
  $('#full-name-input').focus();
  $('#full-name-input').focusout(function(){
  if($('#full-name-input').val() != ""){
    userRef.child(userID).update({
      full_name: $('#full-name-input').val()
    })
  }
    location.reload(true);
  })
}

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

      }, function(error){}, function(){
        userRef.child(userID).update({
          profile_picture: uploadTask.snapshot.downloadURL
        })
        //alert(uploadTask.snapshot.downloadURL)
        location.reload(true);
      })

    } else { alert('PLEASE UPLOAD A PNG OR JPEG') }
  })
}



var BIO_INPUT = "<textarea class='text-area' placeholder='type new bio' id='bio-input'></textarea> "
var FULL_NAME_INPUT = "<input class='text-area' placeholder='Type new full name!' id='full-name-input'></input> "
var FILE_INPUT = "<input type='file' id='file-input' hidden></input> "
