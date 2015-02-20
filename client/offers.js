

Template.offerRequest.events({
  'submit .offer-request-new-message': function (event) {
    console.log(event.target.message.value);

    Messages.insert({
      text: event.target.message.value,
      requestId: this.request._id,
      userId: Meteor.user()._id
    })

    event.target.message.value = ''

    return false;
  }
})