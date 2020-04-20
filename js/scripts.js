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
    var length = programmingLanguages[language].flat().filter(function(item){ return answers.includes(item)}).length;
    var percentage = length / programmingLanguages[language].length;
    return {
      "language": language, "score": percentage
    }
  });
  scores.sort(function(a,b){
    return b.score - a.score;
  });
  return scores;
};


$(document).ready(function(){
  var results;
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
    var getIds = [];
    $("input:checked").each(function(item){
      var id  = $(this).attr("id")
      getIds.push(id);
    })
    
    
    results = assignAndOrderScores(getIds);
    
    results.forEach(function(item){
      percentage = (item.score * 100).toFixed(2)
      imgString = imgObj[item.language];
      $(".results").append("<div>" +
      "<p>" + item.language + ": " + percentage + "%" + "</p>" +
      "<img src=" + "'img/" + imgString +  "'" + "></div>")
    });

    $("form").hide();
    var order = 0;
    results.forEach(function (item){
      $("." + item.language).css({"order": order++});
      $("." + item.language + " " + "h1").prepend("<span>(" + order +".) </span>");
      console.log("."+item.language);
      console.log(order);
    });

    $("div.results-explainer").css({"display":"flex"});

    function hide(){
      $(".results div").remove();
    }

  }); 

  $("div.result-explainer-exit").click(function(e){
    $("form").show();
    $("div.results-explainer").hide();
  })
});



