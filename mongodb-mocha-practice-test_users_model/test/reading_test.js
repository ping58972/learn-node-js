const assert = require('assert');
const User = require('../src/user');

describe('Reading uers out of the database', () => {
  let joe, maria, alex, zach;
  beforeEach(done => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });
    Promise.all([zach.save(), alex.save(), joe.save(), maria.save()]).then(
      () => {
        done();
      }
    );
  });
  it('finds all users with a name of joe', done => {
    User.find({ name: 'Joe' }).then(users => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });
  it('find a user with a particular id', done => {
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === 'Joe');
      done();
    });
  });
  it('can skip and limit the result set', done => {
    // skip(1): Alex, limit(2): Joe and Maria, not show Zach yet.
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(user[0].name === 'Joe');
        assert(user[1].name === 'Maria');
      });
    done();
  });
});
