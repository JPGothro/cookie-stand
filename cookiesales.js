'use strict';

// script for sales tools page

// The Store object constructor
function Store (name, min, max, avg) {
  this.storeName = name;
  this.minCust = min;
  this.maxCust = max;
  this.avgCookiesPurchased = avg;
  this.totalCookies = 0;
  this.hourlyCookies = [];
  this.tableRow;
  this.hourlyCustomers = [];
  this.totalCustForStore = 0;
}

// creating object functions and putting them on the prototype
Store.prototype.getRandomNum = function () {
  // this generates a random number between the min and max values.
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
};

Store.prototype.cookiesPerHour = function () {
  // calculates a random number average of cookies purchased
  // capture the number of customers used in this calc - it is the generated random number
  var randomNbr = this.getRandomNum();
  this.hourlyCustomers.push(randomNbr);
  return randomNbr * this.avgCookiesPurchased;
};

Store.prototype.cookiesPerDay = function () {
  // caclulates total cookes per day based on the random average of cookies per hour
  for (var j = 0; j < 14; j++) {
    this.hourlyCookies[j] = Math.round(this.cookiesPerHour());
    this.totalCookies += this.hourlyCookies[j];
  };
};

Store.prototype.createCookieTableData = function () {
  // create the data to put in a table...
  this.cookiesPerDay();

  //  store table data created here (a row of data for the table)
  var bodyRow     = document.createElement('tr');

  // create the row header first, then load in the rest of the row data
  var rowName     = document.createElement('th');
  rowName.textContent = this.storeName;
  bodyRow.appendChild(rowName);

  for (var j = 0; j < this.hourlyCookies.length; j++) {
    var elem = document.createElement('td');
    elem.textContent = this.hourlyCookies[j];
    bodyRow.appendChild(elem);
  }

  // now put the total for the store into the row
  var td = document.createElement('td');
  td.textContent = this.totalCookies;
  bodyRow.appendChild(td);

  this.tableRow = bodyRow;
};

Store.prototype.createCustTableData = function () {
  // when the cookie data was created, this data was, too.
  //  store table data created here (a row of data for the table)
  var bodyRow     = document.createElement('tr');

  // create the row header first, then load in the rest of the row data
  var rowName     = document.createElement('th');
  rowName.textContent = this.storeName;
  bodyRow.appendChild(rowName);

  this.totalCustForStore = 0;
  for (var j = 0; j < this.hourlyCustomers.length; j++) {
    var elem = document.createElement('td');
    elem.textContent = this.hourlyCustomers[j];
    bodyRow.appendChild(elem);
    this.totalCustForStore += this.hourlyCustomers[j];
  }

  // now put the total for the store into the row
  var td = document.createElement('td');
  td.textContent = this.totalCustForStore;
  bodyRow.appendChild(td);

  return bodyRow;
};
// ------------- THAT IS ALL THE STORE OBJECT STUFF

// ------------- Now a couple general functions
function clearFooterData() {
  // clear footer totals...
  for (var t = 0; t < footTotals.length; t++) {
    footTotals[t] = 0;
  }

  // clear the footer grand total, too.
  footGrandTotal = 0;
}

function populateTables() {
  // clear any totals to be used
  for (var s = 0; s < allStores.length; s++) {
    // for each store, reset total values, clear customer array data
    allStores[s].totalCookies = 0;
    allStores[s].hourlyCustomers = [];
  }

  clearFooterData();

  // create the table to hold the store cookie data
  var salesTable = document.createElement('table');
  createHdr(salesTable);

  var salesBody  = document.createElement('tbody');
  // now for each store, get it's data
  for (var m = 0; m < allStores.length; m++) {
    allStores[m].createCookieTableData();
    // put row of data into body
    salesBody.appendChild(allStores[m].tableRow);

    // while we are looping through the stores, generate hourly TOTALS
    for (var c = 0; c < allStores[m].hourlyCookies.length; c++){
      footTotals[c] += allStores[m].hourlyCookies[c];
    }
    footGrandTotal += allStores[m].totalCookies;
  }
  // put the body into the table
  salesTable.appendChild(salesBody);

  // add the footer
  createFtr(salesTable);

  var storeData = document.getElementById('store_data');
  storeData.appendChild(salesTable);

  // hope for the best!

  // ----------- another table of customer data, precursor to 'tossers'
  // create the table to hold the store customer data, it uses the same header data
  var custTable = document.createElement('table');
  createHdr(custTable);

  clearFooterData();

  var custBody  = document.createElement('tbody');
  for (var i = 0; i < allStores.length; i++) {
    custBody.appendChild(allStores[i].createCustTableData());
    //
    // while we are looping through the stores, generate hourly TOTALS
    for (var d = 0; d < allStores[i].hourlyCustomers.length; d++) {
      footTotals[d] += allStores[i].hourlyCustomers[d];
    }
    footGrandTotal += allStores[i].totalCustForStore;
  };

  custTable.appendChild(custBody);

  // add the footer
  createFtr(custTable);

  var storeCustData = document.getElementById('store_cust_data');

  storeCustData.appendChild(custTable);

}

// create the header and append it to the passed table
function createHdr(theTable) {
  // create table header here
  var hoursOpenArray = [];
  var hour = 0;
  var hourText = '';
  for (var h = 0; h < 14; h++) {
    hour = h + 6;
    if (hour > 12) {
      hourText = (hour - 12) + ':00 pm';
    } else if ( hour < 12) {
      hourText = hour + ':00 am';
    } else {
      hourText = hour + ':00 pm';
    };
    hoursOpenArray[h] = hourText;
  };

  var salesHeader = document.createElement('thead');
  var headerRow   = document.createElement('tr');
  var blankHdr    = document.createElement('th');
  // we need a blank column heading before adding the rest of the header data
  headerRow.appendChild(blankHdr);

  for (var i = 0; i < hoursOpenArray.length; i++) {
    var th = document.createElement('th');
    th.textContent = hoursOpenArray[i];
    headerRow.appendChild(th);
  }
  // we also need a final column for the total for the store
  // we will just re-use the blankHdr we have sitting around.
  var headerTotal = document.createElement('th');
  headerTotal.textContent = 'Total';
  headerRow.appendChild(headerTotal);

  salesHeader.appendChild(headerRow);
  theTable.appendChild(salesHeader);
};

// create the footer and append it to the passed table.
function createFtr (theTable) {
  // TODO: work the details out for the footer
  var salesFoot = document.createElement('tfoot');
  var footRow  = document.createElement('tr');
  var footHdr   = document.createElement('th');
  footHdr.textContent = 'TOTALS:';
  footRow.appendChild(footHdr);

  // load zeros in for totals for now.
  for (var f = 0; f < footTotals.length; f++) {
    var footData = document.createElement('td');
    footData.textContent = footTotals[f];
    footRow.appendChild(footData);
  };
  // add one more for the total column
  var tdTotal = document.createElement('td');
  tdTotal.textContent = footGrandTotal;
  footRow.appendChild(tdTotal);

  // put that footer row in the footer.
  salesFoot.appendChild(footRow);
  // and put the footer into the table.
  theTable.appendChild(salesFoot);
};
// ------------ Done with general functions

// Now run the 'controlling' script =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

// crate an array of all the stores
var allStores = [];

allStores.push(new Store('1st and Pike', 23, 65, 6.3));
allStores.push(new Store('SeaTac Airport', 3, 24, 1.2));
allStores.push(new Store('Seattle Center', 11, 28, 3.7));
allStores.push(new Store('Capitol Hill', 20, 38, 2.3));
allStores.push(new Store('Alki', 2, 16, 4.6));

// call new populate tables function...
// these two variables below are used when creating the footer, but populated
// as each store is processed.
var footTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var footGrandTotal = 0;

populateTables();


// ================ Adding a store: can only happen after the sales page is loaded
var addStoreForm = document.getElementById('add_store_form');

//add listener
addStoreForm.addEventListener('submit', handleSubmit);

// and the handler function
function handleSubmit() {
  event.preventDefault();

  console.log('event target passed to submit', event.target);

  // we could use some validation of the input here.... before we act on it
  // call the validation function...
  var isValid = validateAddStore(event.target);

  if (isValid) {
    var newStoreName  = event.target.store_name.value;
    var newMinNumCust = parseInt(event.target.min_num_cust.value);
    var newMaxNumCust = parseInt(event.target.max_num_cust.value);
    var newAvgCookies = parseFloat(event.target.avg_cookies_purch.value);

    var newStore = new Store(newStoreName, newMinNumCust, newMaxNumCust, newAvgCookies);

    console.log('added new store:', newStore);

    allStores.push(newStore);

    event.target.store_name.value = null;
    event.target.min_num_cust.value = null;
    event.target.max_num_cust.value = null;
    event.target.avg_cookies_purch.value = null;

    // now refresh the tables
    clearAndRefresh();

  } else {
    // there was some validation error...
    console.log('Found an error validating input!', newStore);
    alert('Input Data Error!! Please correct.');
  };

};

function validateAddStore(formInput) {
  // validate the inputs for adding a storej
  console.log('Validating input',formInput);
  var inputValid = true;

  // grab the input data
  var inputStoreName  = formInput.store_name.value;
  var inputMinNumCust = formInput.min_num_cust.value;
  var inputMaxNumCust = formInput.max_num_cust.value;
  var inputAvgCookies = formInput.avg_cookies_purch.value;

  if (inputStoreName.length < 1) {
    console.log('No Store Name', formInput);
    alert('Store Name Missing.');
    inputValid = false;
  }

  if (inputMinNumCust.length < 1) {
    console.log('No Minimum customer data', formInput);
    alert('Minimum Customer per hour Missing.');
    inputValid = false;
  } else if (isNaN(parseInt(inputMinNumCust))) {
    // not numeric input
    console.log('Minimum customer data was not numeric', formInput);
    alert('Minimum Customer per hour was not numeric.');
    inputValid = false;
  }

  if (inputMaxNumCust.length < 1) {
    console.log('No Maximum customer data', formInput);
    alert('Maximum Customer per hour Missing.');
    inputValid = false;
  } else if (isNaN(parseInt(inputMaxNumCust))) {
    // not numeric input
    console.log('Maximum customer data was not numeric', formInput);
    alert('Maximum Customer per hour was not numeric.');
    inputValid = false;
  }

  if (inputAvgCookies.length < 1) {
    console.log('No Average Cookie data', formInput);
    alert('Average Cookies per customer Missing.');
    inputValid = false;
  } else if (isNaN(parseFloat(inputAvgCookies))) {
    // not numeric input
    console.log('Average Cookie data was not numeric', formInput);
    alert('Average Cookies per customer was not numeric.');
    inputValid = false;
  }

  return inputValid;
}

function clearAndRefresh() {
  // clear the tables and refresh with any new stores...
  var table1 = document.getElementById('store_data');
  table1.textContent = '';

  var table2 = document.getElementById('store_cust_data');
  table2.textContent = '';

  // they are cleared out, now recreate the data.
  // call a populate tables function here (and in the original call)
  populateTables();

}
