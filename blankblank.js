
let theVal = 0;
document.getElementById("button").onclick = function () { generateGameWords(); };
document.getElementById("again").onclick = function () { play(theVal++); };
document.getElementById("guess").onclick = function () { guessFunction(); };
document.getElementById("giveup").onclick = function () { giveupFunction(); };

let theList = ["bottled water", "car pool", "cash flow", "cell membrane", "cell phone", "chat room", "child care", "Christmas tree", "civil right", "comic strip", "common sense", "course work",
    "crossword puzzle", "dirt bike", "disk drive", "disc jockey", "dump truck", "energy bar", "fact sheet", "fine art", "French fry", "grass root", "health care", "heart attack", "heat lightning", "help desk", "high school", "hockey puck", "home page", "hot dog", "ice cream", "jigsaw puzzle", "jungle gym", "junk food", "jumping jack", "key pal", "killer whale", "Labor Day", "labor union", "laser printer", "land mine", "lance corporal", "landing field", "landing strip", "light bulb", "life jacket", "life raft", "life vest", "life belt", "life buoy", "Little Dipper", "little finger", "life span", "memory stick", "new world", "oven mitt", "paper clip", "photo ID", "pinch hitter", "post office", "paddle wheel", "passenger pigeon", "past tense", "past participle", "peace pipe", "physical education", "picture graph", "planet kingdom", "prime minister", "radiant energy", "radio wave", "real time", "report card", "respiratory system", "rib cage", "right angle", "right triangle", "ring finger", "rock dove", "rocking chair", "rocking horse", "role model", "roller coaster", "Roman Catholic", "root beer", "real estate", "remote control", "rock band", "role play", "safety glasses", "salad dressing", "school day", "school year", "search engine", "sleeping bag", "sports drink", "square root", "tennis court", "theme park", "time line", "time capsule", "tree house", "vacuum cleaner", "Valentine’s Day", "vampire bat", "vanilla bean", "vending machine", "vice president", "video camera", "videocassette recorder", "video game", "videotape recorder", "virtual reality", "vocal chords", "voice box", "voice mail", "waiting room", "walking stick", "web site", "word processing", "word wall", "work boots",
    "able bodied", "a frame", "brotherin law", "check in", "clean cut", "close up", "co op", "editorin chief", "empty handed", "fatherin law", "follow up", "for profit", "freefor all", "front runner", "fund raiser", "get together", "hanky panky", "high tech", "ho hum", "hush hush", "in depth", "in law", "inline skate",  "jet propelled", "king size", "know how", "knowit all", "life size", "merrygo round", "motherin law", "nitty gritty", "not forprofit", "off site", "one sided", "on site", "pitch black", "pitch dark", "play off", "quick tempered", "roly poly", "run in", "runner up", "self concept", "self service", "shrink wrap", "single minded", "strong arm", "three dimensional", "tip off", "topsy turvy", "toss up", "two dimensional", "u turn", "warm up", "well being",  "warn out", "X ray",
    "ice cream", "grand jury", "cave in", "post office", "real estate", "middle class", "full moon", "attorney general", "half sister",  "one half",  "eighty six", "one third", "well being", "mass produced", "church mass",
    "life time", "else where", "up side", "grand mother", "can not", "base ball", "fire works", "pass port", "cross walk  ", "basket ball", "sun flower", "body cast", "moon light", "foot ball", "rail road", "rattle snake", "any body", "weather man", "throw back", "skate board", "mean time", "earth quake", "every thing", "goat milk", "some times", "al so", "back ward", "school house", "butter flies", "up stream", "no where", "by pass", "fire flies", "be cause", "some where", "spear mint", "some thing", "an other", "some what", "air port", "any one", "to day", "him self", "grass hopper", "in side", "them selves", "play things", "foot prints", "there fore", "up lift", "super giant", "home made", "with out", "back bone", "scapegoat", "pepper mint",
    "eye ball", "long house", "for get", "after noon", "south west", "north east", "along side", "mean while", "key board", "what ever", "black smith", "disk drive", "her self", "no body", "sea shore", "near by", "silver smith", "watch maker", "sub way", "horse back", "it self", "head quarters", "sand stone", "lime stone", "under ground", "glass making", "river banks", "touch down", "honey moon", "boot strap", "tooth pick", "tooth paste", "dish washer", "house hold", "town ship", "shady side", "pop corn", "air plane", "pick up", "house keeper", "book case", "baby sitter", "sauce pan", "luke warm", "blue fish", "ham burger", "honey dew", "rain check", "thunder storm   ", "spokes person", "wide spread", "week end", "home town", "common place", "more over", "pace maker",
    "super market", "super men", "super natural", "super power", "some body ", "some day", "some how", "some one", "any more", "any place", "any time", "any way", "back hand", "watch dog", "back log", "back pack", "back stage", "water fall", "back track", "noise maker", "under age", "under belly", "under bid", "under charge", "book worm", "book store", "book shelf", "book end", "super script", "super sonic", "super star", "super sensitive", "book keeper", "book mark", "book mobile", "for give", "fork lift", "for mat", "fort night", "honey comb", "honey suckle", "honey bee", "key hole", "key note", "key way", "key word", "life blood", "life boat", "life guard", "life like", "life line", "life long", "fore finger", "fore father", "fore hand", "fore head"
];
let gameWords = [];
let answer = "";

function generateGameWords() {
    for (let i = 0; i < theList.length; i++) {
        let startFirst = theList[i].substr(0, theList[i].indexOf(' '));
        let endFirst = theList[i].substr(theList[i].indexOf(' '), theList[i].length).trim();

        for (let j = 0; j < theList.length; j++) {
            let startSecond = theList[j].substr(0, theList[j].indexOf(' '));
            let endSecond = theList[j].substr(theList[j].indexOf(' '), theList[j].length).trim();

            if (startFirst == endSecond && (endFirst != startSecond)) {
                gameWords.push(new Array(startFirst + "-" + endFirst + " " + startSecond + "-" + endSecond));
                //console.log(startFirst+ "" + endFirst + " " + startSecond + "" + endSecond);
            }
        }
    }
    console.log(gameWords.length);
    play(theVal);
}

function play(theVal) {
    theVal = Math.floor((Math.random() * 113) + 1);
    let firstWord = gameWords[theVal][0].substr(0, gameWords[theVal][0].indexOf(' '));
    let secondWord = gameWords[theVal][0].substr(gameWords[theVal][0].indexOf(' '), gameWords[theVal][0].length).trim();
    // console.log(firstWord.substr(firstWord.indexOf("-"), firstWord.length));
    // console.log(secondWord.substr(0,secondWord.indexOf("-")));
    document.getElementById("first").textContent = secondWord.substr(0, secondWord.indexOf("-"));
    document.getElementById("second").textContent = firstWord.substr(firstWord.indexOf("-"), firstWord.length);
    answer = firstWord.substr(0, firstWord.indexOf("-"));
    //console.log(answer);


}

function guessFunction() {
    guessEntered = document.getElementById("theirGuess").value;
    if (guessEntered == answer ) {
        alert("correct!");
    } else {
        alert("wrong");
    }
}

function giveupFunction(){
    alert("The answer is: " + answer);
}

//console.log(gameWords);


// console.log(theList[i].substr(i, theList[i].indexOf(' ')));
// console.log(theList[i].substr(theList[i].indexOf(' '), theList[i].length).trim());