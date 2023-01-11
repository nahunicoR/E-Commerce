//Librerías para cloudinary


const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT || 3001;



// Create Date: december 8, 2022
// Author: Alejandro Téllez



// Syncing all the models at once.

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
