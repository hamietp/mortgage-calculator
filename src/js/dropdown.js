const dropdownValues = document.getElementById('yearsOfMortgage');

/** Creating 30 options for the dropdown menu 
 * As the maximum Loan Term was not specified,
 * I chose to create 30 options for the dropdown menu
*/
for (let i = 0; i < 30; i++) {
    const option = document.createElement('option');
    option.value = i + 1;
    option.textContent = i + 1;
    dropdownValues.appendChild(option);
}






