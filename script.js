// Initialize stuff
(function(){
var expression = "0";
var error = false;
var done = false;

  
// Helper function for drawing result;
function drawResult(){
  $(".calcDisplay").text(expression);
}
  
// Draw initial 0  
drawResult();
    
// helper function for random numbers in a range 
function getRandom(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}
  
// Function to create text-shadows   
function makeShadows(numberOfShadows){
  var textShadow = "";

  for (i = 0; i < numberOfShadows; i++ ){
    // Randomize shadows coordinates and blur
    var x = getRandom(100, 950) + "px";
    var y = getRandom(0, 500) + "px";
    var blur = getRandom(0, 20) + "px";
    var color = "";
    
    // Set color of shadows based on their count
    if (i < 8 ){
      color = "#000";
    }
    else if (i < 12){
      color = "#222";
    }
    else if (i < 17){
      color = "#333";
    }
    else if (i < 22){
      color = "#555";
    }
    else if(i < 28){
      color = "#666";
    }
    else if(i < 32){
      color = "#888";
    }
    else {
      color = "#333";
    }
    
    // Distribute shadows evenly across the four quadrants of screen
    var quadrant =  i % 4;
    if (quadrant == 0){
      textShadow += `-${x} ${y} ${blur} ${color},`;

    }
    else if (quadrant == 1){
      textShadow += `-${x} -${y} ${blur} ${color},`;

    }
    else if (quadrant == 2){
      textShadow += `${x} -${y} ${blur} ${color},`;
  
    }
    else if (quadrant == 3) {
      textShadow += `${x} ${y} ${blur} ${color},`;

    }
  }
  
  // Remove trailing comma when done
  textShadow = textShadow.slice(0, textShadow.length - 1);
  return textShadow;
}

// Error checking function
function errorCheck(){
  if (error){
    expression = "";
    error = false;
    parenthesis = 0;
  }
 $(".floatingChar").text($(this).attr("value"));
  
  $(".floatingChar").css("text-shadow", makeShadows(34));
  
  
  var scroll = $(".calcDisplay")[0].scrollHeight;

  $(".calcDisplay").scrollTop(scroll);
  
}

// CLick handler valid for all button groups
function buttonHandler(){
  if (expression === 0 || expression === "0" || done){
    expression = "";
    done = false;
  }
  // get value of clicked button
  var char = $(this).attr("value");
  // add value to expression
  expression += String(char);
  if (expression == "."){
    expression = "0.";
  }
  drawResult();
}  
  

// check for errors and do the helping magic
$("button").click(errorCheck);
//Set click handlers for each button group
$(".number").click(buttonHandler);
  
  
var parenthesis = 0;
$(".operation").click(function(){
  done = false;
  // get value of clicked button
  var op = $(this).attr("value");
  
  // keep track of what is going on with parenthesis
  if (op == "()" && parenthesis === 0){
    op = "(";
    parenthesis = 1;
  }
  else if(op == "()" && parenthesis == 1){
    op = ")";
    parenthesis = 0;
  }
  // update the expression
  expression += op;
  // draw results
  drawResult();
});
  
$(".helper").click(function(){
  // get value of clicked button
  var helper = $(this).attr("value");
  // set behaviour of clear button
  if (helper == "CL"){
    var last = expression.length - 1
    
    // Deal with parenthesis
    if (expression[last] == "("){
      parenthesis = 0;
    }
    else if (expression[last] == ")" ){
      parenthesis = 1;
    }
    // Remove the last character from the expression
    expression = expression.slice(0, last);
    if (expression == ""){
      expression = "0";
    }
  }
  else {
    expression = "0";
    parenthesis = 0;
  }
  // draw result
  drawResult();
});
  
$(".special").click(function(){
  // Evaluate expression
  try {
    expression = String(eval(expression));
  }
  // Handle errors
  catch(err) {
    expression = "Invalid input!";
    error = true;
    }
  // If everything went as planned
  finally {
    drawResult();
    done = true;
  }
});

})();

