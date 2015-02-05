function convertToSlug(text) {
  return text
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'');
}


Meteor.startup(function () {

  if (ServiceConfiguration.configurations.find({service: 'facebook'}).count()===0) {
    ServiceConfiguration.configurations.insert({
      service: "facebook",
      appId: "1566397356980208",
      secret: "7be7b95ca8187f45792b77e97bb88c2a"
    });
  }

Accounts.onCreateUser(function(options,user) {
  check(options, Object);
  check(user, Object);

  options.profile.email = user.services.facebook.email;
  options.profile.facebookId = user.services.facebook.id;
  options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
  user.profile = options.profile;

  user.profile = options.profile;

  return user;
});


  Meteor.methods({
      extractFromCraigslist: function (data) {
          this.unblock();
          var $ = cheerio.load(Meteor.http.get(data.url).content);
          var title = $('h2.postingtitle').text().trim()
          var update_data = {
            title: title,
            slug: convertToSlug(title),
            ready: true
          }
          return Offers.update(data.offerId, {$set: update_data});;
      }
  });

});
