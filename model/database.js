var squel = require("squel");
var query = require('pg-query');
var when = require('when');
// var options = {
//     // global event notification;
//     error: function (error, e) {
//         if (e.cn) {
//             // A connection-related error;
//             //
//             // Connections are reported back with the password hashed,
//             // for safe errors logging, without exposing passwords.
//             console.log("CN:", e.cn);
//             console.log("EVENT:", error.message || error);
//         }
//     }
// };
//var pg = require('pg');
var pgp = require('pg-promise')();
var db = pgp('postgres://postgres:password1@localhost:5432/fedb');

// db.connect()
//     .then(function (obj) {
//         obj.done(); // success, release the connection;
//     })
//     .catch(function (error) {
//         console.log("ERROR:", error.message || error);
//     });
//const pg = require('pg');
//const conString = process.env.DATABASE_URL || 'postgres://postgres:password1@localhost:5432/fedb';


function asMyQuote(input) {
    return '\'' + input + '\'';
}



exports.verifyUser = verifyUser;
function verifyUser(email, cb) {
    console.log("DATA::VERIFYUSER::"+email);
    var sql = 'select * from users where email='+ asMyQuote(email);
    console.log("DATA::GETDATA::SQL-"+sql+ " ON CONNECTION::"+JSON.stringify(db));
   db.any(sql)
        .then(function (data) {
            console.log("DATA::GETDATA::ROWS-" + JSON.stringify(data));
            //resolve(rows)
            cb(data);
        })
        .catch(function (error) {
            console.log("DATA::VERIFYUSER::ERROR-"+JSON.stringify(error));
            cb(error);
            // error;
        });
}









// exports.verifyUser = verifyUser;
// function verifyUser(email, cb) {    
//     var sql = "select * from users where email = " + asMyQuote(email);
//     console.log(sql);
//     getData(sql, cb);
// }


// function getData(sql, cb) {
//     // Run SQL and pass results to callback
//     console.log("DATA::GET::START")
//     var p = new Promise(function (resolve, reject) {
//             db.query(sql, function (err, rows) {
//                 if (err) {
//                     console.log("DATA::GETDATA::ERROR-"+JSON.stringify(err));
//                     reject(err);
//                     return;
//                 }
//                 console.log("DATA::GETDATA::ROWS-" + JSON.stringify(rows));
//                 resolve(rows)
//             })
//     });

//     p.then(
//         (data) => {
//             console.log("DATA::GETDATA::DATARETURN-"+JSON.stringify(data));
//             cb(data);
//         },
//         (err) => {
//             console.log("DATA::GETDATA::DATAERR-"+JSON.stringify(err));
//             cb(err);
//         }
//     );
// }




// var getUser = squel.select()
//   .from('users')
//   .field(pk_id_user)
//   .field(firstname)
//   .field(lastname)
//   .field(email)
//   .where('email=?', email)

//   var getUserQuery = query(getUser);

//   var promise = query(getUserQuery);
//   function onSuccess(rows, result){

//   }
//   function onError(error) {

//   }
//   promise.spread(onSuccess, onError);





// pg.connect(conString, function (err, client, done) {  
//   if (err) {
//     return console.error('error fetching client from pool', err)
//   }
//   client.query('SELECT * from users AS my_first_query', function (err, result) {
//     done()

//     if (err) {
//       return console.error('error happened during query', err)
//     } else if (!result.rows.lenght) {
//       console.log("User table empty");
//       process.exit(0);
//     } else if (!result.rows[0].email) {
//       console.log("User table empty2");
//       process.exit(0);
//     }
//     console.log(result.rows[0])
//     process.exit(0)
//   })
// })