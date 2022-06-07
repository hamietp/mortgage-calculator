/** Formats input to currency, en-US (USD)
 * @param {number} value
 * @returns {string} formatted currency
 */
function currencyFormatter(value) {
  value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return value;
}

/** Input formatter, only allowing numeric values */
function currencyFieldsAllowedDigits(event) {
  const key = event.which || event.keyCode;
  if (key >= 48 && key <= 57) {
    return true;
  } else {
    event.preventDefault();
  }
}
/** Input formatter, only allowing Numeric values as well as only 1 Decimal point*/
function interestRateAllowedDigits(event) {
  const key = event.which || event.keyCode;
  const decimals = key === 46 || key === 110 || key === 190;

  if (decimals && event.target.value.indexOf('.') !== -1) {
    event.preventDefault();
  }

  if (decimals || (key >= 48 && key <= 57)) {
    return true;
  } else {
    event.preventDefault();
  }
}

/**
 * Calculates value according to the formula provided
 *
 * @param {number} intRateVal Interest Rate(%)
 * @param {number} loanAmt Loan Amount ($)
 * @param {number} years Loan Term
 * @returns {number} Total Monthly Payment
 */
function calculationFormula(intRateVal, loanAmt, years) {
  let formula = 0;

  if (intRateVal === 0) {
    return (formula = loanAmt / (years * 12));
  }

  return (formula =
    ((intRateVal / 100 / 12) * loanAmt) /
    (1 - Math.pow(1 + intRateVal / 100 / 12, -years * 12)));
}

/**
 * @param {number} formula calculated value for Total Monthly Payment
 */
function printFinalResults(formula) {
  let formattedValue = currencyFormatter(formula).format(formula);
  let valueUnchanged = document.createTextNode('$ --');

  /** Checks if the final number is valid and prints it. */
  isNaN(formula) || formula < 0
    ? (totalMonthlyPayment.textContent = valueUnchanged.data)
    : (totalMonthlyPayment.textContent = `${formattedValue}`);
}

module.exports = {
  calculationFormula,
  currencyFormatter,
  currencyFieldsAllowedDigits,
  interestRateAllowedDigits,
  printFinalResults,
};
