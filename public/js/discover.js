auth.onAuthStateChanged(function(user){

  var tagsArray = []
  var tags = "";

  for(i=0; i < $('.profile-tag').length; i++){
    $('.profile-tag:eq(' + i + ')').click(function(){
      if($(this).hasClass('tag-selected')){
        $(this).removeClass('tag-selected');
        for(i=0; i < tagsArray.length; i++){
          if(tagsArray[i] == $(this).html().replace(/\s+/g, '')){
            tagsArray.splice(i, 1)
          }
        }
        loadCards()
        //alert(tagsArray)
      } else {
        $(this).addClass('tag-selected');
        tagsArray.push($(this).html().replace(/\s+/g, ''))
        loadCards()
      }
    })
  }

function loadCards(){
  if(user){
    $('.card-container').html('');
    userRef.once('value', function(snap){
      snap.forEach(function(data){

        if(checkTags(data.val().tags || '')){
          var picture = data.val().profile_picture;
          var name = data.val().first_name + " " + data.val().last_name;
          var bio = data.val().bio;
          var profession = data.val().profession;
          var mentor_type = data.val().mentor_type;

          //alert(data.val().user_id)
          var card = $(SMALLCARD).appendTo(".card-container");
          card.fadeIn(1000, function(){
            card.removeClass('fall');
          });
          card.find('.small-card-img').attr('src', data.val().profile_picture);
          card.find('.small-card-name').html(data.val().first_name + " " + data.val().last_name)
          card.find('.small-card-bio').html(data.val().bio)
          card.click(function(){
            var bigcard = $(BIGCARD).insertBefore(".hub-wrapper");
            bigcard.find('.exit-button').click(function(){
              $('.big-card-container').remove()
            })
            bigcard.find('.big-card-img').attr('src', picture)
            bigcard.find('.big-card-name').html(name)
            bigcard.find('.big-card-profession').html(profession)
            bigcard.find('.big-card-bio').html(bio)
            bigcard.find('.big-card-resume').attr('href', 'resume?id=' + data.key)
            bigcard.find('.big-card-connect').click(function(){
              userRef.child(user.uid).once('value', function(snap){
                var firstname = snap.val().first_name;
                var lastname = snap.val().last_name;

              userRef.child(data.key).child('notifications').push({
                  type: 'friend-request',
                  from: user.uid,
                  firstname: firstname,
                  lastname: lastname
              })


              })

              $('#connect-button').remove();
              alert("Request sent!")
            })
          })
        }
      })
    })
  }
}

  loadCards()

  $('.searchbar').keyup(function(){
    $('.card-container').html('');
    userRef.once('value', function(snap){
      snap.forEach(function(data){
        var name = data.val().first_name + " " + data.val().last_name;
        if(name.match(new RegExp($('.searchbar').val(), 'i')) && checkTags(data.val().tags || '')){


          var picture = data.val().profile_picture;
          var name = data.val().first_name + " " + data.val().last_name;
          var bio = data.val().bio;
          var profession = data.val().profession;

          //alert(data.val().user_id)
          var card = $(SMALLCARD).appendTo(".card-container");
          card.fadeIn(1000, function(){
            card.removeClass('fall');
          });
          card.find('.small-card-img').attr('src', data.val().profile_picture);
          card.find('.small-card-name').html(data.val().first_name + " " + data.val().last_name)
          card.find('.small-card-bio').html(data.val().bio)
          card.click(function(){
            var bigcard = $(BIGCARD).insertBefore(".hub-wrapper");
            bigcard.find('.exit-button').click(function(){
              $('.big-card-container').remove()
            })
            bigcard.find('.big-card-img').attr('src', picture)
            bigcard.find('.big-card-name').html(name)
            bigcard.find('.big-card-profession').html(profession)
            bigcard.find('.big-card-bio').html(bio)
            bigcard.find('.big-card-resume').attr('href', 'resume?id=' + data.key)
            bigcard.find('.big-card-connect').click(function(){
              userRef.child(user.uid).once('value', function(snap){
                var firstname = snap.val().first_name;
                var lastname = snap.val().last_name;

              userRef.child(data.key).child('notifications').push({
                  type: 'friend-request',
                  from: user.uid,
                  firstname: firstname,
                  lastname: lastname
              })


              })

              $('#connect-button').remove();
              alert("Request sent!")
            })
          })

        }

      })
    })
  })

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


  function checkTags(tagsToCheck){
    var noMatch = true;
    if(tagsArray != null){
      if(tagsArray.length > 0){
        for(i=0; i < tagsArray.length; i++){
          if(tagsToCheck.match(tagsArray[i])){
            //alert("matched tag! " + tagsArray[i])
          } else {
            //alert("No match")
            return false
          }
        }
        return true
      }
    }
    return true
  }

})


var SMALLCARD = '<div class="small-card fall">'+
'  <img class="small-card-img" src=""></img>'+
'  <span class="small-card-name"></span>'+
'  <span class="small-card-bio"></span>'+
'</div>';


var BIGCARD ='<div class="big-card-container">'+
'  <div class="big-card">'+
' <span class="exit-button">X</span>'+
'    <img class="big-card-img" src=""></img>'+
'    <span class="big-card-name"></span>'+
'    <span class="big-card-profession"></span>'+
'    <span class="big-card-bio"></span>'+
'    <span class="big-card-controls">'+
'      <a class="big-card-resume card-button">Resume</a>'+
'      <div class="big-card-connect card-button" id="connect-button">+ Connect!</div>'+
'      <div class="big-card-next card-button">Next ></div>'+
'    </span>'+
'  </div>'+
'</div>'

var SMALLPOPUP = '<span class="small-popup"><tagbutton class="profile-tag" id="test">test</tagbutton></span>'
