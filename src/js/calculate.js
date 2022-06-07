import { calculationFormula, printFinalResults } from './helpers.js';

const calcFormSubmit = document.getElementById('calculatorForm');

/** 'enter' key was not submitting the form (its done by default).
 *  this is weird. */
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    submitValues(event);
  }
});

calcFormSubmit.addEventListener('submit', (event) => {
  event.preventDefault();
  submitValues(event);
});

function submitValues(event) {
  const homePrice = document.getElementById('homePrice');
  const downPayment = document.getElementById('downPayment');
  const interestRate = document.getElementById('interestRate');

  /** Importing input values */
  const homePriceValue = homePrice.value;
  const downPaymentValue = downPayment.value;
  const interestRateValue = interestRate.value;
  const yearsOfMortgageValue = Number(
    document.getElementById('yearsOfMortgage').value
  );

  /** Arrays for looping through the elements */
  const userInputs = [homePrice, downPayment, interestRate];
  
  /** Parsing values for calculation */
  const calcHomePrice = Number(homePriceValue.replace(/[^0-9]/g, ''));
  const calcDownPayment = Number(downPaymentValue.replace(/[^0-9]/g, ''));
  const calcInterestRate = Number(interestRateValue.replace('%', ''));
  
  const loanAmount = calcHomePrice - calcDownPayment;

  /** Verifies and displays data-error then submitting the form */
  userInputs.forEach((input) => {
    input.parentElement.removeAttribute('data-error') |
      input.parentElement.parentElement.removeAttribute('data-error');

    if (input.value === '$' || input.value === '' || input.value === '%') {
      event.preventDefault();
      input.parentElement.setAttribute('data-error', 'Mandatory field') |
        input.parentElement.parentElement.setAttribute(
          'data-error',
          'Mandatory field'
        );
    }
  });

  /** Alternate data-error is displayed
   *  if Down Payment is higher than the House Price */
  if (calcDownPayment > calcHomePrice) {
    downPayment.parentElement.parentElement.setAttribute(
      'data-error',
      'Down payment cannot be greater than home price'
    );
    event.preventDefault();
  } else if (calcInterestRate < 0) {
    calcInterestRate.parentElement.setAttribute(
      'data-error',
      'Interest cannot be less than 0'
    );
    event.preventDefault();
  }

  /** Calculate results and prints it */
  printFinalResults(
    calculationFormula(calcInterestRate, loanAmount, yearsOfMortgageValue)
  );
}
