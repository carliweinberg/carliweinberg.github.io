
//// This is the console you can see it change at ;https://console.firebase.google.com/project/grocerylist-58add/database/grocerylist-58add/data
/// this program works and will make things go in to the database

var config = {
    apiKey: "AIzaSyAzExTuFvSiy_PjaDfWRHUI3nBRmLtVCsA",
    authDomain: "grocerylist-58add.firebaseapp.com",
    databaseURL: "https://grocerylist-58add.firebaseio.com",
    projectId: "grocerylist-58add",
    storageBucket: "grocerylist-58add.appspot.com",
    messagingSenderId: "446381917139"
};

firebase.initializeApp(config);

var myFirebase = firebase.database().ref();

var theList = [];

$(document).ready(function () {

    $("#submitBtn").click(function () {
        theList.push([$("#newItemLabel").val(), false]);
        writeUserData(theList);
    });

    $("#removeButton").click(function () {
        if (confirm("Do you want to delete?")) {
            removeCrossedOut();
            writeUserData(theList);
        }
    });
});

function removeCrossedOut(){
    for(var i =0; i < theList.length; i++){
        if(theList[i][1] == true){
            theList.splice(i,1);
            removeCrossedOut();
        }
    }
}

function writeUserData(myList) {
    firebase.database().ref('items/').set({
        groceryList: myList
    });
    drawList(theList);
}

var leadsRef = firebase.database().ref('items');
leadsRef.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        theList = childData;
        drawList(theList);
    });
});

function itemClicked(theItem){
    for(var i =0; i< theList.length; i++){
        if(theList[i][0] == theItem){
           
           if(theList[i][1]==false){
            theList.splice(i, 1, [theItem, true]);
           }else{
            theList.splice(i, 1, [theItem, false]);
           }
        }
    }
    writeUserData(theList);
}

function drawList(aList) {
    document.getElementById("listOfItems").innerHTML = '';

    for (var i = 0; i < aList.length; i++) {
        var li = document.createElement("li");;
        
        li.id = i;
        var t = document.createTextNode(aList[i][0]);
        if(aList[i][1] == true){
            li.style.textDecoration = "line-through";
        }
        li.appendChild(t);
        li.addEventListener("click",function(e) {           
           itemClicked(e.srcElement.textContent);
          });
        document.getElementById("listOfItems").appendChild(li);
    }
}


