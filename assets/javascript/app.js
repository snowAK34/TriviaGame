"use strict"
$(document).ready(function () {

    let questions = {
        questionOne: {
            ask: "How long is a giraffe's tongue?",
            answer: "18 inches",
            wrong: ["6 inches", "2 feet", "1 foot"]
        },
        questionTwo: {
            ask: "What do you call a group a zebras?",
            answer: "a dazzle",
            wrong: ["a herd", "a barcode", "a caravan"]
        },
        questionThree: {
            ask: "What mammal has the strongest bite?",
            answer: "hyena",
            wrong: ["jaguar", "grizzly bear", "human"]
        },
        questionFour: {
            ask: "Which of these animals are solitary in the wild?",
            answer: "tiger",
            wrong: ["lion", "chimpanzee", "otter"]
        },
        questionFive: {
            ask: "What bird has the longest distance migration?",
            answer: "arctic tern",
            wrong: ["bar-headed goose", "albatross", "calliope hummingbird"]
        }
    }

    let correct = 0;
    let incorrect = 0;
    let questionArr = Object.getOwnPropertyNames(questions);
    let currentQuestion;
    let a;
    let b;
    let c;
    let d;
    let playerAnswer;
    let time;
    // variable for 30s interval countdown
    let questionTimer;
    let isTimerRunning = false;
    // variable for timeout on question page
    let timerUp;

    // sets and starts 30s timer on question page
    function startQuestionTimer() {
        if (!isTimerRunning) {
            $("h1").text(30);
            questionTimer = setInterval(function () {
                time--;
                $("h1").text(time);
            }, 1000);
            isTimerRunning = true;
        }
    }

    function startTimerUp() {
        // after 30s, time is out and go to answer page
        timerUp = setTimeout(function () {
            answerpage();
            stopQuestionTimer();
        }, 30 * 1000);
    }

    // function to stop 30s question timer
    function stopQuestionTimer() {
        clearInterval(questionTimer);
        isTimerRunning = false;
    }

    // At game start, name is in jumbotron, button is showing with Play & click advances to question page
    // content has instructions (or empty? or picture?)
    function gameStart() {
        console.log("Ran gameStart");
        correct = 0;
        incorrect = 0;
        questionArr = Object.getOwnPropertyNames(questions);
        $(".answer").empty();
        $("h1").text("Animal Trivia");
        $("#start").text("Play Game").on("click", function () {
            questionPage();
        });
        $("#content").html("<p>Press 'Play Game' to start.<br>You have 30 seconds to answer each question.</p>");
        $(".answer").css("display", "none");
    }

    // This function maps right and wrong answers to random a,b,c,&d variables
    function randomizeAnswers(q) {
        let answersArr = [];
        for (let i = 0; i < q.wrong.length; i++) {
            answersArr.push(q.wrong[i]);
        }
        answersArr.push(q.answer);
        a = answersArr.splice(Math.floor(Math.random() * answersArr.length), 1);
        b = answersArr.splice(Math.floor(Math.random() * answersArr.length), 1);
        c = answersArr.splice(Math.floor(Math.random() * answersArr.length), 1);
        d = answersArr.splice(Math.floor(Math.random() * answersArr.length), 1);
    }

    // sets single random question object name to currentQuestion variable
    function pickQuestion() {
        console.log("Array of questions: " + questionArr);
        currentQuestion = questionArr.splice(Math.floor(Math.random() * questionArr.length), 1);
        $("#content").html("<p>" + questions[currentQuestion].ask + "</p>");
        console.log("Current question: " + questions[currentQuestion].ask);
    }

    // question page has timer in jumbotron, question and answer buttons populate below that
    function questionPage() {
        console.log("Ran questionPage");
        $("#start").css("display", "none");
        time = 30;
        if (questionArr.length > 0) {
            // starts 30s timer
            startQuestionTimer();
            // after 30s, time is out and go to answer page
            startTimerUp();
            // picks random question from question array
            pickQuestion();
            // makes answer array and randomly assigns to a,b,c,d
            randomizeAnswers(questions[currentQuestion]);
            // populates buttons
            $(".answer").css("display", "block");
            $("#a").text(a);
            $("#b").text(b);
            $("#c").text(c);
            $("#d").text(d);
            // moves to answer page when button clicked
            $(".answer").on("click", function () {
                answerpage();
                // stop 30s timer & page time out
                stopQuestionTimer();
                clearTimeout(timerUp);
                // need to save answer response in a variable
                playerAnswer = $(this).text();
                console.log("Player answer: " + playerAnswer);
            });
        }
        else {
            finalPage();
            clearTimeout(timerUp);
            stopQuestionTimer();
        }
    }

    // answer page has correct/incorrect in jumbotron, button is hidden, content has correct answer
    function answerpage() {
        console.log("Ran answerPage");
        clearTimeout(timerUp);
        stopQuestionTimer();
        console.log("Current correct answer: " + questions[currentQuestion].answer);
        if (playerAnswer === questions[currentQuestion].answer) {
            $("h1").text("Correct!");
            correct++;
        }
        else {
            $("h1").text("Incorrect");
            incorrect++;
        }
        $("#content").html("<p>Correct Answer is: " + questions[currentQuestion].answer + "</p>");
        setTimeout(function () { questionPage() }, 3000);
    }

    // final page has Finished in jumbotron, reset button that returns to game start, content shows number correct & incorrect
    function finalPage() {
        console.log("Ran finalPage");
        $("h1").text("Finished!");
        $("#start").css("display", "block").text("Reset").on("click", function () {
            gameStart();
        });
        $("#content").html("<p>Correct: " + correct + "<br>Incorrect: " + incorrect + "</p>");
        $(".answer").empty();
        $(".answer").css("display", "none");
    }

    gameStart();

});