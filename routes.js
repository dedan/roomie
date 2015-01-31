// https://sfbay.craigslist.org/sfc/roo/4863699604.html

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('home');
});

