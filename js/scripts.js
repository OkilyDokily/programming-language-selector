var programmingLanguages =
{
  "csharp": [["webdeveloper","business","games"],"park","changeplan", "western","pragmatic"],
  "haskell":[["business","scientific"],"coffee","plan",["sciencefiction","fantasy"],"intellectual"],
  "java":[["webdeveloper", "business"],"park","changeplan",["western", "drama"],"pragmatic"],
  "lisp":[["business","scientific"],"homebody","noplan",["romance","fantasy"],"intellectual"],
  "python":[["webdeveloper","scientific"],"park","noplan",["romance","western"],"funseeking"],
  "ruby":["webdeveloper","coffee","noplan",["sciencefiction","drama"],"funseeking"]
}

// var answerToLanguage = {
//   "webdeveloper":["csharp","java","python","ruby"]

// }

var Scores ={
"csharp": 0,
"haskell": 0,
"java": 0,
"lisp": 0,
"python": 0,
"ruby": 0
}


function assignScores(answers){
  var programmingLanguagesArray = Object.keys(programmingLanguages);
  programmingLanguagesArray.forEach(function(language){
    programmingLanguages[language].forEach(function(answer){
      if (Array.isArray(answer)){
        answer.forEach(function(answer){
          if (answers.includes(answer)){
            Scores[language]++;
          }
        })
      }
      else{
        if (answers.includes(answer)){
          Scores[language]++;
        }
      } 
    });
  })
}

function rankLanguages(){
  var languagesArray = Object.keys(Scores);
  var scoresArray = languagesArray.map(function(language){
    return Scores[language];
  });
 
  var rankedLanguages  = []; 
 
  while(scoresArray.length > 0){
    var highestNumber = Math.max(...scoresArray);
    languagesArray.forEach(function(language){
      if(Scores[language] === highestNumber){
        rankedLanguages.push({[language]:highestNumber});
      }
    })
    
    scoresArray = scoresArray.filter(function(score){
      return score != highestNumber;
    })
  }
  return rankedLanguages;  
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
    var getIds = [];
    $("input:checked").each(function(item){
      var id  = $(this).attr("id")
      getIds.push(id);
    })
    
    assignScores(getIds);
    var results = rankLanguages();
    
    for(var i = 0; i < results.length; i++){
      var keys = Object.keys(results[i]);
      var key = keys[0];
      var imgString = imgObj[key];
      
      var percentage = results[i][key]/programmingLanguages[key].length;

      console.log(percentage);

      $(".results").append("<div>" +
      "<p>" + key +"</p>" +
      "<img src=" + "'img/" + imgString +  "'" + "></div>")
    }

  });
});



