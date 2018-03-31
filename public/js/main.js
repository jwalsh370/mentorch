var toggle = 0;
$(".navbar-toggle").click(function(){
  if(!toggle){
    $(".navbar-collapse").css("display", "block")
    $(".navbar-collapse").css("background-color", "#1f1f1f;")
    toggle = 1
  } else {
    $(".navbar-collapse").css("display", "none")
    $(".navbar-collapse").css("background-color", "transparent")
    toggle = 0
  }
})

$(function(){
	var ink, d, x, y;
	$(".ripplelink").click(function(e){
    if($(this).find(".ink").length === 0){
        $(this).prepend("<span class='ink'></span>");
    }

    ink = $(this).find(".ink");
    ink.removeClass("animate");

    if(!ink.height() && !ink.width()){
        d = Math.max($(this).outerWidth(), $(this).outerHeight());
        ink.css({height: d, width: d});
    }

    x = e.pageX - $(this).offset().left - ink.width()/2;
    y = e.pageY - $(this).offset().top - ink.height()/2;

    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
});
});

$(document).ready(function(){
  $(".slider").fadeIn(400, function(){
    $(this).removeClass('slide')
  })
})

var client = algoliasearch('E3R4JOR1Z6', '5cfaa73207b882d4925325869394c3e9');

var index = client.initIndex('contacts');


//index.addObject({
//  firstname: 'Jimmie',
//  lastname: 'Barninger'
//}, 'myID', function(err, content) {
//
//});

//index.search('Atlenta', function(err, results) {
//  if (err) {
//    throw err;
//  }
//  console.log('We got `' + results.nbHits + '` results');
//  console.log('Here are some: ', results.hits[0].firstname + ", " + results.hits[1].firstname);
//});
