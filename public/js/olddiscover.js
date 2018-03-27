$('.searchbar').keyup(function(){
  //alert($('.search-bar-input').val())
  var education = $('#education-filter').val()
  var profession = $('#profession-filter').val()
  var tags = $('#tags-filter').val()

  $('#education-filter').keyup(function(){
      var education = $('#education-filter').val()
      searchUsers($('.searchbar').val(),'',profession,tags)
  })
  $('#profession-filter').keyup(function(){
      var profession = $('#profession-filter').val() || "test"
      searchUsers($('.searchbar').val(),'',profession,tags)
  })
  $('#tags-filter').keyup(function(){
      var tags = $('#tags-filter').val()
      searchUsers($('.searchbar').val(),'',profession,tags)
  })

  searchUsers($('.searchbar').val(),'',profession,tags)

})

index.setSettings({
  'attributesForFaceting': ['filterOnly(firstname)', 'filterOnly(lastname)', 'filterOnly(profession)', 'filterOnly(tags)']
})

function searchUsers(general, education, profession, tags){


  index.search({

    filters: 'firstname: ' + general + ' OR lastname:' + general // + ' OR profession: ' + profession// + ' OR tags: ' + tags

  }, function(err, results) {
    if (err) {
      throw err;
    }
    $('.discover-results-container').html('');
    for(i=0; i < results.nbHits; i++ ){
      var uid = new Array();
      var index = i;
      uid.push(results.hits[i].uid);
      var newResult = $(DISCOVER_RESULT);
      newResult.find("#discover-name").html(results.hits[i].firstname + " " + results.hits[i].lastname);
      newResult.find("#discover-profession").html(results.hits[i].profession);
      newResult.find("#discover-pic").attr('src', results.hits[i].pic);
      newResult.find("#discover-resume").attr('href', 'https://localhost/resume.php?name=' + results.hits[i].uid)
      $('.discover-results-container').append(newResult);
    }
  });
}

$('.search-bar-input').blur(function(){
  setTimeout(function(){
    $('.search-container').html('');
  }, 150)

})

var DISCOVER_RESULT =
"<div class='discover-result row'>"+
'  <div class="col-md-8 col-sm-8 col-xs-8" style="padding: 0px;"><div class="row"><img id="discover-pic" src="https://firebasestorage.googleapis.com/v0/b/mentorch-95b8c.appspot.com/o/lis49WBpobOy937WZa9Pelc43Tj2%2Favatar.png?alt=media&token=b840cba3-fb49-4d1a-83bc-1b5d5e357b31"></img><div class="" id="discover-info"><span id="discover-name">James Boushell</span> | <span id="discover-profession">Developer/Designer</span></div></div>'+
'  <div class="row"></div></div>'+
'  <div class="col-md-4 col-sm-4 col-xs-4 button-container"><a id="discover-resume"><button class="button">Resume</button></a></div>'+
'</div>';
