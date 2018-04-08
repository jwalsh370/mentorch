
auth.onAuthStateChanged(function(user){
  var storageRef = firebase.storage().ref()
  var avatarRef = storageRef.child(user.uid +"/avatar.png")
  var pic = ""
  var retrievedTags = ""
  var queuedTags = '';

  userRef.child(user.uid).once('value', function(data){
    $(".profile-pic-med").css('background-image', 'url("' + data.val().profile_picture + '")')
    $("#first-name-input").val(data.val().first_name)
    $("#last-name-input").val(data.val().last_name)
    $("#profession-input").val(data.val().profession)
    $("#bio-input").val(data.val().bio)
    $("#tags-input").val(data.val().tags)
    $('#youtube-link-input').val(data.val().youtube)
    pic = data.val().profile_picture
    retrievedTags = data.val().tags

    for(i=0; i < $('.profile-tag').length; i++){
      if(retrievedTags.match($('.profile-tag:eq(' + i + ')').html().replace(/\s+/g, ''))){
        var tagname = $('.profile-tag:eq(' + i + ')').html().replace(/\s+/g, '');
        $("#" + tagname.toLowerCase()).addClass('tag-selected');
        queuedTags += " " + tagname + " "
      }
    }

//    if(retrievedTags.match('Athlete')){
//      $("#athlete").addClass('tag-selected');
//      queuedTags += " Athlete "
//    }
//    if(retrievedTags.match('Business')){
//      $("#business").addClass('tag-selected');
//      queuedTags += " Business "
//    }
/**
if(retrievedTags.match('Design')){
    $("#design").addClass('tag-selected');
    queuedTags += " Design "
  }
  if(retrievedTags.match('Marine')){
    $("#marine").addClass('tag-selected');
    queuedTags += " Marine "
  }
  if(retrievedTags.match('Army')){
    $("#army").addClass('tag-selected');
    queuedTags += " Army "
  }
  if(retrievedTags.match('Airforce')){
    $("#airforce").addClass('tag-selected');
    queuedTags += " Airforce "
  }

 */
  })






  $('.profile-tag').each(function(){
    $(this).click(function(){
      if(queuedTags.match($(this).html().replace(/\s+/g, ''))){
        $(this).removeClass('tag-selected')
        queuedTags =  queuedTags.replace($(this).text().replace(/\s+/g, ''), '')
        userRef.child(user.uid).update({
          tags: queuedTags
        })
      } else {
        $(this).addClass('tag-selected')
        queuedTags +=  $(this).html().replace(/\s+/g, '') + " "
        userRef.child(user.uid).update({
          tags: queuedTags
        })
      }
    })
  })


  $('#update-submit').click(function(){

    userRef.child(user.uid).update({
      first_name: $("#first-name-input").val(),
      last_name: $("#last-name-input").val(),
      profession: $("#profession-input").val(),
      bio: $("#bio-input").val(),
      youtube: $('#youtube-link-input').val(),
    })
    index.saveObject({
      firstname: $("#first-name-input").val(),
      lastname: $("#last-name-input").val(),
      profession: $("#profession-input").val(),
      bio: $("#bio-input").val(),
      tags: queuedTags,
      pic: pic,
      uid: user.uid,
      objectID: user.uid
    }, function(err, content) {
      console.log(content);
    });

    setTimeout(function(){location.reload();}, 1000)

  })

  $("#edit-pic-hover").click(function(){
    //alert('change picture')
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

        }, function(error){}, function(){
          userRef.child(user.uid).update({
            profile_picture: uploadTask.snapshot.downloadURL
          })
          userRef.child(user.uid).once('value', function(data){
            pic = data.val().profile_picture
            index.saveObject({
              firstname: $("#first-name-input").val(),
              lastname: $("#last-name-input").val(),
              profession: $("#profession-input").val(),
              bio: $("#bio-input").val(),
              tags: $("#tags-input").val(),
              pic: pic,
              uid: user.uid,
              objectID: user.uid
            }, function(err, content) {
              console.log(content);
              location.reload(true);
            });
          })


          //alert(uploadTask.snapshot.downloadURL)

        })

      } else { alert('PLEASE UPLOAD A PNG OR JPEG') }
    })
  }

  $('#navy').mouseenter(function(){
      $('.navypop').toggleClass('hidden')
      $('.navypop').mouseenter(function(){
        $(this).mouseleave(function(){
          $(this).toggleClass('hidden')
        })
      })
    })

    $('#marine').mouseenter(function(){
        $('.marinepop').toggleClass('hidden')
        $('.marinepop').mouseenter(function(){
          $(this).mouseleave(function(){
            $(this).toggleClass('hidden')
          })
        })
      })

})

$('#allow-notifications').click(function(){
  Notification.requestPermission(function(p){
    if(p === 'denied'){
      alert('Notifications have been denied. You can re-allow them on the user settings page.')
    } else {
      alert('Alerts have been enabled. You can disable alerts on the user settings page.')
    }
  })
})

$('#test-notifications').click(function(){
  var notify;

  if(Notification.permission === 'default'){
    alert('Please allow notificaitons before trying to recieve them!')
  } else {
    notify = new Notification('A new message from James!', {
      body: 'How are you doing today!',
      icon: '/img/userimg.png',
      tag: 234234234234
    })

    notify.onclick = function(){
      alert(this.tag)
    }

  }
})






var FILE_INPUT = "<input type='file' id='file-input' hidden></input> "
