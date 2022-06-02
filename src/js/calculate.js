/**
 * Allows eventListener chaining
 */
EventTarget.prototype.addEventListener = (() => {
  const addEventListener = EventTarget.prototype.addEventListener;
  return function () {
    addEventListener.apply(this, arguments);
    return this;
  };
})();

var submitButton = document.getElementById('btn-submit');
var amountInput = document.getElementById('amount-input');
var taxInput = document.getElementById('tax-input');
var insuranceInput = document.getElementById('insurance-input');

const textInputs = [amountInput, taxInput, insuranceInput];

/**
 * Adds the data-error attribute for each input that were not filled out correctly
 *       and prevents the form from being submitted.
 *
 * Note: only works if the input was *unchanged* at all.
 *       If the user inputs any value (like '$0'), the calculation will begin.
 *
 * @event submit
 * @param {event} event
 */
submitButton.addEventListener('click', (event) => {
  if (amountInput.value === '$ ' || taxInput.value === '$ ' || insuranceInput.value === '$ ') {
    event.preventDefault();
  }

  textInputs.forEach((input) => {
    if (input.value === '$ ') {
      input.parentElement.setAttribute('data-error', 'Mandatory field');
    }
  });
});

textInputs.forEach((element) => {
  /**
   * Removes the data-error attribute from each input separately
   * when the user focus the input again.
   */
  element.addEventListener('focus', () => {
    element.parentElement.removeAttribute('data-error');
  });
});
