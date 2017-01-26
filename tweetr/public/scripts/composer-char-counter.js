
//DOM ready function
$(document).ready(function(){

  //this will count how many chars you typed in post-form, numbers will turn /red/ if it's over 140.
  $(".new-tweet form textarea").on("keyup", function(event){
    var number = $(this).val();
    console.log(number.length);
    $(".new-tweet form span.counter").text(140-number.length);
      if(number.length>140){
        $(".new-tweet form span.counter").addClass("overcount");
      } else {
        $(".new-tweet form span.counter").removeClass("overcount");
      }
  });
});