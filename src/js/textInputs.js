var amountInput = document.getElementById('amount-input');
var taxInput = document.getElementById('tax-input');
var insuranceInput = document.getElementById('insurance-input');

const textInputs = [amountInput, taxInput, insuranceInput];

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

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

/**
 * Applies formatting on focus and focusout events,
 * as well as do not let the user delete the currency prefix.
 */

textInputs.forEach((element) => {
  element
    .addEventListener('focus', () => {
      // Places the cursor after the last digit
      const eol = element.value.length;
      element.setSelectionRange(eol, eol);

      if (element.value === '$ 0.00') {
        element.value = '$ ';
      } else {
        element.value = element.value.replace(/[^0-9.$ ]/g, '');
        element.value = element.value.replace(/\.00$/, '');
      }
    })
    .addEventListener('input', () => {
      if (element.value.length < 3) {
        element.value = '$ ';
      }
    })
    .addEventListener('focusout', () => {
      element.value = element.value.replace(/^\$/, '');

      element.value === ' '
        ? (element.value = '$ ')
        : (element.value = formatter
            .format(element.value)
            .replace(/^(\D+)/, '$1 ')
            .slice(0, -3));
    });
});