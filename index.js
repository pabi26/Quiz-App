// Define variables to track quiz progress
let currentQuestion = 0;
let score = 0;
let quizData;

// Define functions to display quiz questions and results
function displayQuestion() {
	let q = quizData.results[currentQuestion];
	document.getElementById("question").innerHTML = q.question;
	let choicesHtml = "";
	for (let i = 0; i < q.incorrect_answers.length; i++) {
		choicesHtml += '<input type="radio" name="choice" value="' + q.incorrect_answers[i] + '">' + q.incorrect_answers[i] + '<br>';
	}
	choicesHtml += '<input type="radio" name="choice" value="' + q.correct_answer + '">' + q.correct_answer + '<br>';
	document.getElementById("choices").innerHTML = choicesHtml;
}

function displayResults() {
	document.getElementById("quiz-container").style.display = "none";
	document.getElementById("result-container").style.display = "block";
	document.getElementById("result").innerHTML = "You got " + score + " out of " + quizData.results.length + " questions correct!";
}

// Define functions to handle quiz navigation
function startQuiz() {
    document.getElementById('header').style.display = 'none';
	document.getElementById("quiz-container").style.display = "block";
	document.getElementById("result-container").style.display = "none";
    currentQuestion = 0;
	score = 0;
	fetch("https://opentdb.com/api.php?amount=10&type=multiple")
		.then(response => response.json())
		.then(data => {
			quizData = data;
			displayQuestion();
		});
    
}

document.getElementById('next').addEventListener('click', function() {
    let selectedChoice = document.querySelector('input[name="choice"]:checked');
	if (!selectedChoice) {
		alert("Please select an answer.");
		return;
	}
	if (selectedChoice.value == quizData.results[currentQuestion].correct_answer) {
		score++;
	}
	currentQuestion++;
	if (currentQuestion == quizData.results.length) {
		displayResults();
	} else {
		displayQuestion();
	}
}) 

function startNewQuiz() {
	startQuiz();
	document.getElementById("new-quiz-button").style.display = "none";
}
