
var offerId;

Meteor.startup(function () {
  offerId = Offers.insert({
    createdAt: new Date(),
    processing: true,
    filled: false,
    secret: Math.random().toString(36).substring(7)
  });
})


Template.home.events({
  'submit .new-offer': function (event) {
    // increment the counter when button is clicked
    console.log('clicked', event.target.url.value);
    var url = event.target.url.value

    Offers.update(offerId, {$set: {
      email: event.target.email.value,
      filled: true
    }});;


    var data = {
      objectId: offerId,
      url: url
    }
    Meteor.call("checkTwitter", data, function(error, results) {
        console.log(results); //results.data should be a JSON object
    });


    return false;
  }
});

Template.home.helpers({
  offer: function () {
    console.log('helper', offerId);
    return Offers.findOne({_id: offerId})
  }
})
