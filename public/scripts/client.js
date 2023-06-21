/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense, donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
  const $timestamp = $("<span>").addClass("timestamp").text("10 days ago");
  const $icons = $("<div>").addClass("icons");
  const $flagIcon = $("<i>").addClass("fas fa-flag");
  const $retweetIcon = $("<i>").addClass("fas fa-retweet");
  const $heartIcon = $("<i>").addClass("fas fa-heart");

  $icons.append($flagIcon, $retweetIcon, $heartIcon);
  $footer.append($timestamp, $icons);
  $tweet.append($footer);

  return $tweet;
};


$(document).ready(function() {
  renderTweets(data);
});

