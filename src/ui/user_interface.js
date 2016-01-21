import LoginUI from '../user/ui/login';

class UserInterface {
  constructor(config) {
    this.config = config;
  }
  
  setGlobalObject(new_global_object) {
    this.global_object = new_global_object;
  }
  
  setConfig(new_config) {
    this.config = new_config;
    this.setGlobalObject(this.config.global_object);
  }
  
  init() {
    this.login = new LoginUI(this.config);
    this.login.init();
  }
}
export default UserInterface