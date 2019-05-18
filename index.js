// Declare variable
const loanForm = document.getElementById("loan-form");

// Listen for submit 
loanForm.addEventListener('submit', function (e) {
  // hide result
  document.getElementById('results').style.display = 'none';
  // show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 1000);
  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  console.log('....calculating')
  // UI Vars
  const amount = document.querySelector("#amount");
  const interest = document.getElementById('interest');
  const years = document.querySelector("#years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(3);
    totalPayment.value = (monthly * calculatedPayments).toFixed(3);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(3);
    // show result
    document.getElementById('results').style.display = 'block';
    // hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError("check your input figures");
    // // hide result
    // document.getElementById('results').style.display = 'none';
    // // hide loader
    // document.getElementById('loading').style.display = 'none';
  }
};

// Show Error
function showError(error) {
  // hide result
  document.getElementById('results').style.display = 'none';
  // hide loader
  document.getElementById('loading').style.display = 'none';
  const errDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // add class
  errDiv.className = 'alert alert-danger';

  // create text node and append to div
  errDiv.appendChild(document.createTextNode(error));
  //   insert error before heading
  card.insertBefore(errDiv, heading);

  // clear error after 1 seconds
  setTimeout(clearErr, 1000);
};

function clearErr() {
  document.querySelector(".alert").remove();
}; 