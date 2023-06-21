/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').append($tweet);
  }
};

const createTweetElement = function(tweet) {
  const $tweet = $("<article>").addClass("tweet");

  const $header = $("<header>");
  const $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars);
  const $name = $("<h2>").addClass("name").text(tweet.user.name);
  const $handle = $("<span>").addClass("handle").text(tweet.user.handle);

  $header.append($avatar, $name, $handle);
  $tweet.append($header);

  const $content = $("<p>").addClass("content").text(tweet.content.text);
  $tweet.append($content);

  const $footer = $("<footer>");
  const $timestamp = $("<span>").addClass("timestamp").text(timeago.format(tweet.created_at));
  const $icons = $("<div>").addClass("icons");
  const $flagIcon = $("<i>").addClass("fas fa-flag");
  const $retweetIcon = $("<i>").addClass("fas fa-retweet");
  const $heartIcon = $("<i>").addClass("fas fa-heart");

  $icons.append($flagIcon, $retweetIcon, $heartIcon);
  $footer.append($timestamp, $icons);
  $tweet.append($footer);

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
  $tweetForm.submit(function(event) {
    event.preventDefault();
    console.log('Form submitted');
    const $tweetText = $('#tweet-text');
    const tweetContent = $tweetText.val();
    // Clear any existing error messages
    $('.error-message').remove();

    // Perform data validation
    if (!tweetContent) {
      // Display error message for empty tweet
      alert("Error: Tweet content cannot be empty");
    } else if (tweetContent.length > 140) {
      // Display error message for exceeding character limit
      alert("Error: Tweet content exceeds the character limit");
    } else {
      // Valid tweet content, proceed with AJAX request
      const formData = $tweetForm.serialize();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: formData,
        success: function(response) {
          console.log(formData);
        },
        error: function(xhr, status, error) {
          // Handle errors if necessary
        }
      });
    }
  });
});

loadTweets(); 
$(document).ready(function() {
  renderTweets(data);
});
