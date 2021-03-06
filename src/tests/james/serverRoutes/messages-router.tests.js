let tape = require('tape')
const _tape = require('tape-promise').default;
const test = _tape(tape)
const supertest = require("supertest");
const app = require("../../../app");



//GET ROUTES
test("route to homepage", t => {
    supertest(app)
        .get("/")
        .expect(200)
        .expect("content-type", "text/html; charset=utf-8")
        .end((err, res) => {
            t.error(err);
            t.end();
        });
});

//////////////////////////////// VALID INPUT TESTING //////////////////////////////////////


test("route to get all relationships where user and candidates like each other", t => {
    supertest(app)
        .get("/messages")
        .send({userId: 1})
        .expect(200)
        .expect("content-type", "application/json; charset=utf-8")
        .end((err, res) => {
            let actual = res.body.data
            let expected = [ { profile: { id: 2, userid: 2, firstname: 'Moris', lastname: 'Rafoul', gender: 'male', status: 'Single', bio: 'Teaching web-dev', job: 'Web-Developer', livingin: 'Haifa', primaryphoto: 'https://avatars0.githubusercontent.com/u/10247681?s=60&v=4', subphotos: [ 'https://avatars2.githubusercontent.com/u/51966598?s=60&v=4', 'https://avatars0.githubusercontent.com/u/10247681?s=60&v=4', 'https://avatars0.githubusercontent.com/u/10247681?s=60&v=4' ] } } ]
            t.deepEquals(actual, expected)
            t.error(err);
            t.end();
        });
});



test('get all messages when userId=1 and otherUserId=2', t => {
    supertest(router)
        .get("/messages/2")
        .send({userId: 1})
        .expect(200)
        .expect("content-type", "application/json; charset=utf-8")
        .end((err, res) => {
            let actual = res.body.data
            let expected = [ { id: 2, senderUserId: 1, recipUserId: 2, message: 'How\'s tricks?', timeAndDate: '2020-05-01T10:08:29.107Z' }, { id: 4, senderUserId: 2, recipUserId: 1, message: 'Howdee', timeAndDate: '2020-05-01T10:08:15.375Z' }, { id: 1, senderUserId: 1, recipUserId: 2, message: 'Hey there', timeAndDate: '2020-05-01T10:07:35.000Z' } ]
            t.deepEquals(actual, expected)
            t.error(err);
            t.end();
        });
});


test('Add messages when provided userId, recipUserId, message, timeAndDate',  t => {
     resetDatabase();
    supertest(router)
        .post('/messages')
        .send({ userId: 1, recipUserId: 2, message:"hi bitch", timeAndDate:new Date()})
        .expect(200)
        .expect("content-type", "application/json; charset=utf-8")
        .end((err, res) => {
            let actual = res.body.data
            let expected = {message: 'message add successfuly'}
            t.deepEquals(actual, expected)
            t.error(err);
            t.end();
        });
});