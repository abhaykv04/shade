$(document).ready(() => {
  let username, usernameSmallText, password, passwordSmallText;

  // Trigger on every keypress in username field
  $('#username').keyup(() => {
    username = $('#username').val();
    usernameSmallText = $('#username-small-text');

    // If username field is empty
    if (!username) usernameSmallText.text('');
    // If non-alphabet character is present
    else if (username.search(/[^a-z]/i) >= 0)
      usernameSmallText
        .removeClass('text-success')
        .addClass('text-danger')
        .text('Alphabet Characters Only');
    // If username is short
    else if (username.length < 4)
      usernameSmallText
        .removeClass('text-success')
        .addClass('text-danger')
        .text('Minimum 4 Characters');
    // Show success small text
    else
      usernameSmallText
        .removeClass('text-danger')
        .addClass('text-success')
        .text('OK');
  });

  // Trigger on every keypress in password field
  $('#password').keyup(() => {
    password = $('#password').val();
    passwordSmallText = $('#password-small-text');

    // If password field is empty
    if (!password) passwordSmallText.text('');
    // If password is short
    else if (password.length < 6)
      passwordSmallText
        .removeClass('text-success')
        .addClass('text-danger')
        .text('Minimum 6 Characters');
    // Show success small text
    else
      passwordSmallText
        .removeClass('text-danger')
        .addClass('text-success')
        .text('OK');
  });

  // Trigger on form submission
  $('#submit').click(() => {
    username = $('#username').val();
    usernameSmallText = $('#username-small-text');
    password = $('#password').val();
    passwordSmallText = $('#password-small-text');

    // If non-alphabet character is present
    if (username.search(/[^a-z]/i) >= 0) {
      usernameSmallText
        .removeClass('text-success')
        .addClass('text-danger')
        .text('Alphabet Characters Only');
      return false;
    }
    // If username is short
    else if (username.length < 4) {
      usernameSmallText
        .removeClass('text-success')
        .addClass('text-danger')
        .text('Minimum 4 Characters');
      return false;
    }

    // If password is short
    if (password.length < 6) {
      passwordSmallText
        .removeClass('text-success')
        .addClass('text-danger')
        .text('Minimum 6 Characters');
      return false;
    }

    // Inputs are valid
    return true;
  });
});