const assert = require('assert');
const User = require('../src/user');
describe('Updating records', () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: 'Joe', likes: 5 });
    joe.save().then(() => done());
  });
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Ping');
        done();
      });
  }
  it('instance type using set and save', done => {
    joe.set('name', 'Ping');
    assertName(joe.save(), done);
  });
  it('A model instance can update', done => {
    assertName(joe.update({ name: 'Ping' }), done);
  });
  it('A model class can update', done => {
    assertName(User.update({ name: 'Joe' }, { name: 'Ping' }), done);
  });
  it('A model class can update one record', done => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Ping' }), done);
  });
  it('A model class can find an recoed with and Id and Update', done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Ping' }), done);
  });
  it('A user can have their postcount incremented by 1', done => {
    User.update({ name: 'Joe' }, { $inc: { likes: 5 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.likes === 10);
        done();
      });
  });
});
