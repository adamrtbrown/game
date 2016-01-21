class UserRepository {
  constructor(){
    this._provider = null;
  }
  provider() {
    if (null === this_provider) {
      throw "UserRepository: User provider not defined."
    }
    return this._provider;
  }
  setProvider(new_provider) {
    this._provider = new_provider;
  }
}
export default UserRepository