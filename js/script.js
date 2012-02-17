$(document).ready(function(){

  // iOS scale bug fix
  MBP.scaleFix();

  // hide iOS URL bar
  // MBP.hideUrlBar();

  // Respond.js
  yepnope({
  	test : Modernizr.mq('(only all)'),
  	nope : ['js/libs/respond.min.js']
  });


	// Run Mathias Bynens jQuery placeholder plugin (see plugins.js)
  // if ($.fn.placeholder) {
  //  $('input, textarea').placeholder();
  // }

});
