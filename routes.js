// https://sfbay.craigslist.org/sfc/roo/4896566436.html

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('landing');
});

Router.route('/my/offers', function () {
  this.render('offers', {
    data: function () {
      return {
        offers: Offers.find({userId: Meteor.user()._id})
      }
    }
  })
})

Router.route('/my/offers/:_id', function () {
  this.render('offer', {
    data: function () {
      var offer = Offers.findOne({_id: this.params._id});
      var requests

      // TODO: find proper solution to wait before offer is ready
      if (offer) {
        requests = Requests.find({offerId: offer._id})
      }
      return {
        offer: offer,
        requests: requests
      }
    }
  });
});

Router.route('/my/offers/:offerId/request/:requestId', function () {
  this.render('offerRequest', {
    data: function () {
      var offer, request, messages;

      offer = Offers.findOne({_id: this.params.offerId});
      if (offer) {
        request = Requests.findOne({_id: this.params.requestId})
      }

      if (request) {
        messages = Messages.find({requestId: request._id})
      }

      return {
        offer: offer,
        request: request,
        messages: messages
      }
    }
  })
})

Router.route('/offers/:_slug', function () {
  this.render('publicOffer', {
    data: function () {
      return {offer: Offers.findOne({slug: this.params._slug})}
    }
  })
})

Router.route('/my/requests', function () {
  this.render('requests', {
    data: function () {
      var userId = Meteor.user() ? Meteor.user()._id : null
      return {requests: Requests.find({userId: userId})}
    }
  })
})

Router.route('/my/requests/:requestId', function () {
  this.render('request', {
    data: function () {
      return {
        request: Requests.findOne({_id: this.params.requestId}),
        messages: Messages.find({requestId: this.params.requestId})
      }
    }
  })
})
