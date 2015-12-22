$(window).load(function() {
  $('.tooltip').each(function() {
    var name = $(this).attr('id');
    $(this).tooltipster({
      'theme': 'tooltipster-custom',
      'position': 'top',
      'content': '<img class="tooltip-image" src="images/screenshots/' + name + '.png"/>',
      'contentAsHTML': true,
      'updateAnimation': false
    });

    $(this).tooltipster('show').tooltipster('hide');
  });
});
