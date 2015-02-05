// https://sfbay.craigslist.org/sfc/roo/4863699604.html

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/offers/:_secret', function () {
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

