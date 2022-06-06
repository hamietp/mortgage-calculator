let yearsOfMortgage = document.getElementById('yearsOfMortgage');
let interestRate = document.getElementById('interestRate');
let homePrice = document.getElementById('homePrice');
let downPayment = document.getElementById('downPayment');
let loanAmountPercentage = document.getElementById('loanAmountPercentage');

const formattedInputs = [homePrice, downPayment];
const textInputs = [homePrice, downPayment, interestRate];

function currencyFormatter(value) {
  value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return value;
}

export default currencyFormatter;

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
formattedInputs.forEach((element) => {
  element.addEventListener('input', () => {
    if (element.value.length < 2) {
      element.value = '$';
    }
  });

  element.addEventListener('focusout', () => {
    if (element.value === '') {
      element.value = '$';
    }
  });
});

/**
 * Removes the data-error attribute from each input separately
 * when the user focus the input again.
 */
textInputs.forEach((element) => {
  element.addEventListener('focus', () => {
    element.parentElement.removeAttribute('data-error') |
      element.parentElement.parentElement.removeAttribute('data-error');
  });
});

formattedInputs.forEach((element) => {
  element
    .addEventListener('focus', () => {
      // Places the cursor after the last digit
      const eol = element.value.length;
      element.setSelectionRange(eol, eol);

      if (element.value === '$' || element.value === '') {
        element.value = '$';
      } else {
        element.value = element.value.replace(/[^0-9.$]/g, '');
        element.value = element.value.replace(/\.00$/, '');
      }
    })
    .addEventListener('input', () => {
      if (element.value.length < 2 || element.value === '$') {
        element.value = '$';
      }
    })
    .addEventListener('keypress', (event) => {
      currencyFieldsAllowedDigits(event);
    })
    .addEventListener('focusout', () => {
      element.value = element.value.replace(/^\$/, '');

      element.value === ''
        ? (element.value = '$')
        : (element.value = currencyFormatter(element.value)
            .format(element.value)
            .replace(/^(\D+)/, '$')
            .slice(0, -3));
    });
});

interestRate
  .addEventListener('focus', () => {
    interestRate.value = interestRate.value.replace(/[^0-9.]/g, '');
  })
  .addEventListener('focusout', () => {
    interestRate.value = interestRate.value.replace(/[^0-9.]/g, '') + '%';
  })
  .addEventListener('keypress', (event) => interestRateAllowedDigits(event));

downPayment.addEventListener('focusout', () => {
  let calcHomePrice = homePrice.value.replace(/\D/g, '');
  let calcDownPayment = downPayment.value.replace(/\D/g, '');

  if (calcHomePrice === '' || calcDownPayment === '' || calcHomePrice === '0' || calcDownPayment === '0') {
    return;
  } else {
    let loanAmount = calcHomePrice - calcDownPayment;
    let downPaymentPercentage = (loanAmount / calcHomePrice) * 100;

    loanAmountPercentage.value = `${(100 - downPaymentPercentage)
      .toFixed(2)
      .replace(/\.00$/, '')} %`;
  }
});

homePrice.addEventListener('focusout', () => {
  let calcHomePrice = homePrice.value.replace(/\D/g, '');
  let calcDownPayment = downPayment.value.replace(/\D/g, '');

  if (calcDownPayment === '' || calcHomePrice === '' || calcHomePrice === '0' || calcDownPayment === '0') {
    return;
  } else {
    let loanAmount = calcHomePrice - calcDownPayment;
    let downPaymentPercentage = (loanAmount / calcHomePrice) * 100;

    loanAmountPercentage.value = `${(100 - downPaymentPercentage)
      .toFixed(2)
      .replace(/\.00$/, '')} %`;
  }
});

function currencyFieldsAllowedDigits(event) {
  const key = event.which || event.keyCode;
  if (key >= 48 && key <= 57) {
    return true;
  } else {
    event.preventDefault();
  }
}

function interestRateAllowedDigits(event) {
  const key = event.which || event.keyCode;
  if (key === 46 || key === 110 || key === 190 || (key >= 48 && key <= 57)) {
    return true;
  } else {
    event.preventDefault();
  }
}
