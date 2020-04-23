//business logic
var programmingLanguages =
{
  "csharp": [["webdeveloper","business","games"],"park","changeplan", "western","pragmatic"],
  "haskell":[["business","scientific"],"coffee","plan",["sciencefiction","fantasy"],"intellectual"],
  "java":[["webdeveloper", "business"],"park","changeplan",["western", "drama"],"pragmatic"],
  "lisp":[["scientific"],"homebody","noplan",["romance","fantasy"],["intellectual","funseeking"]],
  "python":[["webdeveloper","scientific"],"park","noplan",["romance","western"],"funseeking"],
  "ruby":["webdeveloper","coffee","noplan",["sciencefiction","drama"],"funseeking"]
}


function assignAndOrderScores(answers){
  var scores = Object.keys(programmingLanguages).map(function(language){
    // get the intersection (with .filter()) of the answers list and the list for each programming language. Then obtain the length of that intersection. 
    var length = programmingLanguages[language].flat().filter(function(item){ return answers.includes(item)}).length;
    //in theory not every question applies to every language so use percentages instead of total scores. Also percentages are more meaningful to the user.
    var percentage = ((length / programmingLanguages[language].length) * 100).toFixed(2);
    return {
      "language": language, "score": percentage 
    }
  });
  //order the scores 
  scores.sort(function(a,b){
    return b.score - a.score;
  });
  
  //get the highest score and an array of the highest score 
  //which will then be randomized and finally concatenated to the original results
  var highest = scores[0].score;
  var highestScoresArray = scores.filter(function(score){
    return score.score == highest;
  });

  //if there are aren't multiple same  high scores then there is no need to randomize them 
  if (!(highestScoresArray.length > 1)){
    return scores;
  }
  
  //if there are multiple same highscores then they need to be randomized
  var randomizedHighScores = [];
  while (highestScoresArray.length > 0){
    var lengthOfHighestScoreArray = highestScoresArray.length;
    //find a random number between 0 and the length of the high score sarray
    var number = Math.floor(Math.random() * lengthOfHighestScoreArray);
    //use that random number to select a random object from the highest score and then push that object into the scores array;
    randomizedHighScores.push(highestScoresArray[number]);
    //remove the item that was pushed into the new array from the array of highest scores
    highestScoresArray.splice(number,1);
    //continue the process until the high scores array is empty    
  }
  // remove the high scores from the original results array
  var spliced = scores.splice(0,randomizedHighScores.length);
  //replace the high scores by concatenating the original results to the new array
  return randomizedHighScores.concat(scores);   
}  

$(document).ready(function(){
  
  var imgObj = {
    "csharp":"csharp.png",
    "haskell":"haskell.jpg",
    "java":"java.png",
    "lisp":"lisp.png",
    "python":"python.jpg",
    "ruby":"ruby.png"
  }
  $("form").submit(function(e){
    e.preventDefault();
    
    hide();
    var ids = $("input:checked").map(function(item){
      return this.id;
    }).get();//.get() returns a normal javascript array rather than a jquery function
    
    var results = assignAndOrderScores(ids);
    //order is for ordering the divs.results-explainer flexbox
    var order = 0;
    results.forEach(function(result){
      imgString = imgObj[result.language];
      $(".results").append("<div>" +
      "<p>" + result.language + ": " + result.score + "%" + "</p>" +
      "<img src=" + "'img/" + imgString +  "'" + "></div>")
      //order the div.results-explainer flexbox
      if(order === 0){
        $("."+ result.language).addClass("orange");
      }
      $("." + result.language).css({"order": order++});
      $("." + result.language + " " + "h1").prepend("<span>(" + order +".) </span>");
    });

    $("form").hide();
    
    $("div.results-explainer").css({"display":"flex"});

    function hide(){
      $(".results div").remove();
      $("span").remove();
      $(".orange").removeClass("orange");
    }

  }); 

  $("div.result-explainer-exit").click(function(e){
    $("form").show();
    $("div.results-explainer").hide();
  })
});



