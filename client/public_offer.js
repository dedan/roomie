Template.publicOffer.events({
  'click .fb-button': function (event) {
    Meteor.loginWithFacebook({}, function(err){
      if(err) {
        console.log('errooooooor');
      }
    });
    return false;
  },
  'submit .new-request': function (event) {

    var requestId = Requests.insert({
      subject: event.target.subject.value,
      text: event.target.text.value,
      offerId: this.offer._id,
      userId: Meteor.user()._id
    })
    Session.set('requestId', requestId)

    return false;
  }

})

Template.publicOffer.helpers({
  request: function () {
    return Requests.findOne({_id: Session.get('requestId')})
  },
  user: function () {
    return Meteor.user()
  },
  disabled: function () {
    return Meteor.user() ? '' : 'disabled'
  }
})