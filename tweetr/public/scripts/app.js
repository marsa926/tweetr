
//DOM ready function
$(document).ready(function(){

//Hide the post tweet-form when the page is loaded
$('.new-tweet').hide();

var tweetData = [];

function loadTweets(){
  $.ajax({
    url:'/tweets',
    method: 'GET',
    dataType: "json",
    success: function (data){
      console.log("it worked", data);
      renderTweets(data);
    }
  });
}
loadTweets();

function renderTweets(tweets){
  $("#posted-tweets").empty();
  for (var i = 0; i < tweets.length; i++){
    $("#posted-tweets").prepend(createTweetElement(tweets[i]));
  }
}

//escape function: Make sure people can't post any scipt in their tweets.
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

function createTweetElement(tweet){
  var html = `<article class="TweetLog">
  <header id="posted-tweets">
    <img class="image" src="${escape(tweet.user.avatars.regular)}">
    <h1 class="name">${escape(tweet.user.name)} </h1>
    <p class="email"> ${escape(tweet.user.handle)} </p>
  </header>
    <p class="text"> ${escape(tweet.content.text)} </p>
  <footer>
    <p class="date"> ${escape(timeSince(tweet.created_at))} </p>
    <i class="fa fa-flag" aria-hidden="true"></i>
    <i class="fa fa-retweet" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>
  </footer>
  </article>`;
return html;
}

//When you submit your tweet, if the content is empty/over 140 chars-
// I will shoot an error msg, otherwise I'll post a new tweet
$("form.post").on('submit', function(event){
  event.preventDefault();
  console.log( $(this).serialize() );
  var content = $('textarea').val();
  if(content.length > 140){
     alert('Error! Your tweet is too long!');
  } else if (!content || /^\s+$/.test(content)){
    alert('Error! You cannot post empty tweet!');
  } else {
    $.ajax({
      url:'/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: loadTweets
    });
    $('textarea').val("");
  }
});

//When button is clicked, tweet-form will slide down
$(".newpost").on('click', function(event){
  var newTweet = $('.new-tweet');
  newTweet.slideToggle();
  $("textarea").focus();
});

//Function. Set. ACTION!
loadTweets();

});

