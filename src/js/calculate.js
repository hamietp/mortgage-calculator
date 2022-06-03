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

let homePrice = document.getElementById('homePrice'); // Home Price
let downPayment = document.getElementById('downPayment'); // Down Payment
let yearsOfMortgage = document.getElementById('yearsOfMortgage'); // Loan Term
let interestRate = document.getElementById('interestRate'); // Interest Rate (%)
let loanAmountPercentage = document.getElementById('loanAmountPercentage'); // Loan Amount (%)
let totalMonthlyPayment = document.getElementById('totalMonthlyPayment'); // Total Monthly Payment

let submitButton = document.getElementById('btn-submit');

/**
 * I declared the inputs twice, because:
 * 1) To loop through the inputs in order to check if they are valid and
 *    also to setAttribute for data-error in each field.
 *
 * 2) To get the values and convert them to numbers.
 *
 *    I did this because I was getting an scope value error when changing the value
 * a second time after submitting the form.
 *    When that happened, the values were not getting updated and the calculation
 * was not right or an error was popping.
 *
 */

submitButton.addEventListener('click', (event) => {
  let homePriceValue = event.currentTarget.form.homePrice.value; // Home Price
  let downPaymentValue = event.currentTarget.form.downPayment.value; // Down Payment
  let yearsOfMortgageValue = Number(event.currentTarget.form.yearsOfMortgage.value); // Loan Term
  let interestRateValue = Number(event.currentTarget.form.interestRate.value); // Interest Rate (%)

  let calcHomePrice = Number(homePriceValue.replace(/[^0-9]/g, ''));
  let calcDownPayment = Number(downPaymentValue.replace(/[^0-9]/g, ''));
  const userInputs = [homePrice, downPayment, interestRate];

  let loanAmount = calcHomePrice - calcDownPayment;

  /** Error message for each field that actually has errors */
  userInputs.forEach((input) => {
    if (input.value === '$' || input.value === '') {
      event.preventDefault();
      input.parentElement.setAttribute('data-error', 'Mandatory field') |
        input.parentElement.parentElement.setAttribute('data-error', 'Mandatory field');
    }
  });

  if (calcDownPayment > calcHomePrice) {
    downPayment.parentElement.parentElement.setAttribute('data-error', 'Down payment cannot be greater than home price');
    event.preventDefault();
  } else if (interestRateValue < 0) {
    interestRate.parentElement.setAttribute('data-error', 'Interest cannot be less than 0');
    event.preventDefault();
  }
  let totalMonthlyPayment = 0;
  let formula =
    ((interestRateValue / 100 / 12) * loanAmount) / (1 - Math.pow(1 + interestRateValue / 100 / 12, -yearsOfMortgageValue * 12));

  isNaN(formula) ? (totalMonthlyPayment = '$ --') : (totalMonthlyPayment = formula.toFixed(2));

  totalMonthlyPayment.innerText = `$ ${totalMonthlyPayment}`;
});
