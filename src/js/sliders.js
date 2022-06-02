/** Instancing slider elements */
var sliderMortgage = document.getElementById('sliderMortgage');
var sliderInterest = document.getElementById('sliderInterest');

var outputMortgage = document.getElementById('mortgageOutput');
var outputInterest = document.getElementById('interestOutput');

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
sliderMortgage.addEventListener('input', function () {
  var xm = ((sliderMortgage.value - sliderMortgage.min) / (sliderMortgage.max - sliderMortgage.min)) * 100;
  var colorMortgage = `linear-gradient(90deg, #1B3979 ${xm}%, #DDDDDD ${xm}%)`;
  sliderMortgage.style.background = colorMortgage;
});

sliderInterest.addEventListener('input', function () {
  var xi = ((sliderInterest.value - sliderInterest.min) / (sliderInterest.max - sliderInterest.min)) * 100;
  var colorInterest = `linear-gradient(90deg, #1B3979 ${xi}%, #DDDDDD ${xi}%)`;
  sliderInterest.style.background = colorInterest;
});

/** Value input manually */
outputMortgage
  .addEventListener('input', function () {
    var xm = ((sliderMortgage.value - sliderMortgage.min) / (sliderMortgage.max - sliderMortgage.min)) * 100;
    var colorMortgage = `linear-gradient(90deg, #1B3979 ${xm}%, #DDDDDD ${xm}%)`;
    sliderMortgage.style.background = colorMortgage;

    if (outputMortgage.value === '') {
      sliderMortgage.style.background = `linear-gradient(90deg, #1B3979 2%, #DDDDDD 2%)`;
      sliderMortgage.value = 1;
    }
  })
  .addEventListener('focusout', function () {
    if (outputMortgage.value === '' || outputMortgage.value > sliderMortgage.max || sliderMortgage.value < outputMortgage.min) {
      outputMortgage.value = sliderMortgage.value = 1;
      sliderMortgage.style.background = `linear-gradient(90deg, #1B3979 2%, #DDDDDD 2%)`;
    }
  });

outputInterest
  .addEventListener('input', function () {
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
  .addEventListener('focusout', function () {
    // Handles the case where the user enters the value "10." 
    if (outputInterest.value.slice(-1) === '.') {
      outputInterest.value = outputInterest.value.slice(0, -1);
    }

    if (outputInterest.value === '' || outputInterest.value > sliderInterest.max || sliderInterest.value < outputInterest.min) {
      outputInterest.value = sliderInterest.value = 1;
      sliderInterest.style.background = `linear-gradient(90deg, #1B3979 10%, #DDDDDD 10%)`;
    }
  });
