/** Instancing slider elements */
var slider = document.getElementById("input-range");
var output = document.getElementById("js-mortgage__output");

/**
 * remove this later
 */
var testoutput = document.getElementById("tst");

/** Function to update text values from the input based on where the position thumb currently is.
 * @param this.value
 */
slider.oninput = function() {
  output.innerHTML = this.value;
  testoutput.innerHTML = this.value;
}

