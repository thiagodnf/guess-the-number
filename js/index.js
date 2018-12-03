
function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function disableInput(disable=true){
    $("#form-number #number").prop("disabled", disable);
    $("#form-number button[type='submit']").prop("disabled", disable);
    $("#btn-give-up").prop("disabled", disable);
}

$(function(){

    var guessNumber = getRandomInteger(1,1000);

    var $result = $(".result");

    var attempts = 1;

    $("#btn-give-up").click(function(event){

        event.preventDefault();

        if(confirm("Are you sure?")){
            disableInput(true);
            $result.html("The number I was thinking of was "+guessNumber);
            $result.addClass( "alert alert-warning" );
        }

        return false;
    });

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
                $result.parent().removeClass( "alert alert-danger" );
                $number.val("");
                $number.focus();
                disableInput(false);
            });

            attempts++;
        }

        return false;
    });
});
