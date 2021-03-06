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
var PS = require('pg-promise').PreparedStatemen
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
    console.log("DATA::VERIFYUSER::" + email);
    var sql = 'select * from users where email=' + asMyQuote(email);
    console.log("DATA::GETDATA::SQL-" + sql + " ON CONNECTION::" + JSON.stringify(db));
    db.any(sql)
        .then(function (data) {
            console.log("DATA::VERIFYUSERS::ROWS-" + JSON.stringify(data));
            //resolve(rows)
            cb(data);
        })
        .catch(function (error) {
            console.log("DATA::VERIFYUSER::ERROR-" + JSON.stringify(error));
            cb(error);
            // error;
        });
}

exports.getEventers = getEventers;
function getEventers(tier, cb) {
    console.log("DATA::GETEVENTERS::PARAMETER" + tier);
    var sql = "select c.pk_id_competitor, r.ridername, r.pic, h.horsename, c.eventtier "
        // var sql = "select h.horsename as value, r.ridername as label "
        + "from competitors c "
        + "join riders r on c.fk_rider=r.pk_id_rider "
        + "join horses h on c.fk_horse=h.pk_id_horse "
        + "where eventtier=" + tier
    console.log("DATA::GETEVENTERS::SQL-" + sql + " ON CONNECTION::" + JSON.stringify(db));
    db.any(sql)
        .then(function (data) {
            console.log("DATA::GETEVENTERS::ROWS-" + JSON.stringify(data));
            //resolve(rows)
            cb(data);
        })
        .catch(function (error) {
            console.log("DATA::GETEVENTERS::ERROR-" + JSON.stringify(error));
            cb(error);
            // error;
        });
}

exports.submitEventTeam = submitEventTeam;
function submitEventTeam(userId, teamName, cb) {
    console.log("DATA::SUBMITEVENTTEAM::PARAMETER::USERID", userId);
    console.log("DATA::SUBMITEVENTTEAM::PARAMETER::TEAMNAME", teamName);

    var sql = "Insert into eventteams (fk_userid,etname) values (" + userId + "," + asMyQuote(teamName) + ");"
    console.log("DATA::INSERTEAMNAME::SQL-" + sql + " ON CONNECTION::" + JSON.stringify(db));
    db.any(sql)
        .then(function (data) {
            console.log("DATA::INSERTTEAMNAME::SUCCESS");
            //resolve(rows)
            cb('SUCCESS');
        })
        .catch(function (error) {
            console.log("DATA::INSERTEAMNAME::ERROR" + JSON.stringify(error));
            cb(error);
            // error;
        });
}

// exports.submitEventTeam = submitEventTeam;
// function submitEventTeam(userId, teamName, cb) {
//     console.log("DATA::SUBMITEVENTTEAM::PARAMETER::USERID", userId);
//     console.log("DATA::SUBMITEVENTTEAM::PARAMETER::TEAMNAME", teamName);

//     var addTeam = new PS('add-team', "Insert into eventteams (fk_userid,etname) values (" 
//     + userId + "," + asMyQuote(teamName) 
//     + ") returning pk_id_eventteam where not exists (select fk_userid from eventteams where fk_userid="+ userId +";");

//     db.none(addTeam)
//     .then(()=> {
//         console.log("DATA::TEAMADDED::SUCCESS");
//     })
//     .catch(error=> {
//         console.log("DATA::TEAMADDED:ERROR::",error);
//     });

// }









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