// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below: 
let companiesFaulty = [];  // set global variable
let invalid = [];
let valid = [];

// validate the card number with the Luhn algorithm
function validateCred(arr) {
  let sum = 0;  // variable to hold the sum of the card's numbers
  let doubled = 0; // part of the Luhn algorithm
  for(let i = arr.length - 1; i > 0; i--) { // iterate through the array of numbers
    // if index is even add to sum
    if(arr[i] % 2 === 0) {
      sum += arr[i];
    } else { // if index is odd
      doubled = arr[i] * 2; // double the number then check if greater than 9
      if(doubled > 9) {
        sum += doubled - 9; // subtract 9 if greater than 9
      } else {
        sum += doubled; // else add to the sum
      }
    }
  }
  if(sum % 10 === 0) {
    return true; // if sum is divisible by 10 then card is valid
  } else {
    return false; // if sum is not divisible by 10 then card is invalid
  }
}

// find invalid cards
function findInvalidCards(cards) {
  for(let i = cards.length - 1; i > 0; i--) {  // move through array backwards
    if(validateCred(cards[i]) == false) { // validate card
      invalid.unshift(cards[i]); // put number at front of invalid array
    } else {
      valid.unshift(cards[i]); // put number at front of valid array
    }
  }
  return invalid; // return the invalid array of numbers
}
findInvalidCards(batch); // call the function to populate the arrays

function idInvalidCardCompanies(invalidArr) {
  let badCompanies = []; // array of invalid cards from company
  let badCompaniesList; // hold unique list of bad companies (no doubles)
  let companies = { // object that contains companies, key is equal to card first number
    3: 'Amex',
    4: 'Visa',
    5: 'Mastercard',
    6: 'Discover'
  }
  // loop through invalid number array to index to company
  for(let i = 0; i < invalidArr.length; i++) {
    // put company in array
    if(invalidArr[i][0] === 3) {
      badCompanies.unshift('Amex (American Express)');
    } else if(invalidArr[i][0] == 4) {
      badCompanies.unshift('Visa');
    } else if(invalidArr[i][0] == 5) {
      badCompanies.unshift('Mastercard');
    } else if(invalidArr[i][0] == 6) {
      badCompanies.unshift('Discover');
    } else {
      badCompanies.unshift('Company not found!');
    }
  }
  // using the spread operator, iterate through badCompanies array and create unique list
  badCompaniesList = [...new Set(badCompanies)];
  // print results to console
  console.log(badCompaniesList);
};
// call the function to find bad card / card company 
idInvalidCardCompanies(invalid);
