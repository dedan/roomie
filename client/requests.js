
Template.request.events({
  'submit .request-new-message': function (event) {

    console.log('here');
    Messages.insert({
      text: event.target.message.value,
      requestId: this.request._id,
      userId: Meteor.user()._id
    })

    event.target.message.value = '';

    return false;
  }
})