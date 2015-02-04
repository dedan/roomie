function convertToSlug(text) {
  return text
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'');
}


Meteor.startup(function () {

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
