let yearsOfMortgage = document.getElementById('yearsOfMortgage');
let interestRate = document.getElementById('interestRate');
let homePrice = document.getElementById('homePrice');
let downPayment = document.getElementById('downPayment');
let loanAmountPercentage = document.getElementById('loanAmountPercentage');

const formattedInputs = [homePrice, downPayment];
const textInputs = [homePrice, downPayment, interestRate];

let formatter = new Intl.NumberFormat('en-US', {
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
formattedInputs.forEach((element) => {
  element
    .addEventListener('focus', () => {})
    .addEventListener('input', () => {
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
    element.parentElement.removeAttribute('data-error');

    /** Split input */
    if(element === downPayment){
      element.parentElement.parentElement.removeAttribute('data-error');
    }
  });
});

formattedInputs.forEach((element) => {
  element
    .addEventListener('focus', () => {
      // Places the cursor after the last digit
      const eol = element.value.length;
      element.setSelectionRange(eol, eol);

      if (element.value === '$0' || element.value === '') {
        element.value = '$';
      } else {
        element.value = element.value.replace(/[^0-9.$]/g, '');
        element.value = element.value.replace(/\.00$/, '');
      }
    })
    .addEventListener('input', () => {
      if (element.value.length < 2 || element.value === '$0') {
        element.value = '$';
      }
    })
    .addEventListener('focusout', () => {
      element.value = element.value.replace(/^\$/, '');

      element.value === ''
        ? (element.value = '$')
        : (element.value = formatter
            .format(element.value)
            .replace(/^(\D+)/, '$')
            .slice(0, -3));
    });
});

interestRate.addEventListener('input', () => {
  if (interestRate.value.length > interestRate.maxLength) {
    interestRate.value = interestRate.value.slice(0, interestRate.maxLength+1);
  }
});

downPayment.addEventListener('focusout', () => {
  let calcHomePrice = homePrice.value.replace(/\D/g, '');
  let calcDownPayment = downPayment.value.replace(/\D/g, '');

  if (calcHomePrice === '' || calcDownPayment === '') {
    return;
  } else {
    let loanAmount = calcHomePrice - calcDownPayment;
    let downPaymentPercentage = (loanAmount / calcHomePrice) * 100;

    loanAmountPercentage.value = `${(100 - downPaymentPercentage).toFixed(2)} %`;
  }
});

homePrice.addEventListener('focusout', () => {
  let calcHomePrice = homePrice.value.replace(/\D/g, '');
  let calcDownPayment = downPayment.value.replace(/\D/g, '');

  if (calcDownPayment === '' || calcHomePrice === '') {
    return;
  } else {
    let loanAmount = calcHomePrice - calcDownPayment;
    let downPaymentPercentage = (loanAmount / calcHomePrice) * 100;

    loanAmountPercentage.value = `${(100 - downPaymentPercentage).toFixed(2)} %`;
  }
});
