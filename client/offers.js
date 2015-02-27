

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


Template.offer.events({
  'click .request-link': function (event) {
    Session.set('showRequest', this);
    console.log('showRequest', this);
  },
  'click .next-button': function (event) {
    var requests = this.requests,
        requestIds = this.requests.map(function (o) {return o._id}),
        currentRequestId = Session.get('showRequest')._id,
        currentIndex = _.indexOf(requestIds, currentRequestId);
    Session.set('showRequest', requests[currentIndex + 1])
  },
  'click .prev-button': function (event) {
    var requests = this.requests,
        requestIds = this.requests.map(function (o) {return o._id}),
        currentRequestId = Session.get('showRequest')._id,
        currentIndex = _.indexOf(requestIds, currentRequestId);
    Session.set('showRequest', requests[currentIndex - 1])
  }
})

Template.offer.helpers({
  showRequest: function () {
    return Session.get('showRequest')
  }
})