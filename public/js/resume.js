


$('.profile-pic-med').css('background-image', 'url:"' +  + '"' )

auth.onAuthStateChanged(function(user){
  userRef.once('value', function(snap){
    if (snap.hasChild(resume_id) || 1){
      console.log("child is real");
      $(".module-content").css('height', 'inherit');
      $(".module-content").css('background-image', 'url("")');
      $(".name-bar").html(snap.child(resume_id).val().first_name + " " + snap.child(resume_id).val().last_name);
      $(".name-sub").html(snap.child(resume_id).val().profession);
      $('.profile-pic-med').css('background-image', 'url("' + snap.child(resume_id).val().profile_picture + '")')
      try{$('.about-me-content').html(snap.child(resume_id).child('resume').val().about_me);} catch(err){}
      try{$('.experience').html(snap.child(resume_id).child('resume').val().experience);} catch(err){}
      try{$('.education').html(snap.child(resume_id).child('resume').val().education);} catch(err){}

////////////////// PROFILE PIC CHANGE ///////////////////
      if(resume_id == user.uid){
        $('.profile-pic-med').html(PIC_EDIT)
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
      }

////////////////// LOAD SKILLS //////////////////////
        userRef.child(resume_id).child("resume").child('skills').on('child_added', function(snap){
          var skillName = snap.val().name;
          var proficiency = snap.val().proficiency;
          var key = snap.key;

          var newSkill = $(SKILL).appendTo('.skills-module');
          $(newSkill).find('#skill-nametag').html(skillName);
          $(newSkill).find('.progress-bar').css('width', proficiency + "%")
          $(newSkill).find('#skill-id').html(key)
          if(resume_id == user.uid){
            $(newSkill).css('cursor', 'pointer')
            $(newSkill).mouseenter(function(){
              $(this).css('transform', 'scale(0.9, 0.9)')
            }).mouseleave(function(){
              $(this).css('transform', 'scale(1, 1)')
            })
            $(newSkill).click(function(){

                $(SKILL_EDIT).insertBefore("#sidebar-wrapper");
                initializeExit();
                $("#skill-name").val(skillName);
                $("#proficiency").val(proficiency);
                $("#preview-progress").css('width', proficiency + "%")
                $("#proficiency").change(function(){
                  $("#preview-progress").css('width', $("#proficiency").val() + "%")
                })

                $("#edit-submit").click(function(){
                  userRef.child(user.uid).child("resume").child('skills').child(key).update({
                    name: $("#skill-name").val(),
                    proficiency: $("#proficiency").val()
                  })
                  $(".grey-shade").remove();
                  location.reload();
                })
                $("#delete-skill").click(function(){
                  userRef.child(user.uid).child("resume").child('skills').child(key).remove();
                  $(".grey-shade").remove();
                  location.reload();
                })
            })
          }
        })

////////////////////////////////////////////////////

////////////////// LOAD EDUCATION //////////////////////
        userRef.child(resume_id).child("resume").child('education').on('child_added', function(snap){
          var institution = snap.val().institution;
          var degree = snap.val().degree;
          var start_date = snap.val().start_date;
          var end_date = snap.val().end_date;
          var key = snap.key;

          var newEducation = $(EDUCATION).appendTo('.education-module');
          $(newEducation).find('#education-nametag').html(institution + '</br><span id="degree-name">Bachelors Degree</span></br><span id="dates"></span>');
          $(newEducation).find('#degree-name').html(degree);
          $(newEducation).find('#dates').html(start_date.slice(0,4) + " - " + end_date.slice(0,4));
          $(newEducation).find('#education-id').html(key)
          if(resume_id == user.uid){
            $(newEducation).css('cursor', 'pointer')
            $(newEducation).mouseenter(function(){
              $(this).css('transform', 'scale(0.9, 0.9)')
            }).mouseleave(function(){
              $(this).css('transform', 'scale(1, 1)')
            })
            $(newEducation).click(function(){

                $(EDUCATION_EDIT).insertBefore("#sidebar-wrapper");
                initializeExit();
                $("#institution-name").val(institution);
                $("#degree").val(degree);
                $("#start-date").val(start_date);
                $("#end-date").val(end_date);

                $("#edit-submit").click(function(){
                  userRef.child(user.uid).child("resume").child('education').child(key).update({
                    institution: $("#institution-name").val(),
                    degree: $("#degree").val(),
                    start_date: $("#start-date").val(),
                    end_date: $("#end-date").val()
                  })
                  $(".grey-shade").remove();
                  location.reload();
                })
                $("#delete-education").click(function(){
                  userRef.child(user.uid).child("resume").child('education').child(key).remove();
                  $(".grey-shade").remove();
                  location.reload();
                })
            })
          }
        })



////////////////////////////////////////////////////

////////////////// LOAD Experience //////////////////////
        userRef.child(resume_id).child("resume").child('experience').on('child_added', function(snap){
          var name = snap.val().name;
          var start_date = snap.val().start_date;
          var end_date = snap.val().end_date;
          var description = snap.val().description;
          var key = snap.key;

          var newExperience = $(EXPERIENCE).appendTo('.experience-module');
          $(newExperience).find('#experience-nametag').html(name + '</br><span id="dates">2012-2014</span></br><span id="description"></span>');
          $(newExperience).find('#description').html(description);
          $(newExperience).find('#dates').html(start_date.slice(0,4) + " - " + end_date.slice(0,4));
          $(newExperience).find('#experience-id').html(key)
          if(resume_id == user.uid){
            $(newExperience).css('cursor', 'pointer')
            $(newExperience).mouseenter(function(){
              $(this).css('transform', 'scale(0.9, 0.9)')
            }).mouseleave(function(){
              $(this).css('transform', 'scale(1, 1)')
            })
            $(newExperience).click(function(){

                $(EXPERIENCE_EDIT).insertBefore("#sidebar-wrapper");
                initializeExit();
                $("#experience-name").val(name);
                $("#start-date").val(start_date);
                $("#end-date").val(end_date);
                $("#experience-description").val(description)

                $("#edit-submit").click(function(){
                  userRef.child(user.uid).child("resume").child('experience').child(key).update({
                    name: $("#experience-name").val(),
                    start_date: $("#start-date").val(),
                    end_date: $("#end-date").val(),
                    description: $("#experience-description").val()
                  })
                  $(".grey-shade").remove();
                  location.reload();
                })
                $("#delete-experience").click(function(){
                  userRef.child(user.uid).child("resume").child('experience').child(key).remove();
                  $(".grey-shade").remove();
                  location.reload();
                })
            })
          }
        })

////////////////// LOAD SOCIAL ICONS //////////////////////

userRef.child(resume_id).child("resume").on('child_added', function(snap){

  try{var facebooklink = snap.val().facebook;}catch(err){}
  try{var instagramlink = snap.val().instagram;}catch(err){}
  try{var twitterlink = snap.val().twitter;}catch(err){}

  if(facebooklink){
    $(".name-header").append(FACEBOOKICON);
    $('.facebook').click(function(){
      var win = window.open(facebooklink, '_blank');
      win.focus();
    })
  }
  if(instagramlink){
    $(".name-header").append(INSTAGRAMICON);
    $('.instagram').click(function(){
      var win = window.open(instagramlink, '_blank');
      win.focus();
    })
  }
  if(twitterlink){
    $(".name-header").append(TWITTERICON);
    $('.twitter').click(function(){
      var win = window.open(twitterlink, '_blank');
      win.focus();
    })
  }

})








////////////////////////////////////////////////////
      if(resume_id == user.uid){
/////////// EDIT Social Icons /////////

userRef.child(resume_id).child("resume").on('child_added', function(snap){

  var facebookLink = snap.val().facebook
  var twitterLink = snap.val().twitter
  var instagramLink = snap.val().instagram

  $('.facebook-input').val(facebookLink)
  $('.instagram-input').val(instagramLink)
  $('.twitter-input').val(twitterLink)

})


$(".name-header").append(ADDICON);
var open = true;
$(".addIcon").click(function(){
  if(open){
    $('.social-icons-settings').toggleClass('hidden')
    open = false;
    $('.social-icons-settings').mouseleave(function(){
      $(this).toggleClass('hidden')
      open = true
    })

    $('.social-icons-update').click(function(){

      if($('.facebook-input').val().match('www.facebook.com/')){
        userRef.child(user.uid).child('resume').child('social').update({
          facebook: $('.facebook-input').val()
        })
      }

      if($('.instagram-input').val().match('www.instagram.com/')){
        userRef.child(user.uid).child('resume').child('social').update({
          instagram: $('.instagram-input').val()
        })
      }

      if($('.twitter-input').val().match('www.twitter.com/')){
        userRef.child(user.uid).child('resume').child('social').update({
          twitter: $('.twitter-input').val()
        })
      }

    })

  }

})


/////////////////////////////////

/////////// EDIT ABOUT ME STUFF /////////
        $(".about-module").append(EDIT_ABOUT);
        $('#about-btn').click(function(){
          $(EDIT_POPUP).insertBefore("#sidebar-wrapper");
          initializeExit();
          try{$("#edit-text").val(snap.child(resume_id).child('resume').val().about_me)}catch(err){}
          $("#edit-submit").click(function(){
            userRef.child(user.uid).child("resume").update({
              about_me: $("#edit-text").val()
            })
            $(".grey-shade").remove();
            location.reload();
          })
        })
//////////////// EDIT EXPERIENCE STUFF ///////////
          $(".experience-module").append(ADD_EXPERIENCE);
          $('#experience-btn').click(function(){
            $(EXPERIENCE_ADD).insertBefore("#sidebar-wrapper");
            initializeExit();
            $("#edit-submit").click(function(){
              userRef.child(user.uid).child("resume").child('experience').push({
                name: $("#experience-name").val(),
                start_date: $("#start-date").val(),
                end_date: $("#end-date").val(),
                description: $("#experience-description")
              })
              $(".grey-shade").remove();
              //location.reload();
            })
          })
//////////////// EDIT SKILL STUFF ///////////
        $('.skills-module').append(ADD_SKILL);
        $('#skill-btn').click(function(){
          $(ADD_SKILL_POPUP).insertBefore("#sidebar-wrapper");
          initializeExit();
          $("#proficiency").change(function(){
            $("#preview-progress").css('width', $("#proficiency").val() + "%")
          })
          $("#edit-submit").click(function(){
            userRef.child(user.uid).child("resume").child('skills').push({
              name: $("#skill-name").val(),
              proficiency: $("#proficiency").val()
            })
            $(".grey-shade").remove();
            //location.reload();
          })
        })
//////////////// EDIT EDUCATION STUFF ///////////

var educationAddButton = $('.education-module').append(ADD_EDUCATION);
$('#education-btn').click(function(){
  $(EDUCATION_ADD).insertBefore("#sidebar-wrapper");
  initializeExit();
  $("#edit-submit").click(function(){
    userRef.child(user.uid).child("resume").child('education').push({
      institution: $("#institution-name").val(),
      degree: $("#degree").val(),
      start_date: $("#start-date").val(),
      end_date: $("#end-date").val()
    })
    $(".grey-shade").remove();
    //location.reload();
  })
})


////////////////////////////////////////////////



      }else{}

    } else {
      alert("Child not real")
    }
  })
})

function initializeExit(){
  $(".exit-button").click(function(){
    $(".grey-shade").remove();
  })
}


var EDIT_POPUP =
'<div class="grey-shade">'+
'<div class="popup-container">'+
'<div class="popup-container" style="z-index: 100000;">'+
'  <div class="popup">'+
'  <div class="exit-button"></div>'+
'    <div class="container-fluid popup-header"><img class="center-img" src="./img/signInHeaderWhite.png"></div>'+
'    <div class="container-fluid popup-body">'+
'      <textarea type="text" id="edit-text" placeholder="Edit text..." class="signup-input"></textarea>'+
'      <input type="button" id="edit-submit" class="signup-submit" value="Update!"></input>'+
'    </div>'+
'  </div>'+
'</div>'+
'</div>';

var ADD_SKILL_POPUP =
'<div class="grey-shade">'+
'<div class="popup-container">'+
'<div class="popup-container" style="z-index: 100000;">'+
'  <div class="popup" style="height: 500px">'+
'  <div class="exit-button"></div>'+
'    <div class="container-fluid popup-header"><img class="center-img" src="./img/signInHeaderWhite.png"></div>'+
'    <div class="container-fluid popup-body">'+
'       <input type="text" id="skill-name" class="full-width signup-input" value="" placeholder="Skill Name"></input>'+
'       <input type="range" id="proficiency" class="proficiency full-width signup-input" value=""></input>'+
'<div class="progress">'+
'    <div id="preview-progress" class="progress-bar" role="progressbar" aria-valuenow="70"'+
'    aria-valuemin="0" aria-valuemax="100" style="width: 50%">'+
'    <span class="sr-only">70% Complete</span>'+
'  </div>'+
'</div>'+
'      <input type="button" id="edit-submit" class="signup-submit" value="Add Skill +"></input>'+
'    </div>'+
'  </div>'+
'</div>'+
'</div>';

var SKILL_EDIT =
'<div class="grey-shade">'+
'<div class="popup-container">'+
'<div class="popup-container" style="z-index: 100000;">'+
'  <div class="popup" style="height: 540px">'+
'  <div class="exit-button"></div>'+
'    <div class="container-fluid popup-header"><img class="center-img" src="./img/signInHeaderWhite.png"></div>'+
'    <div class="container-fluid popup-body">'+
'       <input type="text" id="skill-name" class="full-width signup-input" value="" placeholder="Skill Name"></input>'+
'       <input type="range" id="proficiency" class="proficiency full-width signup-input" value=""></input>'+
'<div class="progress">'+
'    <div id="preview-progress" class="progress-bar" role="progressbar" aria-valuenow="70"'+
'    aria-valuemin="0" aria-valuemax="100" style="width: 50%">'+
'    <span class="sr-only">70% Complete</span>'+
'  </div>'+
'</div>'+
'      <input type="button" id="delete-skill" class="signup-submit" value="DELETE SKILL" style="margin-bottom: 20px"></input>'+
'      <input type="button" id="edit-submit" class="signup-submit" value="UPDATE"></input>'+
'    </div>'+
'  </div>'+
'</div>'+
'</div>';

var EDUCATION_ADD =
'<div class="grey-shade">'+
'<div class="popup-container">'+
'<div class="popup-container" style="z-index: 100000;">'+
'  <div class="popup" style="">'+
'  <div class="exit-button"></div>'+
'    <div class="container-fluid popup-header"><img class="center-img" src="./img/signInHeaderWhite.png"></div>'+
'    <div class="container-fluid popup-body">'+
'       <input type="text" id="institution-name" class="full-width signup-input" value="" placeholder="Institution"></input>'+
'       <input type="text" id="degree" class="full-width signup-input" value="" placeholder="Degree"></input>'+
'       <input type="date" id="start-date" class="full-width signup-input" value=""></input>'+
'       <input type="date" id="end-date" class="full-width signup-input" value=""></input>'+
'      <input type="button" id="edit-submit" class="signup-submit" value="ADD +"></input>'+
'    </div>'+
'  </div>'+
'</div>'+
'</div>';

var EDUCATION_EDIT =
'<div class="grey-shade">'+
'<div class="popup-container">'+
'<div class="popup-container" style="z-index: 100000;">'+
'  <div class="popup" style="">'+
'  <div class="exit-button"></div>'+
'    <div class="container-fluid popup-header"><img class="center-img" src="./img/signInHeaderWhite.png"></div>'+
'    <div class="container-fluid popup-body">'+
'       <input type="text" id="institution-name" class="full-width signup-input" value="" placeholder="Institution"></input>'+
'       <input type="text" id="degree" class="full-width signup-input" value="" placeholder="Degree"></input>'+
'       <input type="date" id="start-date" class="full-width signup-input" value=""></input>'+
'       <input type="date" id="end-date" class="full-width signup-input" value=""></input>'+
'      <input type="button" id="delete-education" class="signup-submit" value="DELETE" style="margin-bottom: 20px"></input>'+
'      <input type="button" id="edit-submit" class="signup-submit" value="UPDATE"></input>'+
'    </div>'+
'  </div>'+
'</div>'+
'</div>';

var EXPERIENCE_ADD =
'<div class="grey-shade">'+
'<div class="popup-container">'+
'<div class="popup-container" style="z-index: 100000;">'+
'  <div class="popup" style="">'+
'  <div class="exit-button"></div>'+
'    <div class="container-fluid popup-header"><img class="center-img" src="./img/signInHeaderWhite.png"></div>'+
'    <div class="container-fluid popup-body">'+
'       <input type="text" id="experience-name" class="full-width signup-input" value="" placeholder="Experience title"></input>'+
'       <input type="date" id="start-date" class="full-width signup-input" value=""></input>'+
'       <input type="date" id="end-date" class="full-width signup-input" value=""></input>'+
'        <textarea id="experience-description" class="full-width signup-input" placeholder="Description of experience."></textarea>'+
'      <input type="button" id="edit-submit" class="signup-submit" value="ADD +"></input>'+
'    </div>'+
'  </div>'+
'</div>'+
'</div>';

var EXPERIENCE_EDIT =
'<div class="grey-shade">'+
'<div class="popup-container">'+
'<div class="popup-container" style="z-index: 100000;">'+
'  <div class="popup" style="">'+
'  <div class="exit-button"></div>'+
'    <div class="container-fluid popup-header"><img class="center-img" src="./img/signInHeaderWhite.png"></div>'+
'    <div class="container-fluid popup-body">'+
'       <input type="text" id="experience-name" class="full-width signup-input" value="" placeholder="Experience title"></input>'+
'       <input type="date" id="start-date" class="full-width signup-input" value=""></input>'+
'       <input type="date" id="end-date" class="full-width signup-input" value=""></input>'+
'        <textarea id="experience-description" class="full-width signup-input" placeholder="Description of experience."></textarea>'+
'      <input type="button" id="delete-experience" class="signup-submit" value="DELETE" style="margin-bottom: 20px"></input>'+
'      <input type="button" id="edit-submit" class="signup-submit" value="UPDATE"></input>'+
'    </div>'+
'  </div>'+
'</div>'+
'</div>';

var EDIT_ABOUT = '<button id="about-btn" class="top-right ripplelink">▼</button>';

var ADD_SKILL = '<button id="skill-btn" class="top-right ripplelink">▼</button>'

var ADD_EXPERIENCE = '<button id="experience-btn" class="top-right ripplelink">▼</button>'

var ADD_EDUCATION = '<button id="education-btn" class="top-right ripplelink">▼</button>'

var EDIT_SKILL = '<button id="edit-skill-btn" class="top-right ripplelink">edit</button>'

var SKILL =
'<div class="skill">'+
'<h4 id="skill-nametag">NAME OF SKILL</h4>'+
'<div class="progress">'+
'      <div class="progress-bar" role="progressbar" aria-valuenow="70"'+
'      aria-valuemin="0" aria-valuemax="100" style="width:70%">'+
'      <span class="sr-only">70% Complete</span>'+
'    </div>'+
'  </div>'+
'<secret hidden id="skill-id"></secret>'+
'</div>'

var EDUCATION =
'<div class="education">'+
'<h4 id="education-nametag">Institution Name</br><span id="degree-name">Bachelors Degree</span></br><span id="dates">2012-2014</span></h4>'+
'<secret hidden id="education-id"></secret>'+
'</div>';

var EXPERIENCE =
'<div class="experience">'+
'<h4 id="experience-nametag">Institution Name</br><span id="experience-dates">2012-2014</span></br><span id="description"></span></h4>'+
'<secret hidden id="experience-id"></secret>'+
'</div>';

var PIC_EDIT =
'<span id="edit-pic-hover" class="sub_icon glyphicon glyphicon-pencil"></span>';

var FACEBOOKICON =
'<div class="resume-social-icon facebook"><i class="fab fa-facebook-f"></i></div>';

var INSTAGRAMICON =
'<div class="resume-social-icon instagram"><i class="fab fa-instagram"></i></div>';

var TWITTERICON =
'<div class="resume-social-icon twitter"><i class="fab fa-twitter"></i></div>';

var ADDICON =
'<div class="resume-social-icon addIcon"><i class="fas fa-plus"></i>'+
'<div class="social-icons-settings hidden">'+
'  <input class="social-input facebook-input" type="text" placeholder="Facebook Link"></input>'+
'  <input class="social-input instagram-input" type="text" placeholder="Instagram Link"></input>'+
'  <input class="social-input twitter-input" type="text" placeholder="Twitter Link"></input>'+
'  <button class="social-icons-update">Update</button>'+
'</div>'+
'</div>';
