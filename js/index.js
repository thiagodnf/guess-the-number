
function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function disableInput(disable=true){
    $("#form-number #number").prop("disabled", disable);
    $("#form-number button[type='submit']").prop("disabled", disable);
}

$(function(){

    var guessNumber = getRandomInteger(1,1000);

    var $result = $(".result");

    var attempts = 1;

    $("#form-number").submit(function(event){

        event.preventDefault();

        var $number = $(this).find("#number");

        var number = $number.val().trim() ;

        if(!number){
            return;
        }

        disableInput(true);

        if(number == guessNumber){
            $result.html("Good job! You guessed my number in "+attempts+" guesses!");
            $result.addClass( "alert alert-success" );
        }else{
            var text = "";

            if(number < guessNumber){
                text = "Your guess is too low";
            }else if(number > guessNumber){
                text = "Your guess is too high"
            }

            $result.html(text);
            $result.parent().addClass( "alert alert-danger" );

            $result.effect( "bounce", {}, 1200, function(){
                $result.text("Take a Guess!");
                $result.parent().removeClass( "alert alert-danger2" );
                $number.val("");
                disableInput(false);
            });

            attempts++;
        }

        return false;
    });
});
