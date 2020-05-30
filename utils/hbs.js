const hbs = require('hbs')

hbs.registerHelper('constructRedirect', function() {
  return `/dashboard/${this._id}`
});
