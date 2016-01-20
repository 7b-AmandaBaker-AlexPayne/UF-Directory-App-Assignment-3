'use strict';
/*
   Import modules/files you may need to correctly run the script.
   Make sure to save your DB's uri in the config file, then import it with a require statement!
   */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config.js');
listingData = require('./listings.json');

/* Connect to your database */
mongoose.connect('mongodb://janedoe:janedoe@ds047315.mongolab.com:47315/software-engineering2');

/*
   Instantiate a mongoose model for each listing object in the JSON file,
   and then save it to your Mongo database
   */

var err, data, listingData, entries;

/*fs.readFile( 'listings.json', 'utf-8', function (err, data) {
  if (err) { return console.error(err); }
  listingData = JSON.parse(data);
  });
//var entires = listingData.entries;
*/
console.log(listingData);
entries = listingData.entries;
console.log(entries.length);


function fillData () {
  console.log('entered fillData()');
  for (var i = 0; i < entries.length; i++){
    if (entries[i].coordinates && entries[i].address) {
      var newEntry = new Listing ({
        code: entries[i].code,
        name: entries[i].name,
        coordinates: {
          latitude: entries[i].coordinates.latitude,
          longitude: entries[i].coordinates.longitude
        },
        address: entries[i].address
      });
    }
    else if (entries[i].coordinates) {
      var newEntry = new Listing({
        code: entries[i].code,
        name: entries[i].name,
        coordinates: {
          latitude: entries[i].coordinates.latitude,
          longitude: entries[i].coordinates.longitude
        }
      });
    }
    else if (entries[i].address) {
      var newEntry = new Listing ({
        code: entries[i].code,
        name: entries[i].name,
        address: entries[i].address
      });
    }
    else {
      var newEntry = new Listing ({
        code: entries[i].code,
        name: entries[i].name
      })
    }
    console.log('almost saved');
    newEntry.save();
    console.log('saved');
  }
};

fillData();

/*
   Once you've written + run the script, check out your MongoLab database to ensure that
   it saved everything correctly.
   */
