$(document).ready(() => {
  let username, usernameSmallText, password, passwordSmallText;

  // Trigger on every input change in username field
  $('#username').on('input', () => {
    $('#username-small-text').text('');
  });

  // Trigger on every input change in password field
  $('#password').on('input', () => {
    $('#password-small-text').text('');
  });

  // Trigger on form submission
  $('#form').submit(() => {
    username = $('#username').val();
    usernameSmallText = $('#username-small-text');
    password = $('#password').val();
    passwordSmallText = $('#password-small-text');

    // If username is short
    if (username.length < 4) {
      usernameSmallText.addClass('text-danger').text('Invalid');
      return false;
    }

    // If password is short
    if (password.length < 6) {
      passwordSmallText.addClass('text-danger').text('Invalid');
      return false;
    }

    // Inputs are valid
    return true;
  });
});