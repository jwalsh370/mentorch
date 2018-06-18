updateResults($('#discover-search').val())

$('#discover-search').on('input', function(){
  updateResults($('#discover-search').val())
})

var queuedTags = [];

$('tag').each(function(){
  $(this).click(function(){
    if(($.inArray( $(this).html() ,queuedTags) != -1)){
      $(this).removeClass('tag-selected')
      queuedTags.splice($.inArray( $(this).html() ,queuedTags), 1)
      updateResults($('#discover-search').val())
    } else {
      $(this).addClass('tag-selected');
      queuedTags.push($(this).html());
      updateResults($('#discover-search').val())
    }
  })
})

function updateResults(input){
  //alert(input)
  $('.results-container').html('')
  userRef.on('child_added', function(data){
    if((data.val().first_name.toLowerCase().match(input.toLowerCase()) || data.val().last_name.toLowerCase().match(input.toLowerCase()))){

      var hits = 100;
      var test = false;
      queuedTags.forEach(function(tag){
        if(data.val().tags.match(tag)){
          test = true;
          hits -= 1;
        } else {
          test = false
        }
      })

      var result = $(DISCOVER_RESULT).appendTo('.results-container');
      result.find('.discover-result-pic').attr('src', data.val().profile_picture)
      result.find('.discover-result-name').html(data.val().first_name + ' ' + data.val().last_name)
      result.find('.discover-result-profession').html(data.val().profession)
      result.click(function(){
        location.replace('/resume/' + data.key)
      })
      result.css('order', hits)
    }
  })
}


var DISCOVER_RESULT =
'  <div class="discover-result">'+
'    <img class="discover-result-pic" src=""></img>'+
'    <h4 class="discover-result-name">Name Here</h4>'+
'    <p class="discover-result-profession">Profession here</p>'+
'  </div>';
