$(document).ready(function(){


  userRef.child(uid).once('value', function(data){
    if(data.hasChild('resume')){
      //Load Skills
        userRef.child(uid).child('resume').child('skills').on('child_added', function(data){
          var skill = $(SKILL).appendTo('.skills');
          $(skill).find('#skill-title').html(data.val().name);
          $(skill).find('progress-bar').css('width' , data.val().proficiency + '%');
        })

      //Load Experience
        userRef.child(uid).child('resume').child('experience').on('child_added', function(data){
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
        })

      //Load Education
        userRef.child(uid).child('resume').child('education').on('child_added', function(data){
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
        })

    } else {
      alert('load bs')
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










})
