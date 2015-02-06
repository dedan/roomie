
Template.home.events({
  'submit .new-offer': function (event) {

    var url = event.target.url.value
    var offerId = Offers.insert({
      createdAt: new Date(),
      ready: false,
      email: event.target.email.value,
      secret: Math.random().toString(36).substring(7)
    });
    Session.set('offerId', offerId)

    var data = {offerId: offerId, url: url }
    Meteor.call("extractFromCraigslist", data, function(error, results) {
      console.log('finished extract', error, results);
    });

    return false;
  }
});

Template.home.helpers({
  offer: function () {
    return Offers.findOne({_id: Session.get('offerId')})
  }
})

