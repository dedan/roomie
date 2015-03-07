Template.publicOffer.events({
  'submit .new-request': function (event) {

    var user = Meteor.user()

    var requestId = Requests.insert({
      subject: event.target.subject.value,
      text: event.target.text.value,
      offerId: this.offer._id,
      userName: user.profile.name,
      userPicture: user.profile.picture,
      userId: user._id,
      offerTitle: this.offer.title
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