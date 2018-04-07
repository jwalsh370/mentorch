$('.search-bar-input').focus(function(){
  //alert($('.search-bar-input').val())
  if($('.search-bar-input').val() != ""){

    index.search($('.search-bar-input').val(), function(err, results) {
      if (err) {
        throw err;
      }
      $('.search-container').html('');
      for(i=0; i < results.nbHits; i++ ){
        var uid = new Array();
        var index = i;
        uid.push(results.hits[i].uid);
        var newResult = $(SEARCH_RESULT).html(results.hits[i].firstname + " " + results.hits[i].lastname).attr('href', '/resume?id=' + results.hits[i].uid)
        $('.search-container').append(newResult);
      }
    });

  }


})

$('.search-bar-input').keyup(function(){
  //alert($('.search-bar-input').val())

  index.search($('.search-bar-input').val(), function(err, results) {
    if (err) {
      throw err;
    }
    $('.search-container').html('');
    for(i=0; i < results.nbHits; i++ ){
      var uid = new Array();
      var index = i;
      uid.push(results.hits[i].uid);
      var newResult = $(SEARCH_RESULT).html(results.hits[i].firstname + " " + results.hits[i].lastname).attr('href', '/resume?id=' + results.hits[i].uid)
      $('.search-container').append(newResult);
    }
  });

})

$('.search-bar-input').blur(function(){
  setTimeout(function(){
    $('.search-container').html('');
  }, 150)

})

var SEARCH_RESULT = '<a href="" class="search-result"></a>';
