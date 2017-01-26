//"use strict";//

const {MongoClient} = require("mongodb")//.MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err){
    console.err(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);


//GET ALL THE TWEETS from MongoDB=you use.find//
  // db.collection("tweets").find().toArray((err, results) =>{
  //   if(err) {
  //     throw err;
  //   }
    //THIS will return the result.NOT THE TWEETS OBJECTS THO//
    // console.log("find results: ", results);
    // console.log("type of find results: ", typeof results);

    //THIS will return cursor of the result, aka one at a time, and tweet object//
    // console.log("for each item yielfed by the cursor:");
    // results.each((err, item) => console.log(" ", item));

    //This will return as result with jst [objects] for nested objects
    // results.toArray((err, resultsArray) => {
    //   if (err){
    //     throw err;
    //  }
    //   console.log("results.toArray:", resultsArray);
    // });
    // console.log("results array: ", results);

    function getTweets(callback){
      db.collection("tweets").find().toArray((err, tweets)=>{
        if (err){
          return callback(err);
        }
        callback(null, tweets);
      });
    }

    getTweets((err, tweets)=>{
      if(err){
        throw err;
      }
      console.log("Logging each tweet:");
      for(let tweet of tweets){
        console.log(tweet);
      }

  //this finish the mongo//
  db.close();
  });


});