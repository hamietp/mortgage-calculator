var amountInput = document.getElementById('amount-input');
var taxInput = document.getElementById('tax-input');
var insuranceInput = document.getElementById('insurance-input');
var mortgageSlider = document.getElementById('slider-mortgage');
var iinterestSlider = document.getElementById('slider-interest');

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
/** Format values before the first display */
amountInput.value = formatter.format(amountInput.value);
taxInput.value = formatter.format(taxInput.value);
insuranceInput.value = formatter.format(insuranceInput.value);

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
 * Applies formatting on focus and focusout events
 */
amountInput.addEventListener('focus', function () {
    if (amountInput.value === '$0.00') {
        amountInput.value = '';
    } else {
        amountInput.value = amountInput.value.replace(/[^0-9.]/g, '');
        amountInput.value = amountInput.value.replace(/\.00$/, '');
    }
}).addEventListener('focusout', function () {
    amountInput.value = formatter.format(amountInput.value);
});

taxInput.addEventListener('focus', function () {
    if (taxInput.value === '$0.00') {
        taxInput.value = '';
    } else {
        taxInput.value = taxInput.value.replace(/[^0-9.]/g, '');
        taxInput.value = taxInput.value.replace(/\.00$/, '');
    }
}).addEventListener('focusout', function () {
    taxInput.value = formatter.format(taxInput.value);
});

insuranceInput.addEventListener('focus', function () {
    if (insuranceInput.value === '$0.00') {
        insuranceInput.value = '';
    } else {
        insuranceInput.value = insuranceInput.value.replace(/[^0-9.]/g, '');
        insuranceInput.value = insuranceInput.value.replace(/\.00$/, '');
    }
}).addEventListener('focusout', function () {
    insuranceInput.value = formatter.format(insuranceInput.value);
});

// throw error if value is not a number