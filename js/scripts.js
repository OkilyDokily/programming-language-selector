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
  var languagesArray = Object.keys(programmingLanguages);
  var percentageArray = languagesArray.map(function(language){
    return { "language": language, "score" : (Scores[language] / programmingLanguages[language].length)};
  });
 
  percentageArray.sort(function(a,b){
    b.score - a.score;
  });
  
  return percentageArray;  
}

function resetValues(){
  var languagesArray = Object.keys(Scores);
  languagesArray.forEach(function(language){
    Scores[language] = 0;
  });
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
    resetValues();
    hide();
    var getIds = [];
    $("input:checked").each(function(item){
      var id  = $(this).attr("id")
      getIds.push(id);
    })
    
    assignScores(getIds);
    var results = rankLanguages();
    
    results.forEach(function(item){
      percentage = item.score.toFixed(2)
      imgString = imgObj[item.language];
      $(".results").append("<div>" +
      "<p>" + item.language + ": " + percentage + "%" + "</p>" +
      "<img src=" + "'img/" + imgString +  "'" + "></div>")
    });

    $("form").hide();
    $("div.results-explainer").show();

    function hide(){
      $(".results div").remove();
    }

  });

  $("div.result-explainer-exit").click(function(e){
    $("form").show();
    $("div.results-explainer").hide();
  })
});



