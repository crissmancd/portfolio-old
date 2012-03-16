/*
 * jQuery Extended Selectors plugin. (c) Keith Clark freely distributable under the terms of the MIT license.
 * Adds missing -of-type pseudo-class selectors to jQuery
 * github.com/keithclark/JQuery-Extended-Selectors  -  twitter.com/keithclarkcouk  -  keithclark.co.uk
 */
(function(g){function e(a,b){for(var c=a,d=0;a=a[b];)c.tagName==a.tagName&&d++;return d}function h(a,b,c){a=e(a,c);if(b=="odd"||b=="even")c=2,a-=b!="odd";else{var d=b.indexOf("n");d>-1?(c=parseInt(b,10)||parseInt(b.substring(0,d)+"1",10),a-=(parseInt(b.substring(d+1),10)||0)-1):(c=a+1,a-=parseInt(b,10)-1)}return(c<0?a<=0:a>=0)&&a%c==0}var f={"first-of-type":function(a){return e(a,"previousSibling")==0},"last-of-type":function(a){return e(a,"nextSibling")==0},"only-of-type":function(a){return f["first-of-type"](a)&&
f["last-of-type"](a)},"nth-of-type":function(a,b,c){return h(a,c[3],"previousSibling")},"nth-last-of-type":function(a,b,c){return h(a,c[3],"nextSibling")}};g.extend(g.expr[":"],f)})(jQuery);


$(document).ready(function(){

  $('.show-nav').click(function() {
    $(this).parent().toggleClass('show');
  })

  $.localScroll();

  $('form').submit(submitForm);

  // iOS scale bug fix
  MBP.scaleFix();

  // hide iOS URL bar
  MBP.hideUrlBar();

  // Respond.js
  yepnope({
  	test : Modernizr.mq('(only all)'),
  	nope : ['js/libs/respond.min.js']
  });

});


// How long to display status messages (in milliseconds)
var messageDelay = 2000;

// Submit the form via Ajax
function submitForm() {
  var contactForm = $(this);

  // Are all the fields filled in?
  if ( !$('#name').val() || !$('#email').val() || !$('#message').val() ) {

    // No; display a warning message and return to the form
    // contactForm.hide().delay(messageDelay).fadeIn();
    //     $('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut('fast');

    contactForm.hide().delay(messageDelay).fadeIn();
    $('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut('fast');

  } else {

    // Yes; submit the form to the PHP script via Ajax
    contactForm.hide();
    $('#sendingMessage').fadeIn();

    $.ajax( {
      url: contactForm.attr( 'action' ) + "?ajax=true",
      type: contactForm.attr( 'method' ),
      data: contactForm.serialize(),
      success: submitFinished
    } );
  }

  // Prevent the default form submission occurring
  return false;
}


// Handle the Ajax response
function submitFinished( response ) {
  response = $.trim( response );
  $('#sendingMessage').fadeOut();

  if ( response == "success" ) {

    // Form submitted successfully:
    // 1. Display the success message
    // 2. Clear the form fields
    // 3. Fade the content back in

    $('#successMessage').fadeIn().delay(messageDelay).fadeOut();
    $('#name').val( "" );
    $('#email').val( "" );
    $('#message').val( "" );
    $('form').delay(messageDelay+500).fadeIn();

  } else {

    // Form submission failed: Display the failure message,
    // then redisplay the form
    $('#failureMessage').fadeIn().delay(messageDelay).fadeOut();
    $('form').delay(messageDelay+500).fadeIn();
  }
}



/*
 * MBP - Mobile boilerplate helper functions
 */
(function(document){

window.MBP = window.MBP || {};

// Fix for iPhone viewport scale bug
// http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/

MBP.viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]');
MBP.ua = navigator.userAgent;

MBP.scaleFix = function () {
  if (MBP.viewportmeta && /iPhone|iPad/.test(MBP.ua) && !/Opera Mini/.test(MBP.ua)) {
    MBP.viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
    document.addEventListener("gesturestart", MBP.gestureStart, false);
  }
};


// Hide URL Bar for iOS

MBP.hideUrlBar = function () {
    /iPhone/.test(MBP.ua) && !pageYOffset && !location.hash && setTimeout(function () {
      window.scrollTo(0, 1);
    }, 1000);
};

})(document);

