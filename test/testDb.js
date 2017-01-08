//mocha tests for DB layer
var db = require('../model/database.js');

var chai = require('chai');
var expect = require("chai").expect;
chai.should();

var assert = chai.assert;

describe('Test DB Connection', function () {

    // describe('positive control, test nothing', function () {
    //     it('should pass', function () {
    //         assert.isTrue(true);
    //     });
    // });

    describe('query should return record', function () {
        it('should show a user record', function (done) {
            var email = 'dnbr2002@yahoo.com';
            db.verifyUser(email, function (res, err) {
                if (res) {
                    console.log(JSON.stringify(res));
                    res.should.have.length(1);

                    return done(res);
                }
                console.log(JSON.stringify(err));
                done(err);
            });
        });
    });

    describe('query should fail', function () {
        it('shouldnt take the integer', function (done) {
            var email = 1;
            db.verifyUser(email, function (res, err) {
                if (res) {
                    console.log(JSON.stringify(res));
                    res.should.have.length(1);
                    return done(res);
                }
                console.log(JSON.stringify(err));
                done();
            });
        });
    });

});


