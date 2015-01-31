function convertToSlug(text)
{
    return text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}


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
