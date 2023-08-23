const bcrypt = require('bcrypt');

module.exports = users = [{
  name: "Linnet",
  email: "lrunsey0@techcrunch.com",
  password: bcrypt.hashSync('password', 10)
}, {
  name: "Henrik",
  email: "hsharples1@blogs.com",
  password: bcrypt.hashSync('password', 10)
}, {
  name: "Rhett",
  email: "rilyunin2@nbcnews.com",
  password: bcrypt.hashSync('password', 10)
}, {
  name: "Sebastian",
  email: "seba@seba.com",
  password: bcrypt.hashSync('password', 10)
}, {
  name: "Poul",
  email: "psokale4@marriott.com",
  password: bcrypt.hashSync('password', 10)
}, {
  name: "Carley",
  email: "cryves5@shareasale.com",
  password: bcrypt.hashSync('password', 10)
}, {
  name: "Ganny",
  email: "gklimp6@eventbrite.com",
  password: bcrypt.hashSync('password', 10)
}, {
  name: "Bobby",
  email: "bluca7@shutterfly.com",
  password: bcrypt.hashSync('password', 10)
}, {
  name: "Warner",
  email: "wmcewen8@mac.com",
  password: bcrypt.hashSync('password', 10)
}, {
  name: "Eveline",
  email: "edarrigoe9@ft.com",
  password: bcrypt.hashSync('password', 10)
}]