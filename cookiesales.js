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
}

// creating object functions and putting them on the prototype
Store.prototype.getRandomNum = function () {
  // this generates a random number between the min and max values.
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
};

Store.prototype.cookiesPerHour = function () {
  // calculates a random number average of cookies purchased
  return this.getRandomNum() * this.avgCookiesPurchased;
};

Store.prototype.cookiesPerDay = function () {
  // caclulates total cookes per day based on the random average of cookies per hour
  for (var j = 0; j < 14; j++) {
    this.hourlyCookies[j] = Math.round(this.cookiesPerHour());
    this.totalCookies += this.hourlyCookies[j];
  };
};

Store.prototype.createTableData = function () {
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


var allStores = [];

var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seaCtr = new Store('Seattle Center', 11, 28, 3.7);
var capHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

allStores[0] = firstAndPike;
allStores[1] = seaTac;
allStores[2] = seaCtr;
allStores[3] = capHill;
allStores[4] = alki;

// create table header here
// create the table to hold that data just created
var salesTable = document.createElement('table');

// create Header data here
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
salesTable.appendChild(salesHeader);

var salesBody   = document.createElement('tbody');
var footTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var footGrandTotal = 0;
// now for each store, get it's data
for (var m = 0; m < allStores.length; m++) {
  allStores[m].createTableData();
  // put row of data into body
  salesBody.appendChild(allStores[m].tableRow);

  // while we are looping through the stores, generate TOTALS
  for (var c = 0; c < allStores[m].hourlyCookies.length; c++){
    footTotals[c] += allStores[m].hourlyCookies[c];
  }
  footGrandTotal += allStores[m].totalCookies;
}
// put the body into the table
salesTable.appendChild(salesBody);

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
salesTable.appendChild(salesFoot);

var storeData = document.getElementById('store_data');
storeData.appendChild(salesTable);

// hope for the best!
