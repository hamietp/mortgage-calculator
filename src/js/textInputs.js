import {
  currencyFormatter,
  currencyFieldsAllowedDigits,
  interestRateAllowedDigits,
} from './helpers.js';

const interestRate = document.getElementById('interestRate');
const homePrice = document.getElementById('homePrice');
const downPayment = document.getElementById('downPayment');
const loanAmountPercentage = document.getElementById('loanAmountPercentage');

const formattedInputs = [homePrice, downPayment];
const textInputs = [homePrice, downPayment, interestRate];

/**
 * Handles all the events on the text inputs, such as
 * - not allowing the user to delete the currency and percentage symbols,
 * - not allowing the user to enter double decimals,
 * - formatting the input value to currency and decimal format.
 */
const textInputsEventHandlers = function () {

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
   * Handles focus/focusout and keypress events for
   * House Value and Down Payment inputs, and handles exceptions
   */
  formattedInputs.forEach((element) => {
    element.addEventListener('focus', () => {

      // Places the cursor after the last digit
      const eol = element.value.length;
      element.setSelectionRange(eol, eol);

      if (element.value === '$' || element.value === '') {
        element.value = '$';
      } else {
        element.value = element.value.replace(/[^0-9.$]/g, '');
        element.value = element.value.replace(/\.00$/, '');
      }
    });

    element.addEventListener('input', () => {
      if (element.value.length < 2 || element.value === '$') {
        element.value = '$';
      }
    });

    element.addEventListener('keypress', (event) => {
      currencyFieldsAllowedDigits(event);
    });

    element.addEventListener('focusout', () => {
      element.value = element.value.replace(/^\$/, '');

      element.value === ''
        ? (element.value = '$')
        : (element.value = currencyFormatter(element.value)
            .format(element.value)
            .replace(/^(\D+)/, '$')
            .slice(0, -3));
    });
  });

  /** Handles events for interestRate in focus/focusout and keypress */
  interestRate.addEventListener('focus', () => {
    interestRate.value = interestRate.value.replace(/[^0-9.]/g, '');
  });

  interestRate.addEventListener('focusout', () => {
    interestRate.value = interestRate.value.replace(/[^0-9.]/g, '') + '%';
  });

  interestRate.addEventListener('keypress', (event) =>
    interestRateAllowedDigits(event)
  );

  /** Format Down Payment as currency and handles exceptions */
  downPayment.addEventListener('focusout', () => {
    let calcHomePrice = homePrice.value.replace(/\D/g, '');
    let calcDownPayment = downPayment.value.replace(/\D/g, '');

    if (
      calcHomePrice === '' ||
      calcDownPayment === '' ||
      calcHomePrice === '0' ||
      calcDownPayment === '0'
    ) {
      return;
    } else {
      let loanAmount = calcHomePrice - calcDownPayment;
      let downPaymentPercentage = (loanAmount / calcHomePrice) * 100;

      /** 
       * Calculates the percentage of the downPayment displayed
       * in the split input field
       */
      loanAmountPercentage.value = `${(100 - downPaymentPercentage)
        .toFixed(2)
        .replace(/\.00$/, '')} %`;
    }
  });

  /** Format Home Price as currency and handles exceptions */
  homePrice.addEventListener('focusout', () => {
    let calcHomePrice = homePrice.value.replace(/\D/g, '');
    let calcDownPayment = downPayment.value.replace(/\D/g, '');

    if (
      calcDownPayment === '' ||
      calcHomePrice === '' ||
      calcHomePrice === '0' ||
      calcDownPayment === '0'
    ) {
      return;
    } else {
      let loanAmount = calcHomePrice - calcDownPayment;
      let downPaymentPercentage = (loanAmount / calcHomePrice) * 100;

      loanAmountPercentage.value = `${(100 - downPaymentPercentage)
        .toFixed(2)
        .replace(/\.00$/, '')} %`;
    }
  });
};

export default textInputsEventHandlers;