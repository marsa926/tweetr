/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function(){

$('.new-tweet').hide();

var tweetData = [

//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
// {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }
];




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

///////////escape function//////////////
function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
////////////////////////////////////////


function createTweetElement(tweet){

  var html = `<article class="TweetLog">
    <header id="posted-tweets">
      <img class="image" src="${escape(tweet.user.avatars.regular)}">
      <h1 class="name">${escape(tweet.user.name)} </h1>
      <p class="email"> ${escape(tweet.user.handle)} </p>
    </header>
      <p class="text"> ${escape(tweet.content.text)} </p>
    <footer>
      <p class="date"> ${escape(tweet.created_at)} </p>
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
    </footer>
  </article>`;
return html;

}

//when you submit your new post. if you have nothing in your content, will shot an error other wise it will post a new tweet//
$("form.post").on('submit', function(event){
  event.preventDefault();
  console.log( $(this).serialize() );
  var content = $('textarea').val();
  if(content.length > 140){
     alert('Error! Your tweet is too long!');
  } else if(!content || content.match(/\s/)){
    alert('Error! You cannot post empty tweet!');
  } else {
    $.ajax({
      url:'/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: loadTweets
    });
  }
});

$(".newpost").on('click', function(event){
  // console.log("works");
  var newTweet = $('.new-tweet');
  newTweet.slideToggle();
  $("textarea").select();
});




loadTweets();

});


// // var $tweet =$("<article>").addClass("tweet");
// var $tweet = createTweetElement(tweetData);

// console.log($tweet); // to see what it looks like
// $("#posted-tweets").append($tweet);
// });
