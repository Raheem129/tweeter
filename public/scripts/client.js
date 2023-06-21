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
  const { user, content, created_at } = tweet; // Destructuring assignment

  const $tweet = $(`
    <article class="tweet">
      <header>
        <img class="avatar" src="${user.avatars}">
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
  loadTweets(); 
  
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
          console.log('New tweet created:', response); 
          $tweetText.val(''); // Clear the tweet text input
          const newTweet = response; // Retrieve the newly created tweet from the response
          const $newTweetElement = createTweetElement(newTweet); // Create the HTML for the new tweet
          $('.tweets-container').prepend($newTweetElement); // Prepend the new tweet HTML to the tweets container
          loadTweets(); // Refresh the tweets
        },
        error: function(xhr, status, error) {
          // Handle errors if necessary
        }
      });
    }
  });
});
