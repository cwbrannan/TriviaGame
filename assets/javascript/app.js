$(document).ready(function() {

    var questions = [{
            question: "In the movie Star Wars, what is the Emporers last name\?" + "<br/>",
            choices: ["Knobi", "Palpatine", "Smith", "Kosar"],
            correctAnswer: 1
        },
        {
            question: "What film was the last sequel to win a best picture award\?" + "<br/>",
            choices: ["Silence of the Lambs", "Bourne Identity", "Aliens", "Dumb and Dumber"],
            correctAnswer: 0

        },
        {
            question: "In the Terminator, Sarah Conner was played by who?\?" + "<br/>",
            choices: ["Sigorni Weaver", "Linda Hamilton", "Helen Miran", "Dakota Fanning"],
            correctAnswer: 1

        },
        {
            question: "The first movie ever given the title Blockbuster was which movie\?" + "<br/>",
            choices: ["Gone with the Wind", "Jaws", "Raiders of the Lost Ark", "Elf"],
            correctAnswer: 1

        },
        {
            question: "Charlie Chaplin insured which part of his body\?" + "<br/>",
            choices: ["Knees", "Legs", "Feet", "Hands"],
            correctAnswer: 2

        },
        {
            question: "Which actor once had a job as a coffin polisher\?" + "<br/>",
            choices: ["Marlin Brando", "Johnny Deep", "Sean Connery", "Christopher Walken"],
            correctAnswer: 2

        },
        {
            question: "Who wanted to play Brody in Jaws but was rejected by Spielberg\?" + "<br/>",
            choices: ["John Oliver", "Sean Connery", "Charlton Heston", "Roger Moore"],
            correctAnswer: 2

        },
        {
            question: "Which X-Rated Movie won an Oscar\?" + "<br/>",
            choices: ["Zombie Beavers", "Ben Hur", "Debbie Does Dallas", "Midnight Cowboy"],
            correctAnswer: 3

        },
        {
            question: "In the Original film who steals the Pink Panther\?" + "<br/>",
            choices: ["The Babbodook", "The Phantom", "The Boss", "The Mysterious"],
            correctAnswer: 1

        },
        {
            question: "What was Hitchcock's first color film\?" + "<br/>",
            choices: ["Swamp Thing", "The Birds", "Rope", "The House at the end of the Street"],
            correctAnswer: 2

        }

    ];


    // Function for Questions 
    $.each(questions, function(index, value) {
        console.log(questions);

        var $li = $("<li></li>");
        $li.html(index + 1 + ". " + value.question);
        $li.attr("correctAnswer", value.correctAnswer)


        //Function for Choices
        $.each(value.choices, function(choiceIndex, choice) {



            var $input = $("<input/>");
            $input.attr("type", "radio");
            $input.attr("name", "question" + index);
            $input.attr("value", choice);
            $input.attr("id", choice)
            $li.append($input);


            var label = $("<label/>")
            label.attr("for", choice);
            label.text(choice);
            $li.append(label);

        })

        $("#quiz-question").append($li);


    });



    var answerCorrect = 0;
    var answerWrong = 0;
    var notAnswered = 0;
    var timer;


    function startTimer(count) {

        console.log(count);
        timer = setInterval(function() {

            $("#count").html(count--);
            if (count === 0) {
                console.log('time is up!!!');
                $("#quiz-question").hide();
                $("#startClock").html('Time is up!!');
            }
            if (count <= -1) {
                clearInterval(timer);
            }
        }, 1000);
    };

    $('#start').click(function() {
        $(".blanket").removeClass("hidden");
        $(this).addClass("hidden");
        startTimer(60);

    });

    function questChecker() {
        $("input:checked").each(function(i, input) {
            var val = $(input).val();

            var answerIndex = $(input).parent().attr("correctAnswer");

            console.log("correct answer: ", questions[i].choices[answerIndex]);
            var answer = questions[i].choices[answerIndex];

            if (val == answer) {
                answerCorrect++;
            } else {
                answerWrong++;
            }


        });
        notAnswered = questions.length - (answerCorrect + answerWrong);
    }

    $("#results").hide();



    // Done button function to display results

    $("#submit").on("click", function() {

        questChecker();
        $("#results").show();
        $("#correctAns").text(answerCorrect);
        $("#wrongAns").text(answerWrong);
        $("#notAns").text(notAnswered);
        $("#quiz-question").hide();
        $("#submit").hide();
        $("#count").hide();
        $("#button-restart").show();
        clearInterval(timer);

    });
    var spawnRestartButton = function() {
        var button = $("<button>").text("Restart");
        button.hide();
        button.attr("id", "button-restart");
        $(".question-container").append(button);

    }

    spawnRestartButton();

    //Restarts the time after restart button is pressed

    $(document).on("click", "#button-restart", function() {
        $(".question-container").empty();
        $("#quiz-question").show();
        $("#results").hide()
        $("#submit").show();
        $("#count").show();
        startTimer(60)


    });


});