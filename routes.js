// https://sfbay.craigslist.org/sfc/roo/4863699604.html

Router.configure({
  layoutTemplate: 'ApplicationLayout',
  data: {
    user: function () {
      return Meteor.user()
    }
  }
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/offers/secret/:_secret', function () {
  this.render('offer', {
    data: function () {
      var offer = Offers.findOne({secret: this.params._secret});
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

Router.route('/offers/:_slug', function () {
  this.render('publicOffer', {
    data: function () {
      return {offer: Offers.findOne({slug: this.params._slug})}
    }
  })
})

Router.route('/requests', function () {
  this.render('requests', {
    data: function () {
      var userId = Meteor.user() ? Meteor.user()._id : null
      return {requests: Requests.find({userId: userId})}
    }
  })
})