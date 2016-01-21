import UserRepository from './user_repository';
class User {
  constuctor() {
    this._user_repo = null;
  }
  user_repo() {
    if (null === this._user_repo) {
      this._user_repo = new UserRepository();
    }
    return _user_repo;
  }
  setUserRepo(new_repo) {
    this._user_repo = new_repo;
  }
  setProvider(new_provider) {
    user_repo.setProvider(new_provider);
  }
}
export default User