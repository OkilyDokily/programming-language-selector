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
    //in theory not every question applies to every language so use percentages instead of total scores.
    var percentage = ((length / programmingLanguages[language].length) * 100).toFixed(2);
    return {
      "language": language, "score": percentage 
    }
  });
  //order the scores 
  scores.sort(function(a,b){
    return b.score - a.score;
  });
  return scores;
};


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
      $("." + result.language).css({"order": order++});
      $("." + result.language + " " + "h1").prepend("<span>(" + order +".) </span>");
    });

    $("form").hide();
    
    $("div.results-explainer").css({"display":"flex"});

    function hide(){
      $(".results div").remove();
      $("span").remove();
    }

  }); 

  $("div.result-explainer-exit").click(function(e){
    $("form").show();
    $("div.results-explainer").hide();
  })
});



