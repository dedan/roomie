Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('home');
});

Offers = new Mongo.Collection("offers");


if (Meteor.isClient) {

  Template.home.events({
    'submit .new-offer': function (event) {
      // increment the counter when button is clicked
      console.log('clicked', event.target.url.value);
      var url = event.target.url.value

      var o = Offers.insert({
        id: 1,
        listingUrl: url,
        createdAt: new Date()
      });

      var data = {
        objectId: o,
        url: url
      }
      Meteor.call("checkTwitter", data, function(error, results) {
          console.log(results.content); //results.data should be a JSON object
      });


      return false;
    }
  });

  Template.home.helpers({
    offer: function () {
      var a = Offers.findOne({id: 1})
      console.log(a);
      return a
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    Meteor.methods({
        checkTwitter: function (data) {
            console.log('got called with', data);
            this.unblock();
            Offers.update(data.objectId, {$set: {text: 'extracting'}});
            var $ = cheerio.load(Meteor.http.get(data.url).content);
            return Offers.update(data.objectId, {$set: {title: $('h2.postingtitle').text()}});;
        }
    });

  });
}
