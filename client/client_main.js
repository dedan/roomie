Template.layout.events({
  'click .fb-button': function (event) {
    Meteor.loginWithFacebook({}, function(err){
      if(err) {
        console.log('errooooooor');
      }
    });
    return false;
  }
})


Template.landing.events({
  'submit .new-offer': function (event) {

    var url = event.target.url.value
    var offerId = Offers.insert({
      createdAt: new Date(),
      ready: false,
      userId: Meteor.user()._id
    });
    Session.set('offerId', offerId)

    var data = {offerId: offerId, url: url }
    Meteor.call("extractFromCraigslist", data, function(error, results) {
      console.log('finished extract', error, results);
    });

    return false;
  }
});

Template.landing.helpers({
  offer: function () {
    return Offers.findOne({_id: Session.get('offerId')})
  }
})

