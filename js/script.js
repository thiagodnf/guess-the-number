let minNumber = 1;
let maxNumber = 1000;
let guessNumber = -1;
let attempts = 1;

let showHint = false;

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disableInput(disable = true) {
    $("#form-number #number").prop("disabled", disable);
    $("#form-number button[type='submit']").prop("disabled", disable);
    $("#btn-give-up").prop("disabled", disable);
    $("#btn-show-hint").prop("disabled", disable);
}

function updatePlaceHolder() {

    let min = 1;
    let max = 1000;

    if (showHint) {
        min = minNumber;
        max = maxNumber;
    }

    $("#number").attr("placeholder", `Type the number between ${min} and ${max}`);
}

function setBackgroundColor($el, cls){

    $el.removeClass("bg-wrong");
    $el.removeClass("bg-success");
    $el.removeClass("bg-purple");
    $el.removeClass("bg-warning");

    $el.addClass(cls);
}

$(function () {

    guessNumber = getRandomInteger(minNumber, maxNumber);

    console.debug("Guess Number", guessNumber);

    var $result = $(".result-text");

    $(".number-only").keypress(function (e) {

        let charCode = (e.which) ? e.which : e.keyCode;

        if(charCode === 13){
            return true;
        }

        if (String.fromCharCode(charCode).match(/[^0-9]/g)){
            return false;
        }
    });

    $("#btn-give-up").click(function (event) {

        event.preventDefault();

        if (confirm("Are you sure?")) {
            disableInput(true);
            $result.html("The number I was thinking of was " + guessNumber);
            setBackgroundColor($result.parent(), "bg-warning");
        }

        return false;
    });

    $("#btn-show-hint").click(function () {

        showHint = $(this).is(":checked");

        updatePlaceHolder();
    });

    $("#form-number").submit(function (event) {

        event.preventDefault();

        const $number = $(this).find("#number");

        var number = parseInt($number.val());

        console.debug("Entered Number", number);

        if (number === guessNumber) {
            $result.text(`Good job! You guessed my number in ${attempts} guesses!`);
            setBackgroundColor($result.parent(), "bg-success");
            disableInput(true);
        } else {

            var text = "";

            if (number < guessNumber) {
                text = "Your guess is too low";
                minNumber = number;
            } else if (number > guessNumber) {
                text = "Your guess is too high";
                maxNumber = number;
            }

            $result.text(text);
            setBackgroundColor($result.parent(), "bg-wrong");

            $number.val("").focus();

            attempts++;
        }

        updatePlaceHolder();

        return false;
    });
});
