const pg = require('pg');
const conString = process.env.DATABASE_URL || 'postgres://postgres:password1@localhost:5432/fedb';

pg.connect(conString, function (err, client, done) {  
  if (err) {
    return console.error('error fetching client from pool', err)
  }
  client.query('SELECT * from users AS my_first_query', function (err, result) {
    done()

    if (err) {
      return console.error('error happened during query', err)
    } else if (!result.rows.lenght) {
      console.log("User table empty");
      process.exit(0);
    } else if (!result.rows[0].email) {
      console.log("User table empty2");
      process.exit(0);
    }
    console.log(result.rows[0])
    process.exit(0)
  })
})