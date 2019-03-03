//Load Data
//Routes getting their source to friends & questions data
var friendsData = require("../data/friends");
var questionsDB = require("../data/questions");

//Routing
module.exports = function(app) {
  //API GET Request
  //Here is where we show json of the data in tables
    app.get("/data/friends", function(req, res) {
        return res.json(friendsData);
      });

    app.get("/data/questions", function(req, res) {
        return res.json(questionsDB);
      });
  //Posting Your results 
    app.post("/data/friends", function(req, res) {
      //Grabbing your score
        var YourScore=req.body.scores
        //empty array for the compatible friend
        var YourFriends= []
        //looping through each friend
        for(i=0;i<friendsData.length; i++){
          //empty array to receive a push of closest comparison
          totalDifference=[]
          //looping through friends scores
          for(j=0;j<friendsData[i].scores.length; j++){
            //Friends scores and subtracting your score
            comparison=Math.abs(parseInt(friendsData[i].scores[j])-parseInt(YourScore[j]))
            totalDifference.push(comparison) 
          }
            //Taking the total from both scores and reducing it into one number per each Friend
            totalComparisons = totalDifference.reduce(function(total,number){
              return (total + number);
              
            })
            console.log(totalComparisons)
            //Pushing result to array
            YourFriends.push(totalComparisons);
        }
          // Find the lowest number
        bestMatchMath=Math.min.apply(null,YourFriends)
        //Taking results and using math.min to find lowest result
        bestMatch=YourFriends.indexOf(bestMatchMath)
        bestfriend = friendsData[bestMatch]
        var YournewFriend = req.body;
        //console.log(bestMatchMath)
        console.log(bestfriend)
        console.log(YournewFriend);
        //pushing new friend into friends array
        friendsData.push(YournewFriend);
        res.json(bestfriend);
    });
}