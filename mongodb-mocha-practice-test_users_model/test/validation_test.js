const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {
  // beforeEach(done => {
  //   done();
  // });
  it('requires a user name', done => {
    const user = new User({ name: undefined });
    // const validationResult = user.validateSync();
    user.validate(validationResult => {
      assert(validationResult.errors.name.message === 'Name is required.');
      done();
    });
  });
  it("requires a user's name longer than 2 characters", done => {
    const user = new User({ name: 'ha' });
    user.validate(validationResult => {
      assert(
        validationResult.errors.name.message ===
          'Name must be longer than 2 characters.'
      );
      done();
    });
  });
  it('disallows invalid records from being saved', done => {
    const user = new User({ name: 'Al' });
    user.save().catch(validationResult => {
      assert(
        validationResult.errors.name.message ===
          'Name must be longer than 2 characters.'
      );
    });
    done();
  });
});
