/**
 * @jest-environment jsdom
 */

import calculationFormula from '../js/calculate.js';
import printFinalResults from '../js/calculate.js';

test('The Total Monthly Payment should be $1,337.65', () => {
  expect(calculationFormula(4.5, 264000, 30)).toBe(1337.65);
});

test("cannot be NaN", () => {
  expect(isNaN(calculationFormula(4.5, 264000, 30))).toBe(false);
})