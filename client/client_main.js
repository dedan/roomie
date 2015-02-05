
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


Template.publicOffer.events({
  'submit .new-request': function (event) {

    var userId
    if (Meteor.user()) {
      userId = Meteor.user()._id
    } else {
      Meteor.loginWithFacebook({}, function(err){
        userId = Meteor.user()._id

      });
    }

    console.log('bla', userId);
    var requestId = Requests.insert({
      subject: event.target.subject.value,
      text: event.target.text.value,
      offerId: this.offer._id,
      userId: userId
    })
    Session.set('requestId', requestId)

    return false;
  }

})

Template.publicOffer.helpers({
  request: function () {
    return Requests.findOne({_id: Session.get('requestId')})
  }
})