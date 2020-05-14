var config = {
    apiKey: "AIzaSyCp43vt855enyRtFVMbym8-rDsgzI9CdIg",
    authDomain: "gamefirebase-9b42c.firebaseapp.com",
    databaseURL: "https://gamefirebase-9b42c.firebaseio.com",
    projectId: "gamefirebase-9b42c",
    storageBucket: "gamefirebase-9b42c.appspot.com",
    messagingSenderId: "432402204046"
};
firebase.initializeApp(config);

var myFirebase = firebase.database().ref();
var scoresToSort = [];

var ref = firebase.database().ref("highscores");
ref.once('value')
    .then(function (dataSnapshot) {
        var scoresToSort = dataSnapshot.val().highscores;
        var mainArea = document.getElementById("highscoreArea");
        
        console.log(mainArea.firstChild);
        mainArea.removeChild(mainArea.firstChild);

        sortedArray = scoresToSort;
        sortedArray.sort(sortFunction);
        function sortFunction(a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] > b[0]) ? -1 : 1;
            }
        }
        
        for (var i = 0; i < sortedArray.length; i++) {
    
            var myDiv = document.createElement("div");
            var para = document.createElement("p");
            var node = document.createTextNode(sortedArray[i][0]);
            para.appendChild(node);
            var para2 = document.createElement("p");
            var node2 = document.createTextNode(sortedArray[i][1]);
            para2.appendChild(node2);

            myDiv.appendChild(para);
            myDiv.appendChild(para2);
            mainArea.appendChild(myDiv);
        }
    });

// function sortArray(theArray){
//     var returnArray = [];
//     var target = theArray[0][0];
//     var targetThing = theArray[0];
//     return sortArrayHelper(theArray, target, targetThing, returnArray);
// }

// function sortArrayHelper(theArray, target, targetThing, returnArray){
//     var theIndex = 0;
//     if(theArray.length == 0){
//         return returnArray;
//     }
//     for(var j = 0; j<theArray.length; j++){
//         if(theArray[j][0] > target){
//             target = theArray[j][0];
//             targetThing = theArray[j];
//             theIndex = j;
//         }
//     }
//     returnArray.push(targetThing);
//     theArray.splice(theIndex,1);
//     return sortArrayHelper(theArray, target, targetThing, returnArray);
// }