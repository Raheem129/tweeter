$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    var charCount = $(this).val().length;
    var counter = $(this).siblings('div').find('.counter');
    var charLimit = 140;

    counter.text(charLimit - charCount);

    if (charCount > charLimit) {
      counter.addClass('invalid');
    } else {
      counter.removeClass('invalid');
    }
  });
});
