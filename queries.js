/* Fill out these functions using Mongoose queries*/

var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config.js');
    
mongoose.connect(config.db.uri);

var findLibraryWest = function() {
  Listing.find({ name: "Library West" }, function(err, libWestdata) {
    if (err) throw err;
    if (libWestdata) {
      console.log('\nLibrary West Information: \n');
      printListing(libWestdata[0]);
    }
    else {
      console.log('\nNo listing for Library West!\n\n');
    }
  });
};

var removeCable = function() {
  var cable;
  Listing.find( { code: "CABL" }, function (err, data) {
    cable = data;  
  });
  Listing.findOneAndRemove( { code: "CABL" }, function(err, data) {
    if (err) throw err; 
    if (data) {
      console.log('\nDeleted the listing: \n');
      printListing(data);
    }
    else {
      console.log('\nCould not delete listing:');
      console.log('There is no listing with code \"CABL\" \n\n');
    }
  });
};

var updatePhelpsMemorial = function() {
  Listing.findOneAndUpdate( {name: "Phelps Laboratory"}, 
                            {address: "100 Phelps Lab P.O. Box 116350 Gainesville, FL  32611",
                             coordinates:  {
                               latitude: 29.621042,
                               longitude: -82.366337
                            }},
                            {'new': true }, 
                            function(err, phelps) {
    if (err) throw err;
    console.log("\nUpdated Phelps:\n");
    printListing(phelps);
  });
};

var retrieveAllListings = function() {
  Listing.find({}, function(err, allData) {
    if (err) throw err;
    console.log ("Retrieve All Listings: ");
    for (var i=0; i<allData.length; i++) {
      printListing(allData[i]);
    }
  });
};

var printListing = function(obj) {
  console.log("Code: " + obj.code);
  console.log("Name: " + obj.name);
  if (obj.coordinates) {
    console.log("Latitude: " + obj.coordinates.latitude);
    console.log("Longitude: " + obj.coordinates.longitude);
  }
  if (obj.address) {
    console.log("Address: " + obj.address);
  }
  console.log("Created On: " + obj.created_at);
  console.log("Updated On: " + obj.updated_at + "\n");
}

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();


