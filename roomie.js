// https://sfbay.craigslist.org/sfc/roo/4863699604.html

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('home');
});

Offers = new Mongo.Collection("offers");

function convertToSlug(text)
{
    return text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}

if (Meteor.isClient) {

  var offerId = Offers.insert({
    createdAt: new Date(),
    processing: true,
    filled: false,
    secret: Math.random().toString(36).substring(7)
  });


  Template.home.events({
    'submit .new-offer': function (event) {
      // increment the counter when button is clicked
      console.log('clicked', event.target.url.value);
      var url = event.target.url.value

      Offers.update(offerId, {$set: {
        email: event.target.email.value,
        filled: true
      }});;


      var data = {
        objectId: offerId,
        url: url
      }
      Meteor.call("checkTwitter", data, function(error, results) {
          console.log(results); //results.data should be a JSON object
      });


      return false;
    }
  });

  Template.home.helpers({
    offer: function () {
      console.log('helper', offerId);
      return Offers.findOne({_id: offerId})
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
            var title = $('h2.postingtitle').text().trim()
            var update_data = {
              title: title,
              slug: convertToSlug(title),
              processing: false
            }
            return Offers.update(data.objectId, {$set: update_data});;
        }
    });

  });
}
