$(document).ready(function(){






  userRef.child(resumeUid).once('value', function(data){
    if(data.hasChild('resume')){
      //Load Skills
        userRef.child(resumeUid).child('resume').child('skills').on('child_added', function(data){
          var skill = $(SKILL).appendTo('.skills');
          $(skill).find('#skill-title').html(data.val().name);
          $(skill).find('progress-bar').css('width' , data.val().proficiency + '%');
          if(resumeUid == UID){
            $(skill).addClass('edit-content');
            $(skill).click(function(){
              var editSkill = $(SKILLS_UPDATE).insertAfter('head');
              editSkill.find('#skillname').val(data.val().name);
              editSkill.find('.slider').val(data.val().proficiency);
              editSkill.find('.loading').css('width', data.val().proficiency + '%');
              editSkill.find('#update').click(function(){
                userRef.child(resumeUid).child('resume').child('skills').child(data.key).update({
                  'name' : $('#skillname').val(),
                  'proficiency' : $('.slider').val(),
                })

                location.reload();
              })

              editSkill.find('#delete').click(function(){
                userRef.child(resumeUid).child('resume').child('skills').child(data.key).remove()

                location.reload();
              })

              editSkill.find('.exit-button').click(function(){
                $(this).parent().parent().remove()
              })

              $('.slider').on('input', function(){
                $('.loading').css('width', $('.slider').val() + '%')
              })

            })
          } else {


          }
        })

      //Load Experience
        userRef.child(resumeUid).child('resume').child('experience').on('child_added', function(data){
          var experience = $(EXPERIENCE).appendTo('.experience');
          $(experience).find('#experience-title').html(data.val().name);
          $(experience).find('#experience-description').html(data.val().description);
          $(experience).find('#experience-dates').html(function(){
            if(data.val().start_date.substring(0, 4) == (new Date()).getFullYear() && data.val().end_date.substring(0, 4) == (new Date()).getFullYear()){
              return 'Present'
            } else if(data.val().end_date.substring(0, 4) == (new Date()).getFullYear()){
              return data.val().start_date.substring(0, 4) + ' - Present';
            } else {
              return data.val().start_date.substring(0, 4) + ' - ' + data.val().end_date.substring(0, 4);
            }

          });
          if(resumeUid == UID){
            $(experience).addClass('edit-content')
            $(experience).click(function(){
              var editExperience = $(EXPERIENCE_UPDATE).insertAfter('head');
              editExperience.find('#experiencename').val(data.val().name);
              editExperience.find('#experiencedescription').val(data.val().description);
              editExperience.find('#experiencestartdate').val(data.val().start_date);
              editExperience.find('#experienceenddate').val(data.val().end_date);
              editExperience.find('#update').click(function(){
                userRef.child(resumeUid).child('resume').child('experience').child(data.key).update({
                  name: editExperience.find('#experiencename').val(),
                  description: editExperience.find('#experiencedescription').val(),
                  start_date: editExperience.find('#experiencestartdate').val(),
                  end_date: editExperience.find('#experienceenddate').val(),
                })

                location.reload();
              })
              editExperience.find('#delete').click(function(){
                userRef.child(resumeUid).child('resume').child('experience').child(data.key).remove()
                location.reload();
              })

              editExperience.find('.exit-button').click(function(){
                $(this).parent().parent().remove()
              })

            })
          }
        })

      //Load Education
        userRef.child(resumeUid).child('resume').child('education').on('child_added', function(data){
          var education = $(EDUCATION).appendTo('.education');
          $(education).find('#education-title').html(data.val().name);
          $(education).find('#education-status').html(data.val().degree);
          $(education).find('#education-dates').html(function(){
            if(data.val().start_date.substring(0, 4) == (new Date()).getFullYear() && data.val().end_date.substring(0, 4) == (new Date()).getFullYear()){
              return 'Present'
            } else if(data.val().end_date.substring(0, 4) == (new Date()).getFullYear()){
              return data.val().start_date.substring(0, 4) + ' - Present';
            } else {
              return data.val().start_date.substring(0, 4) + ' - ' + data.val().end_date.substring(0, 4);
            }

          });
          if(resumeUid == UID){
            $('.connect-button').hide()
            $(education).addClass('edit-content')
            $(education).click(function(){
              var editEducation = $(EDUCATION_UPDATE).insertAfter('head');
              editEducation.find('#educationname').val(data.val().name);
              editEducation.find('#educationdescription').val(data.val().degree);
              editEducation.find('#educationstartdate').val(data.val().start_date);
              editEducation.find('#educationenddate').val(data.val().end_date);
              editEducation.find('#update').click(function(){
                userRef.child(resumeUid).child('resume').child('education').child(data.key).update({
                name: editEducation.find('#educationname').val(),
                degree: editEducation.find('#educationdescription').val(),
                start_date: editEducation.find('#educationstartdate').val(),
                end_date: editEducation.find('#educationenddate').val(),
              })
              location.reload();
              })

              editEducation.find('#delete').click(function(){
                userRef.child(resumeUid).child('resume').child('education').child(data.key).remove()
                location.reload();
              })

              editEducation.find('.exit-button').click(function(){
                $(this).parent().parent().remove()
              })

            })


          } else {

            userRef.child(UID).child('friends').once('value', function(snap){
              if(snap.hasChild(resumeUid)){
                $('.connect-button').remove()
              } else {

                $('.connect-button').click(function(){

                    userRef.child(UID).once('value', function(data){
                      userRef.child(resumeUid).child('notifications').push({
                        type: 'friend-request',
                        firstname: data.val().first_name,
                        lastname: data.val().last_name,
                        pic: data.val().profile_picture,
                        from: UID
                      })
                    })

                    $('.connect-button').remove()



                })


              }
            })

          }
        })

    } else {
      alert('load')
    }
  })

  var toggle = false;

  firebase.auth().onAuthStateChanged(function(user){
    if(user.uid == resumeUid){

//ABOUT ME UPDATEABILITY
        $(".about-me").addClass('edit-content')
          $(".about-me").click(function(){
            userRef.child(resumeUid).child('resume').on('value', function(data){
              if(!toggle){
                toggle = true;
                $('#bio').toggleClass('hidden');
                $(EDIT_ABOUT_ME).insertAfter($('#bio'))
                $('.edit-text').focus()
                $('.edit-text').html(data.val().about_me)
                $('.edit-text').keypress(function(e) {
                  if(e.which == 13) {
                    userRef.child(user.uid).child('resume').update({
                      'about_me': $('.edit-text').val()
                    })
                    $('.edit-text').remove();
                    $('#bio').toggleClass('hidden');
                    userRef.child(resumeUid).child('resume').once('value', function(data){
                      $('#bio').html(data.val().about_me);
                    })
                    toggle = false;
                  }
                });
              }
          })
      })

      $(".skills").addClass('edit-content')
      var skillsAdd = $(ADD_BUTTON).insertAfter('.skills-title');
      skillsAdd.click(function(){

        var addSkill = $(SKILLS_ADD).insertAfter('head');
        addSkill.find('#add').click(function(){
          userRef.child(resumeUid).child('resume').child('skills').push({
            'name' : $('#skillname').val(),
            'proficiency' : $('.slider').val(),
          })
          location.reload();
        })
        addSkill.find('.exit-button').click(function(){
          $(this).parent().parent().remove()
        })
        addSkill.find('.slider').on('input', function(){
          $('.loading').css('width', $('.slider').val() + '%')
        })

      })



      $(".experience").addClass('edit-content')
      var experienceAdd = $(ADD_BUTTON).insertAfter('.experience-title');
      experienceAdd.click(function(){
        var addExperience = $(EXPERIENCE_ADD).insertAfter('head');
        addExperience.find('#add').click(function(){
          userRef.child(resumeUid).child('resume').child('experience').push({
            name: addExperience.find('#experiencename').val(),
            description: addExperience.find('#experiencedescription').val(),
            start_date: addExperience.find('#experiencestartdate').val(),
            end_date: addExperience.find('#experienceenddate').val(),
          })
          location.reload();
        })
        addExperience.find('.exit-button').click(function(){
          $(this).parent().parent().remove()
        })
      })


      $(".education").addClass('edit-content')
      var educationAdd = $(ADD_BUTTON).insertAfter('.education-title');
      educationAdd.click(function(){
        var addEducation = $(EDUCATION_ADD).insertAfter('head');
        addEducation.find('#add').click(function(){
          userRef.child(resumeUid).child('resume').child('education').push({
            name: addEducation.find('#educationname').val(),
            degree: addEducation.find('#educationdescription').val(),
            start_date: addEducation.find('#educationstartdate').val(),
            end_date: addEducation.find('#educationenddate').val(),
          })
          location.reload();
        })
        addEducation.find('.exit-button').click(function(){
          $(this).parent().parent().remove()
        })
      })

    }
  })






  var SKILL = '<div class="skill-mod">'+
  '  <h4 id="skill-title">Skill</h4>'+
  '  <progress-bar></progress-bar>'+
  '</div>';

  var EXPERIENCE = '<div class="experience-mod">'+
    '<h3 id="experience-title">Experience</h3>'+
    '<h4 id="experience-dates">2016-Present</h4>'+
    '<p id="experience-description">Description of the experience goes here.</p>'+
    '</div>';

  var EDUCATION = '  <div class="education-mod">'+
'    <h3 id="education-title">Education</h3>'+
'    <h4 id="education-status">Bachelors</h4>'+
'    <p id="education-dates">2016-Present</p>'+
'  </div>'


var EDIT_ABOUT_ME = '<textarea class="edit-text"></textarea>';

var SKILLS_UPDATE =
'<small-popup class="">'+
'  <div class="popup-container">'+
'<span class="exit-button">x</span>'+
'    <div class="popup-header">'+
'      <h1 class="popup-h1 white">Edit your skills!</h1>'+
'      <h3 class="popup-h3">Edit or add skills to simply show off your abilities!</h1>'+
'    </div>'+
"    <input class='popup-input' type='text' placeholder='Skill name' id='skillname'></input>"+
"    <h3 class='popup-h3 white'>User the slider to edit your proficiency!</h1>"+
'    <input class="slider" type="range"></input>'+
'    <bar><div class="loading"></div></bar>'+
"    <input class='popup-button popup-button1' type='button' value='Update' id='update'></input>"+
"    <input class='popup-button popup-button1' type='button' value='Delete!' id='delete'></input>"+
'  </div>'+
'</small-popup>';

var SKILLS_ADD =
'<small-popup class="">'+
'  <div class="popup-container">'+
'<span class="exit-button">x</span>'+
'    <div class="popup-header">'+
'      <h1 class="popup-h1 white">ADD A SKILL!</h1>'+
'      <h3 class="popup-h3">Edit or add skills to simply show off your abilities!</h1>'+
'    </div>'+
"    <input class='popup-input' type='text' placeholder='Skill name' id='skillname'></input>"+
"    <h3 class='popup-h3 white'>User the slider to edit your proficiency!</h1>"+
'    <input class="slider" type="range"></input>'+
'    <bar><div class="loading"></div></bar>'+
"    <input class='popup-button popup-button1' type='button' value='Add skill!' id='add'></input>"+
'  </div>'+
'</small-popup>';

var EXPERIENCE_UPDATE =
'<small-popup class="">'+
'  <div class="popup-container">'+
'<span class="exit-button">x</span>'+
'    <div class="popup-header">'+
'      <h1 class="popup-h1 white">Edit your experience!</h1>'+
'      <h3 class="popup-h3">Edit or add experience to display your achievements!</h1>'+
'    </div>'+
"    <input class='popup-input' type='text' placeholder='Experience name' id='experiencename'></input>"+
"    <input class='popup-input' type='date' placeholder='Experience start date' id='experiencestartdate'></input>"+
"    <input class='popup-input' type='date' placeholder='Experience end date' id='experienceenddate'></input>"+
"    <input class='popup-input' type='text' placeholder='Experience description' id='experiencedescription'></input>"+
"    <input class='popup-button popup-button1' type='button' value='Update' id='update'></input>"+
"    <input class='popup-button popup-button1' type='button' value='Delete!' id='delete'></input>"+
'  </div>'+
'</small-popup>';

var EXPERIENCE_ADD =
'<small-popup class="">'+
'  <div class="popup-container">'+
'<span class="exit-button">x</span>'+
'    <div class="popup-header">'+
'      <h1 class="popup-h1 white">Add your experience!</h1>'+
'      <h3 class="popup-h3">Edit or add experience to display your achievements!</h1>'+
'    </div>'+
"    <input class='popup-input' type='text' placeholder='Experience name' id='experiencename'></input>"+
"    <input class='popup-input' type='date' placeholder='Experience start date' id='experiencestartdate'></input>"+
"    <input class='popup-input' type='date' placeholder='Experience end date' id='experienceenddate'></input>"+
"    <input class='popup-input' type='text' placeholder='Experience description' id='experiencedescription'></input>"+
"    <input class='popup-button popup-button1' type='button' value='Add' id='add'></input>"+
'  </div>'+
'</small-popup>';

var EDUCATION_UPDATE =
'<small-popup class="">'+
'  <div class="popup-container">'+
'<span class="exit-button">x</span>'+
'    <div class="popup-header">'+
'      <h1 class="popup-h1 white">Edit your education!</h1>'+
'      <h3 class="popup-h3">Edit or add your education to display your achievements!</h1>'+
'    </div>'+
"    <input class='popup-input' type='text' placeholder='Education name' id='educationname'></input>"+
"    <input class='popup-input' type='date' placeholder='Education start date' id='educationstartdate'></input>"+
"    <input class='popup-input' type='date' placeholder='Education end date' id='educationenddate'></input>"+
"    <input class='popup-input' type='text' placeholder='Degree or Certificate' id='educationdescription'></input>"+
"    <input class='popup-button popup-button1' type='button' value='Update' id='update'></input>"+
"    <input class='popup-button popup-button1' type='button' value='Delete!' id='delete'></input>"+
'  </div>'+
'</small-popup>';

var EDUCATION_ADD =
'<small-popup class="">'+
'  <div class="popup-container">'+
'<span class="exit-button">x</span>'+
'    <div class="popup-header">'+
'      <h1 class="popup-h1 white">Edit your education!</h1>'+
'      <h3 class="popup-h3">Edit or add your education to display your achievements!</h1>'+
'    </div>'+
"    <input class='popup-input' type='text' placeholder='Education name' id='educationname'></input>"+
"    <input class='popup-input' type='date' placeholder='Education start date' id='educationstartdate'></input>"+
"    <input class='popup-input' type='date' placeholder='Education end date' id='educationenddate'></input>"+
"    <input class='popup-input' type='text' placeholder='Degree or Certificate' id='educationdescription'></input>"+
"    <input class='popup-button popup-button1' type='button' value='Add' id='add'></input>"+
'  </div>'+
'</small-popup>';


var ADD_BUTTON = "<button class='edit-button'>+</button>";



})
