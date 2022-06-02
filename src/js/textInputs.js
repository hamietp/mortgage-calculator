var amountInput = document.getElementById('amount-input');
var taxInput = document.getElementById('tax-input');
var insuranceInput = document.getElementById('insurance-input');
var mortgageSliderOutput = document.getElementById('mortgage-output');
var interestSlider = document.getElementById('slider-interest');

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
amountInput
  .addEventListener('focus', function () {
    // Places the cursor after the last digit
    const eol = amountInput.value.length;
    amountInput.setSelectionRange(eol, eol);

    if (amountInput.value === '$ 0.00') {
      amountInput.value = '$ ';
    } else {
      amountInput.value = amountInput.value.replace(/[^0-9.$ ]/g, '');
      amountInput.value = amountInput.value.replace(/\.00$/, '');
    }
  })
  .addEventListener('input', function () {
    if (amountInput.value.length < 3) {
      amountInput.value = '$ ';
    }
  })
  .addEventListener('focusout', function () {
    amountInput.value = amountInput.value.replace(/^\$/, '');

    amountInput.value === ' '
      ? (amountInput.value = '$ ')
      : (amountInput.value = formatter
          .format(amountInput.value)
          .replace(/^(\D+)/, '$1 ')
          .slice(0, -3));
  });

taxInput
  .addEventListener('focus', function () {
    const eol = taxInput.value.length;
    taxInput.setSelectionRange(eol, eol);

    if (taxInput.value === '$ 0.00') {
      taxInput.value = '$ ';
    } else {
      taxInput.value = taxInput.value.replace(/[^0-9.$ ]/g, '');
      taxInput.value = taxInput.value.replace(/\.00$/, '');
    }
  })
  .addEventListener('input', function () {
    if (taxInput.value.length < 3) {
      taxInput.value = '$ ';
    }
  })
  .addEventListener('focusout', function () {
    taxInput.value = taxInput.value.replace(/^\$/, '');
    taxInput.value === ' '
      ? (taxInput.value = '$ ')
      : (taxInput.value = formatter
          .format(taxInput.value)
          .replace(/^(\D+)/, '$1 ')
          .slice(0, -3));
  });

insuranceInput
  .addEventListener('focus', function () {
    const eol = insuranceInput.value.length;
    insuranceInput.setSelectionRange(eol, eol);

    if (insuranceInput.value === '$ 0.00') {
      insuranceInput.value = '$ ';
    } else {
      insuranceInput.value = insuranceInput.value.replace(/[^0-9.$ ]/g, '');
      insuranceInput.value = insuranceInput.value.replace(/\.00$/, '');
    }
  })
  .addEventListener('input', function () {
    if (insuranceInput.value.length < 3) {
      insuranceInput.value = '$ ';
    }
  })
  .addEventListener('focusout', function () {
    insuranceInput.value = insuranceInput.value.replace(/^\$/, '');
    insuranceInput.value === ' '
      ? (insuranceInput.value = '$ ')
      : (insuranceInput.value = formatter
          .format(insuranceInput.value)
          .replace(/^(\D+)/, '$1 ')
          .slice(0, -3));
  });
