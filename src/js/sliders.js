/** Instancing slider elements */
var sliderMortgage = document.getElementById("slider-mortgage");
var sliderInterest = document.getElementById("slider-interest");

var outputMortgage = document.getElementById("mortgage-output");
var outputInterest = document.getElementById("interest-output");

/** Function to update text values from the input based on where the position thumb currently is.
 * @param this.value
 */
sliderMortgage.oninput = function () {
  outputMortgage.value = this.value;
};
sliderInterest.oninput = function () {
  outputInterest.value = this.value;
};

/**
 * Modifies the background color of each slider, based on the thumb position.
 */
sliderMortgage.addEventListener("input", function () {
  var xm = ((sliderMortgage.value - sliderMortgage.min) / (sliderMortgage.max - sliderMortgage.min) * 100);
  var colorMortgage = `linear-gradient(90deg, #1B3979 ${xm}%, #DDDDDD ${xm}%)`;
  sliderMortgage.style.background = colorMortgage;
});

sliderInterest.addEventListener("input", function () {
  var xi = ((sliderInterest.value - sliderInterest.min) / (sliderInterest.max - sliderInterest.min) * 100);
  var colorInterest = `linear-gradient(90deg, #1B3979 ${xi}%, #DDDDDD ${xi}%)`;
  sliderInterest.style.background = colorInterest;
});