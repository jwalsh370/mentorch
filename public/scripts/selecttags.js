var queuedTags = '';

$('tag').each(function(){
  $(this).click(function(){
    if(queuedTags.match($(this).html().replace(/\s+/g, ''))){
      $(this).removeClass('tag-selected')
      queuedTags =  queuedTags.replace($(this).text().replace(/\s+/g, ''), '')
      userRef.child(uid).update({
        tags: queuedTags
      })
    } else {
      $(this).addClass('tag-selected')
      queuedTags +=  $(this).html().replace(/\s+/g, '') + " "
      userRef.child(uid).update({
        tags: queuedTags
      })
    }
  })
})
