'use strict';

// script for sales tools page

// Store object constructor
function Store (name, min, max, avg) {
  this.storeName = name;
  this.minCust = min;
  this.maxCust = max;
  this.avgCookiesPurchased = avg;
  this.totalCookies = 0;
  this.hourlyCookies = [];
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

Store.prototype.displayOnPage = function () {
  // generate html to display data on the page.
  this.cookiesPerDay();
  var h2 = document.createElement('h2');
  var ul = document.createElement('ul');
  var liOut = document.createElement('li');
  var liIn = [];
  var main = document.getElementById('store_data');

  h2.textContent = this.storeName;
  ul.appendChild(h2);

  var hour = 0;
  var hourText = '';
  for (var k = 0; k < this.hourlyCookies.length; k++) {
    liIn[k] = document.createElement('li');
    hour = k + 7;
    if (hour > 12) {
      hourText = (hour - 12) + ' pm: ';
    } else if ( hour < 12) {
      hourText = hour + ' am: ';
    } else {
      hourText = hour + ' pm: ';
    }
    liIn[k].textContent = hourText + this.hourlyCookies[k];
    ul.appendChild(liIn[k]);
  }
  liOut.textContent = 'Total: ' + this.totalCookies;
  ul.appendChild(liOut);

  main.appendChild(ul);
};

// firstAndPike Store object
var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seaCtr = new Store('Seattle Center', 11, 28, 3.7);
var capHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

firstAndPike.displayOnPage();
seaTac.displayOnPage();
seaCtr.displayOnPage();
capHill.displayOnPage();
alki.displayOnPage();
