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
    	if (time === 0) {
    		stopTimer();
			$("#triviaPage").hide();
			$("#answerPage").show();
			var thisAnswerIndex = $(this).attr("data-index");
			$("#rightWrong").html("Zannen! The answer was " + questionArray[qNum].answers[questionArray[qNum].correct] + ".");

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
	}
}

function nextQuestion() {
	// for (var i = 0, i < 4, i++) {
		$("#timer").html("20");
		$("#question").html(questionArray[qNum].question);
		$("#a1").html(questionArray[qNum].answers[0]);
		$("#a2").html(questionArray[qNum].answers[1]);
		$("#a3").html(questionArray[qNum].answers[2]);
		$("#a4").html(questionArray[qNum].answers[3]);
		startTimer();
	// }
}


//TRIVIA OBJECTS//
var questionArray = [{
	question: "Which Japanese food is also the name of a famous song from the 50's by Sakamoto Kyu?",
	answers: ["Shabu Shabu", "Teriyaki", "Sukiyaki", "Tempura"],
	correct: 2,
},
{
	question: "The Ainu a native people who originate from which Japanese island?",
	answers: ["Kyushu", "Honshu", "Shikoku", "Hokkaido"],
	correct: 3,
},
{
	question: "Which of the following animated films was *not* directed by Hayao Miyazaki?",
	answers: ["Castle in the Sky", "Grave of the Fireflies", "Princess Mononoke", "Porco Rosso"],
	correct: 1,
// },
// {
// 	question: "Which city is most famous for its eel and kishimen noodle dishes?",
// 	answers: ["Nagoya", "Tokyo", "Sapporo", "Naha"],
// 	correct: 0,
// },
// {
// 	question: "The Japanese use a statue of which animal to bless a house with fertility?",
// 	answers: ["Fox", "Owl", "Racoon", "Crane"],
// 	correct: 2,
// },
// {
// 	question: "Complete this Japanese saying: 'The nail that stands up...'",
// 	answers: ["'...will rust.'", "'...is magnetic.", "'...will be pulled out.'", "'...will be pounded down.'"],
// 	correct: 3,
// },
// {
// 	question: "In Japan, what English word is used to refer to delinquent teenagers?",
// 	answers: ["Yankee", "Gangster", "Street Rat", "Sinatra"],
// 	correct: 0,
// },
// {
// 	question: "A Shinto place of worship is referred to as a...",
// 	answers: ["Temple", "Chapel", "Shrine", "Hall"],
// 	correct: 2,
// },
// {
// 	question: "Which of the following writing systems are not used by the Japanese?",
// 	answers: ["Katakana", "Hangul", "Hiragana", "Kanji"],
// 	correct: 1,
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
	var thisAnswerIndex = $(this).attr("data-index");
	if (questionArray[qNum].correct === parseInt(thisAnswerIndex)) {
		$("#rightWrong").html("Correct!");
		correct++;
	}
	else {
		$("#rightWrong").html("Zannen! The answer was " + questionArray[qNum].answers[questionArray[qNum].correct] + ".");
	}
});


// if no selection is made and timer runs out, do same//


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
	
});


});