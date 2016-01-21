import FaceBookProvider from '../provider/facebook_provider';

class LoginUI {
  constructor(config) {
    this.setConfig(config);
    this.provider = [];
  }
  
  setConfig(new_config) {
    this.validateConfig(new_config);
    this.config = new_config;
    this.setGlobalObject(this.config.global_object);
  }
  
  setGlobalObject(new_global_object) {
    this.global_object = new_global_object;
  }
  
  validateConfig(new_config) {
    if (new_config.account === undefined) {
      throw "LoginUI: Config must specify the 'account' property.";
    }
    if (new_config.account.provider === undefined) {
      throw "LoginUI: Config must have at least one provider.";
    }
  }
  
  init() {
    if (this.config === undefined) {
      throw "LoginUI: Configuration not set."
    }
    this.setupProviders();
    this.addProviderUI();
    this.providerInit();
  }
  
  setupProviders() {
    if (this.config.account.provider.facebook !== undefined) {
      this.FaceBookProvider = new FaceBookProvider(this.config);
      this.addProvider(this.FaceBookProvider);
    }
    /*
    if (this.config.account.provider.google !== undefined) {
      this.GoogleProvider = new GoogleProvider(this.account.provider.config.google);
    }
    
    if (this.config.account.provider.dummy !== undefined) {
      this.DummyProvider = new DummyProvider(this.account.provider.config.dummy);
    }
    */
  }
  addProvider(new_provider) {
    this.provider.push(new_provider);
  }
  
  addProviderUI() {
    this.provider.forEach(function(provider){
      console.log(this.config.account.loginDiv);
      console.log(this.d());
      this.d().getElementById(this.config.account.loginDiv).appendChild(provider.getElement());
    }, this);
  }
  
  providerInit() {
    this.provider.forEach(function(provider){
      provider.init();
    });
  }
  
  d() {
    if (this.global_object.document === undefined) {
      throw "LoginUI: No document element to use.";
    }
    return this.global_object.document;
  }
}
export default LoginUI