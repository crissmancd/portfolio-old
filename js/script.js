$(document).ready(function(){

  // iOS scale bug fix
  MBP.scaleFix();

  // Respond.js
  yepnope({
  	test : Modernizr.mq('(only all)'),
  	nope : ['js/libs/respond.min.js']
  });


	// Run Mathias Bynens jQuery placeholder plugin (see plugins.js)
	if ($.fn.placeholder) {
		$('input, textarea').placeholder();
	}

	// Run Matt Kersley's jQuery Responsive menu plugin (see plugins.js)
  // if ($.fn.mobileMenu) {
  //  $('ol#id').mobileMenu({
  //    switchWidth: 768,                   // width (in px to switch at)
  //    topOptionText: 'Choose a page',     // first option text
  //    indentString: '&nbsp;&nbsp;&nbsp;'  // string for indenting nested items
  //  });
  // }

});
