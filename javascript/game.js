$(document).ready(function() {
  //Image array

  crystals = [
    "assets/crystal-blue.jpg",
    "assets/crystal-orange.jpg",
    "assets/crystal-purple.jpg",
    "assets/crystal-red.jpg"
  ];

  var counter = 0;
  var wins = 0;
  var losses = 0;

  // text overides for scores

  $("#win").text(wins);
  $("#loss").text(losses);

  newCrystals();
  newGame(); // game reset

  function newCrystals() {
    var numbers = [];
    while (numbers.length < 4) {
      var randomNumber = Math.ceil(Math.random() * 15);
      var found = false;
      for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] == randomNumber) {
          found = true;
          break;
        }
      }
      if (!found) numbers[numbers.length] = randomNumber;
    }

    for (i = 0; i < numbers.length; i++) {
      var imageCrystal = $("<img>");
      imageCrystal.attr("data-num", numbers[i]);
      imageCrystal.attr("src", crystals[i]); //img
      imageCrystal.attr("alt", "crystals");
      imageCrystal.addClass("crystalImage");
      $("#crystals").append(imageCrystal);
    }
  }

  // resets game

  function newGame() {
    counter = 0;
    $("#yourScore").text(counter);

    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min) + 1);
    }

    var numberToGuess = randomIntFromInterval(19, 120);

    $(".value").text(numberToGuess);

    // main function

    $(".crystalImage").on("click", function() {
      counter = counter + parseInt($(this).data("num"));

      $("#yourScore").text(counter);

      if (counter == numberToGuess) {
        $("#status").text("Winner!"); //if user wins
        wins++;
        $("#win").text(wins);
        console.log(wins);
        $("#crystals").empty();
        newCrystals();
        newGame();
      } else if (counter > numberToGuess) {
        $("#status").text("Loser!"); // if user loses
        newGame();
        losses++;
        $("#loss").text(losses);
        console.log(losses);
        $("#crystals").empty();
        newCrystals();
        newGame();
      }
    });
  }
});
