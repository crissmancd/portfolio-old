$(document).ready(function(){

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
