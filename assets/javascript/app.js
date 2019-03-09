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
    let questionTimer;
    let isTimerRunning = false;
    let timerUp;


    // Timer functions
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
        timerUp = setTimeout(function () {
            answerpage();
            stopQuestionTimer();
        }, 30 * 1000);
    }

    function stopQuestionTimer() {
        clearInterval(questionTimer);
        isTimerRunning = false;
    }

    // Functions to generate questions and answers
    function pickQuestion() {
        currentQuestion = questionArr.splice(Math.floor(Math.random() * questionArr.length), 1);
        $("#content").html("<p>" + questions[currentQuestion].ask + "</p>");
    }

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

    // Functions to progress through the game
    function gameStart() {
        correct = 0;
        incorrect = 0;
        questionArr = Object.getOwnPropertyNames(questions);
        $("h1").text("Animal Trivia");
        $("#start").css("display", "block").text("Play Game");
        $("#reset").css("display", "none");
        $("#content").html("<p>Press 'Play Game' to start.<br>You have 30 seconds to answer each question.</p>");
        $(".answer").css("display", "none").empty();
    }

    function questionPage() {
        $("#start").css("display", "none");
        time = 30;
        if (questionArr.length > 0) {
            startQuestionTimer();
            startTimerUp();
            pickQuestion();
            randomizeAnswers(questions[currentQuestion]);
            $(".answer").css("display", "block");
            $("#a").text(a);
            $("#b").text(b);
            $("#c").text(c);
            $("#d").text(d);
        }
        else {
            finalPage();
            clearTimeout(timerUp);
            stopQuestionTimer();
        }
    }

    function answerpage() {
        clearTimeout(timerUp);
        stopQuestionTimer();
        if (playerAnswer == questions[currentQuestion].answer) {
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

    function finalPage() {
        $("h1").text("Finished!");
        $("#reset").css("display", "block").text("Reset");
        $("#content").html("<p>Correct: " + correct + "<br>Incorrect: " + incorrect + "</p>");
        $(".answer").css("display", "none").empty();
    }

    // Event listeners
    $(document).on("click", "#start", function () {
        questionPage();
    });

    $(document).on("click", ".answer", function () {
        playerAnswer = $(this).text();
        answerpage();
    });

    $(document).on("click", "#reset", function () {
        gameStart();
    })

    
    gameStart();
});