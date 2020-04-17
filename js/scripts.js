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

  $("form").submit(function(e){
    e.preventDefault();
    var getIds = [];
    $("input:checked").each(function(item){
      var id  = $(this).attr("id")
      getIds.push(id);
    })
    assignScores(getIds);
    var results = rankLanguages();

  });
});



