var questions = [{
    question: "1. Why did the merchant offer to buy Nandu’s horse?",
    choices: ["He was very fond of the horse and wanted it for himself", "It was his way of helping Nandu who was poor.", "The horse would be useful for carrying goods to the market.", "He hated Nandu and wanted to deprive him of something he loved."],
    correctAnswer: 0
}, {
    question: "2. Which of the following is TRUE in the context of the passage? 1. Nandu was an orphan.   2. The merchant was very persevering.  3. The merchant was fond of Nandu's horse.",
    choices: ["Only 1", "Both 1 & 2", "All 1, 2 and 3", "None of these"],
    correctAnswer: 2
}, {
    question: "3. Why did Nandu set the condition of giving the merchant ten lashes?",
    choices: ["To discourage the merchant from buying his horse.", "To demonstrate how painful a whipping was so that the merchant would never hit the horse.", "To outwit the merchant who was trying to cheat him."],
    correctAnswer: 3
}, {
    question: "4. Why did the bystanders take Nandu’s side in the argument? 1. They hoped that Nandu would give them a reward from the five hundred gold coins he had earned. 2. They were sure that the merchant would ill treat the horse and wanted to prevent that from happening. 3. They knew that the merchant was a cheat and Nandu would be miserable without his horse of whom he was very fond.",
    choices: ["Only 1", "Both 1 & 3", "Only 3", "None of these"],
    correctAnswer: 2
}, {
    question: "5. What reason did Nandu cite for not giving the merchant the final lashes?",
    choices: ["He was tired and not in the mood.", "He realised that the merchant was in great pain and took pity on him.", "He was following the advice of the people around.", "His horse was distressed by the whipping."],
    correctAnswer: 3
}, {
    question: "6. While coming to the fair in the village Nandu rode on....?",
    choices: ["Car", "Bicycle", "Donkey", "Horse"],
    correctAnswer: 3
}, {
    question: "7. What condition did Nandu gave to the merchant before can collect the money?",
    choices: ["His Horse", "His car", "Ten lashes", "Money"],
    correctAnswer: 2
}, {
    question: "8. What is the name of the merchant?",
    choices: ["Somendra", "Nandu", "Merchandise", "Somentra"],
    correctAnswer: 0
}, {
    question: "9. At what lash did Nandu changed his mind?",
    choices: ["The 6th lashes", "The 7th lashes", "The 8th lashes", "The 10th lashes"],
    correctAnswer: 2
}, {
    question: "10. By Simpleton, the merchant means Nandu is...",
    choices: ["a fool", "a wise boy", "a simple boy", "a senseless boy"],
    correctAnswer: 0
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 180;
var t;
$(document).ready(function () {
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');

    timedCount();

    $(this).find(".preButton").on("click", function () {

        if (!quizOver) {
            if (currentQuestion == 0) {
                return false;
            }

            if (currentQuestion == 1) {
                $(".preButton").attr('disabled', 'disabled');
            }

            currentQuestion--; // Since we have already displayed the first question on DOM ready
            if (currentQuestion < questions.length) {
                displayCurrentQuestion();

            }
        } else {
            if (viewingAns == 3) {
                return false;
            }
            currentQuestion = 0;
            viewingAns = 3;
            viewResults();
        }
    });


    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            var val = $("input[type='radio']:checked").val();

            if (val == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();
                if (val == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                iSelectedAnswer[currentQuestion] = val;

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion >= 1) {
                    $('.preButton').prop("disabled", false);
                }
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();

                } else {
                    displayScore();
                    $('#iTimeShow').html('Quiz Time Completed!');
                    $('#timer').html("You scored: " + ((correctAnswers/questions.length)*100) + "%");
                    c = 185;
                    $(document).find(".preButton").text("View Answer");
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                    return false;

                }
            }

        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $('#iTimeShow').html('Time Remaining:');
            iSelectedAnswer = [];
            $(document).find(".nextButton").text("Next Question");
            $(document).find(".preButton").text("Previous Question");
            $(".preButton").attr('disabled', 'disabled');
            resetQuiz();
            viewingAns = 1;
            displayCurrentQuestion();
            hideScore();
        }
    });
});



function timedCount() {
    if (c == 185) {
        return false;
    }

    var hours = parseInt(c / 3600) % 24;
    var minutes = parseInt(c / 60) % 60;
    var seconds = c % 60;
    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    $('#timer').html(result);

    if (c == 0) {
        displayScore();
        $('#iTimeShow').html('Quiz Time Completed!');
        $('#timer').html("You scored: " + ((correctAnswers/questions.length)*100) + "%");
        c = 185;
        $(document).find(".preButton").text("View Answer");
        $(document).find(".nextButton").text("Play Again?");
        quizOver = true;
        return false;

    }

    /*if(c == 0 )
		{	
			if (!quizOver) 
			{
				var val = $("input[type='radio']:checked").val();
            	if (val == questions[currentQuestion].correctAnswer) 
				{
					correctAnswers++;
				}
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					c=15;
				} 
				else 
				{
					displayScore();
					$('#timer').html('');
					c=16;
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
				}
			}
			else 
			{ // quiz is over and clicked the next button (which now displays 'Play Again?'
				quizOver = false;
				$(document).find(".nextButton").text("Next Question");
				resetQuiz();
				displayCurrentQuestion();
				hideScore();
			}		
		}	*/
    c = c - 1;
    t = setTimeout(function () {
        timedCount()
    }, 1000);
}


// This displays the current question AND the choices
function displayCurrentQuestion() {

    if (c == 185) {
        c = 180;
        timedCount();
    }
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;


    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];

        if (iSelectedAnswer[currentQuestion] == i) {
            $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        } else {
            $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        }
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + ((correctAnswers/questions.length)*100) + "%");
   
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

// This displays the current question AND the choices
function viewResults() {

    if (currentQuestion == 10) {
        currentQuestion = 0;
        return false;
    }
    if (viewingAns == 1) {
        return false;
    }

    hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;


    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];

        if (iSelectedAnswer[currentQuestion] == i) {
            if (questions[currentQuestion].correctAnswer == i) {
                $('<li style="border:1px solid green;margin-top:15px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            } else {
                $('<li style="border:1px solid red;margin-top:15px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            }
        } else {
            if (questions[currentQuestion].correctAnswer == i) {
                $('<li style="border:1px solid green;margin-top:15px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            } else {
                $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            }
        }
    }

    currentQuestion++;

    setTimeout(function () {
        viewResults();
    }, 3000);
}