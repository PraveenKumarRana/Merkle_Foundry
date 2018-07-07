var save = document.getElementById("save");
var input = document.getElementById("func");
var funcBtn = document.querySelector("#func-name");
var resultDisplay = document.getElementById("result-display");
var catA = document.getElementById("category-a");
var funcName = "";
var j=0;

//========================================================================================================
// for taking the input value and on button click of the function name displaying the result
//========================================================================================================

// displaying the data in the begining from local storage
for(var i=0; i<localStorage.length; i++){
    console.log(localStorage.key(i));
    var func = localStorage.key(i);
    var arg = localStorage.getItem(func);
    console.log(func);
    console.log(arg);
    handlingFunction(func,arg);

}

save.addEventListener("click",function(){
    var userFunc = input.value;
    var funcNewName = userFuncName(userFunc);
    console.log(localStorage.getItem(funcNewName));

})

function looseJsonParse(obj){
    return Function('"use strict";return (' + obj + ')')();
}

// function for taking the name of the userFunction
function userFuncName(val){
    funcName="";
    for(var i=9; val[i]!='('; i++){
        funcName=funcName+val[i];
    }
    // creating new button for every function
    // saving of each function data
    var argFunc = "{b:" + val + "}" ;
    handlingFunction(funcName,argFunc);
}

function handlingFunction(funcName, argFunc){
    console.log(funcName);
    console.log(argFunc);
    var paragraph = document.createElement("p");
    var attribute = "p"+j;
    paragraph.setAttribute("id",attribute);
    var divDefault = document.querySelector("#category-a");
    divDefault.appendChild(paragraph);
    j++;
    var button = document.createElement("button");
    button.innerHTML = funcName;

    // 2. Append somewhere
    var btnAppend = document.querySelector("#"+attribute);
    btnAppend.appendChild(button);


    // 3. Add event handler
    button.addEventListener ("click", function() {
    localStorage.setItem(funcName,argFunc);
    console.log(localStorage.getItem(funcName));
    var result = looseJsonParse(localStorage.getItem(funcName));
    resultDisplay.textContent=result.b();
});
}


//=========================================================================================================
// for controlling the dragging function of the buckets element
//=========================================================================================================

// identify what is draggaable
function dragstart_handler(ev){
    console.log("dragStart");
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dropEffect = "move";
}

// define the drag's bucket
function dragover_handler(ev){
    ev.preventDefault();
    // Set the dropeffect to move
    ev.dataTransfer.dropEffect = "move"
}

// handling drop
function drop_handler(ev){
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
