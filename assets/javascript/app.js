$(document).ready(function(){

//VARIABLES//
var correct = 0;

var intervalId;
var clockRunning = false;
var time = 20;

var qNum = 0;

var gameRun = false;

function startTimer() {
	if (!clockRunning) {
          intervalId = setInterval(count, 1000);
          clockRunning = true;
    }
}

function count() {
    time--;
    $("#timer").html(time);
    	// if no selection is made and timer runs out, show answer//
    	if (time === 0) {
    		stopTimer();
			$("#triviaPage").hide();
			$("#answerPage").show();
			$("#rightWrong").html("Zannen! The answer was " + questionArray[qNum].answers[questionArray[qNum].correct] + ".");
			$("#image").html(questionArray[qNum].image);
    	}
  }

function stopTimer() {
	clearInterval(intervalId);
	clockRunning = false;
}

function startScreen() {
	if (gameRun === false) {
		$("#triviaPage").hide();
		$("#answerPage").hide();
		$("#scorePage").hide();
		$("#startPage").show();
		correct = 0;
		qNum = 0;
	}
}

function nextQuestion() {
		$("#timer").html("20");
		$("#question").html(questionArray[qNum].question);
		$("#a1").html(questionArray[qNum].answers[0]);
		$("#a2").html(questionArray[qNum].answers[1]);
		$("#a3").html(questionArray[qNum].answers[2]);
		$("#a4").html(questionArray[qNum].answers[3]);
		startTimer();
}


//TRIVIA OBJECTS//
var questionArray = [{
	question: "Which Japanese food is also the name of a famous song from the 50's by Sakamoto Kyu?",
	answers: ["Shabu Shabu", "Teriyaki", "Sukiyaki", "Tempura"],
	correct: 2,
	image: '<img src="assets/images/sukiyaki.jpg" alt="Sukiyaki Album">',
},
{
	question: "The Ainu a native people who originate from which Japanese island?",
	answers: ["Kyushu", "Honshu", "Shikoku", "Hokkaido"],
	correct: 3,
	image: '<img src="assets/images/ainu.jpg" alt="Ainu Women">',
},
{
	question: "Which of the following animated films was *not* directed by Hayao Miyazaki?",
	answers: ["Castle in the Sky", "Grave of the Fireflies", "Princess Mononoke", "Porco Rosso"],
	correct: 1,
	image: '<img src="assets/images/fireflies.jpg" alt="Grave of the Fireflies">',
},
{
	question: "Which city is most famous for its eel and kishimen noodle dishes?",
	answers: ["Nagoya", "Tokyo", "Sapporo", "Naha"],
	correct: 0,
	image: '<img src="assets/images/kishimen.jpg" alt="Kishimen">',
},
{
	question: "The Japanese use a statue of which animal to bless a house with fertility?",
	answers: ["Fox", "Owl", "Raccoon", "Crane"],
	correct: 2,
	image: '<img src="assets/images/tanuki.jpg" alt="Tanuki">',
},
{
	question: 'Complete this Japanese proverb: "The nail that stands up..."',
	answers: ['"...will rust."', '"...is magnetic."', '"...will be pulled out."', '"...will be pounded down."'],
	correct: 3,
	image: '<img src="assets/images/nail.jpg" alt="Nail">',
},
{
	question: "In Japan, what English word is used to refer to delinquent teenagers?",
	answers: ["Yankee", "Gangster", "Street Rat", "Sinatra"],
	correct: 0,
	image: '<img src="assets/images/yanki.jpg" alt="Yanki Girls">',
},
{
	question: "A Shinto place of worship is referred to as a...",
	answers: ["Temple", "Chapel", "Shrine", "Hall"],
	correct: 2,
	image: '<img src="assets/images/isejingu.jpg" alt="Ise Jingu">',
},
{
	question: 'Which of the following foods is commonly called "Japanese Pizza"?',
	answers: ["Takoyaki", "Kaiseki Ryouri", "Kushi Katsu", "Okonomiyaki"],
	correct: 3,
	image: '<img src="assets/images/okonomiyaki.jpg" alt="Okonomiyaki">',
},
{
	question: "Which of the following writing systems are not used by the Japanese?",
	answers: ["Katakana", "Hangul", "Hiragana", "Kanji"],
	correct: 1,
	image: '<img src="assets/images/hangul.jpg" alt="Hangul Script">',
}]

//GAME PLAY//

//display page with ready button//
startScreen();

//when ready button is clicked, go to first object questions and activate timer//
$("#ready").click(function(){
	gameRun = true;
	$("#startPage").hide();
	$("#triviaPage").show();
	nextQuestion();
});


//when selection is made, display answer and next button, freeze timer, increment score//
$(".answer").click(function(){
	stopTimer();
	$("#triviaPage").hide();
	$("#answerPage").show();
	$("#image").html(questionArray[qNum].image);
	var thisAnswerIndex = $(this).attr("data-index");
	if (questionArray[qNum].correct === parseInt(thisAnswerIndex)) {
		$("#rightWrong").html("Correct!");
		correct++;
	}
	else {
		$("#rightWrong").html("Zannen! The answer was " + questionArray[qNum].answers[questionArray[qNum].correct] + ".");
	}
});

//when next button is pushed, reset timer and call next object's questions//
$("#next").click(function(){
	qNum++;
	time = 20;
	$("#answerPage").hide();
	$("#triviaPage").show();
	if (qNum >= questionArray.length) {
		$("#triviaPage").hide();
		$("#scorePage").show();
		$("#score").html(correct + "/" + questionArray.length);
	}
	else {
		nextQuestion();
	}
});

//after the last question is answered, display the final score and a try again button
$("#again").click(function(){
	gameRun = false;
	startScreen();
});


});