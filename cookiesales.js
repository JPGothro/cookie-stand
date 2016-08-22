'use strict';

// script for sales tools
// firstAndPike Store object
var firstAndPike = {
  storeName: '1st and Pike',
  minCust: 23,
  maxCust: 65,
  avgCookiesPurchased: 6.3,
  hourlyCookies: [],
  totalCookies: 0,
  getRandomNum: function () {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  cookiesPerHour: function() {
    return this.getRandomNum() * this.avgCookiesPurchased;
  },
  cookiesPerDay: function() {
    for (var j = 0; j < 16; j++) {
      this.hourlyCookies[j] = Math.round(this.cookiesPerHour());
      this.totalCookies += this.hourlyCookies[j];
    }
  },
  displayOnPage: function() {
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
      hour = k + 6;
      if (hour > 12) {
        hourText = (hour - 12) + 'pm: ';
      } else {
        hourText = hour + 'am: ';
      }
      liIn[k].textContent = hourText + this.hourlyCookies[k];
      ul.appendChild(liIn[k]);
    }
    liOut.textContent = 'Total: ' + this.totalCookies;
    ul.appendChild(liOut);

    main.appendChild(ul);
  }
};

firstAndPike.cookiesPerDay();
firstAndPike.displayOnPage();

// SeaTac Airport Store object
var seaTac = {
  storeName: 'SeaTac Airport',
  minCust: 3,
  maxCust: 24,
  avgCookiesPurchased: 1.2,
  hourlyCookies: [],
  totalCookies: 0,
  getRandomNum: function () {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  cookiesPerHour: function() {
    return this.getRandomNum() * this.avgCookiesPurchased;
  },
  cookiesPerDay: function() {
    for (var j = 0; j < 16; j++) {
      this.hourlyCookies[j] = Math.round(this.cookiesPerHour());
      this.totalCookies += this.hourlyCookies[j];
    }
  },
  displayOnPage: function() {
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
      hour = k + 6;
      if (hour > 12) {
        hourText = (hour - 12) + 'pm: ';
      } else {
        hourText = hour + 'am: ';
      }
      liIn[k].textContent = hourText + this.hourlyCookies[k];
      ul.appendChild(liIn[k]);
    }
    liOut.textContent = 'Total: ' + this.totalCookies;
    ul.appendChild(liOut);

    main.appendChild(ul);
  }
};

seaTac.cookiesPerDay();
seaTac.displayOnPage();

// Seattle Center Store object
var seaCtr = {
  storeName: 'Seattle Center',
  minCust: 11,
  maxCust: 28,
  avgCookiesPurchased: 3.7,
  hourlyCookies: [],
  totalCookies: 0,
  getRandomNum: function () {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  cookiesPerHour: function() {
    return this.getRandomNum() * this.avgCookiesPurchased;
  },
  cookiesPerDay: function() {
    for (var j = 0; j < 16; j++) {
      this.hourlyCookies[j] = Math.round(this.cookiesPerHour());
      this.totalCookies += this.hourlyCookies[j];
    }
  },
  displayOnPage: function() {
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
      hour = k + 6;
      if (hour > 12) {
        hourText = (hour - 12) + 'pm: ';
      } else {
        hourText = hour + 'am: ';
      }
      liIn[k].textContent = hourText + this.hourlyCookies[k];
      ul.appendChild(liIn[k]);
    }
    liOut.textContent = 'Total: ' + this.totalCookies;
    ul.appendChild(liOut);

    main.appendChild(ul);
  }
};

seaCtr.cookiesPerDay();
seaCtr.displayOnPage();

// Capitol Hill Airport Store object
var capHill = {
  storeName: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCookiesPurchased: 2.3,
  hourlyCookies: [],
  totalCookies: 0,
  getRandomNum: function () {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  cookiesPerHour: function() {
    return this.getRandomNum() * this.avgCookiesPurchased;
  },
  cookiesPerDay: function() {
    for (var j = 0; j < 16; j++) {
      this.hourlyCookies[j] = Math.round(this.cookiesPerHour());
      this.totalCookies += this.hourlyCookies[j];
    }
  },
  displayOnPage: function() {
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
      hour = k + 6;
      if (hour > 12) {
        hourText = (hour - 12) + 'pm: ';
      } else {
        hourText = hour + 'am: ';
      }
      liIn[k].textContent = hourText + this.hourlyCookies[k];
      ul.appendChild(liIn[k]);
    }
    liOut.textContent = 'Total: ' + this.totalCookies;
    ul.appendChild(liOut);

    main.appendChild(ul);
  }
};

capHill.cookiesPerDay();
capHill.displayOnPage();

// Alki Store object
var alki = {
  storeName: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCookiesPurchased: 4.6,
  hourlyCookies: [],
  totalCookies: 0,
  getRandomNum: function () {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  cookiesPerHour: function() {
    return this.getRandomNum() * this.avgCookiesPurchased;
  },
  cookiesPerDay: function() {
    for (var j = 0; j < 16; j++) {
      this.hourlyCookies[j] = Math.round(this.cookiesPerHour());
      this.totalCookies += this.hourlyCookies[j];
    }
  },
  displayOnPage: function() {
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
      hour = k + 6;
      if (hour > 12) {
        hourText = (hour - 12) + 'pm: ';
      } else {
        hourText = hour + 'am: ';
      }
      liIn[k].textContent = hourText + this.hourlyCookies[k];
      ul.appendChild(liIn[k]);
    }
    liOut.textContent = 'Total: ' + this.totalCookies;
    ul.appendChild(liOut);

    main.appendChild(ul);
  }
};

alki.cookiesPerDay();
alki.displayOnPage();
