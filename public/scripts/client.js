/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


const renderTweets = function(tweets) { 
  $('.tweets-container').empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').prepend($tweet); 
  }
};

const createTweetElement = function(tweet) {
  const { user, content, created_at } = tweet;

  const avatar = user && user.avatars ? user.avatars : 'default-avatar.png';

  const $tweet = $(`
    <article class="tweet">
      <header>
        <img class="avatar" src="${avatar}">
        <h2 class="name">${$("<div>").text(user.name).html()}</h2>
        <span class="handle">${$("<div>").text(user.handle).html()}</span>
      </header>
      <p class="content">${$("<div>").text(content.text).html()}</p>
      <footer>
        <span class="timestamp">${timeago.format(created_at)}</span>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  return $tweet;
};

const loadTweets = function() {
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      renderTweets(response); 
    },
    error: function(xhr, status, error) {
      // Handle errors if necessary
    }
  });
};

$(document).ready(function() {
  const $tweetForm = $('form');
  const $errorMessage = $('.error-message');
  loadTweets();

  $tweetForm.submit(function(event) {
    event.preventDefault(); 
    const $tweetText = $('#tweet-text');
    const tweetContent = $tweetText.val();

    // Clear any existing error messages
    $errorMessage.slideUp();
    $errorMessage.empty();

    // Perform data validation
    if (!tweetContent) {
      // Display error message for empty tweet
      $errorMessage.text("Error: Tweet content cannot be empty").slideDown();
    } else if (tweetContent.length > 140) {
      // Display error message for exceeding character limit
      $errorMessage.text("Error: Tweet content exceeds the character limit").slideDown();
    } else {
      // Valid tweet content, proceed with AJAX request
      const formData = $(this).serialize();

      $.ajax({ 
        url: '/tweets',
        method: 'POST',
        data: formData,
        success: function() {
          $tweetText.val(''); // Clear the tweet text input 
          $('.counter').text("140");
          loadTweets(); // Refresh the tweets
        },
        error: function(xhr, status, error) {
          // Handle errors if necessary
        }
      });
    }
  });
});