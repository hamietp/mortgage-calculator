/** Instancing slider elements */
var sliderMortgage = document.getElementById('sliderMortgage');
var sliderInterest = document.getElementById('sliderInterest');

var outputMortgage = document.getElementById('mortgageOutput');
var outputInterest = document.getElementById('interestOutput');

const sliders = [sliderMortgage, sliderInterest];
const outputs = [outputMortgage, outputInterest];

/**
 * Allows addEventListener chaining
 */
EventTarget.prototype.addEventListener = (() => {
  const addEventListener = EventTarget.prototype.addEventListener;
  return function () {
    addEventListener.apply(this, arguments);
    return this;
  };
})();

/**
 * Updates color of each slider, based on the thumb position:
 * Color will be updated if:
 * - The thumb is being moved or;
 * - The value was input manually.
 */

/** Thumb movement */
sliders.forEach((element) => {
  element.addEventListener('input', () => {
    var xm = ((element.value - element.min) / (element.max - element.min)) * 100;
    var colorMortgage = `linear-gradient(90deg, #1B3979 ${xm-5}%, #DDDDDD ${xm-5}%)`;
    element.style.background = colorMortgage;
  });
});

/** Value input manually */
outputMortgage
  .addEventListener('input', (event) => {
    var xm = ((sliderMortgage.value - sliderMortgage.min) / (sliderMortgage.max - sliderMortgage.min)) * 100;
    var colorMortgage = `linear-gradient(90deg, #1B3979 ${xm-5}%, #DDDDDD ${xm-5}%)`;
    sliderMortgage.style.background = colorMortgage;

    if (outputMortgage.value === '' || (event.charCode >= 48 && event.charCode <= 57)) {
      sliderMortgage.style.background = `linear-gradient(90deg, #1B3979 2%, #DDDDDD 2%)`;
      sliderMortgage.value = 1;
    }
  })
  .addEventListener('focusout', () => {
    if (outputMortgage.value === '' || outputMortgage.value > sliderMortgage.max || outputMortgage.value < sliderMortgage.min) {
      outputMortgage.value = sliderMortgage.value = 1;
      sliderMortgage.style.background = `linear-gradient(90deg, #1B3979 2%, #DDDDDD 2%)`;
    }
  });

outputInterest
  .addEventListener('input', () => {
    var xi = ((sliderInterest.value - sliderInterest.min) / (sliderInterest.max - sliderInterest.min)) * 100;
    var colorInterest = `linear-gradient(90deg, #1B3979 ${xi}%, #DDDDDD ${xi}%)`;
    sliderInterest.style.background = colorInterest;

    // Handles the case where the user enters 2 decimal points
    if (outputInterest.value.slice(-2) === '..') {
      outputInterest.value = outputInterest.value.slice(0, -1);
    }

    if (outputInterest.value === '') {
      sliderInterest.style.background = `linear-gradient(90deg, #1B3979 10%, #DDDDDD 10%)`;
      sliderInterest.value = 1;
    }
  })
  .addEventListener('focusout', () => {
    // Handles the case where the user enters the value "10."
    if (outputInterest.value.slice(-1) === '.') {
      outputInterest.value = outputInterest.value.slice(0, -1);
    }

    if (
      outputInterest.value === '' ||
      outputInterest.value > sliderInterest.max ||
      outputInterest.value < sliderInterest.min ||
      !outputInterest.value.match(/^[0-9]*\.?[0-9]*$/)
    ) {
      outputInterest.value = sliderInterest.value = 1;
      sliderInterest.style.background = `linear-gradient(90deg, #1B3979 10%, #DDDDDD 10%)`;
    }
  });

//              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
