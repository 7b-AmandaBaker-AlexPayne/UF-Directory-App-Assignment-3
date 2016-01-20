/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  /* your code here */
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  coordinates: {
    latitude: Number,   // must be a real latitude value
    longitude: Number   // must be a real longitude value
  },
  address: String
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
  /* your code here */
  var currentDate = new Date();

  this.updated_at = currentDate;

  if ( !this.created_at )
    this.created_at = currentDate;

  next ();
});

/* Use your schema to instantiate a Mongoose model */

/*listingSchema.save() {
  if (coordinates && address) {
    var newEntry = new Listing ({
      code: code,
      name: name,
      coordinates: {
        latitude: latitude,
        longitude: longitude
      },
      address: address
    });
  }
  else if (entries[i].coordinates) {
    var newEntry = new Listing({
      code: code,
      name: name,
      coordinates: {
        latitude: oordinates.latitude,
        longitude: coordinates.longitude
      }
    });
  }
  else if (entries[i].address) {
    var newEntry = new Listing ({
      code: code,
      name: name,
      address: address
    });
  }
  else {
    var newEntry = new Listing ({
      code: code,
      name: name
    })
  }
  console.log('almost saved');
  newEntry.save();
  console.log('saved');
}
*/

var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
