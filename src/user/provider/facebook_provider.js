class FaceBookProvider {
  constructor(config) {
    this.facebook_config = config.account.provider.facebook;
    this.validateConfig(this.facebook_config);
    this.setGlobalObject(config.global_object);
    this.appId = this.facebook_config.appId;
    this.xfbml = this.facebook_config.xfbml;
    this.version = this.facebook_config.version;
  }
  
  validateConfig(config) {
    if (config === undefined) {
      throw "FaceBookProvider: Must provide Facebook app config."
    }
    if (config.appId === undefined) {
      throw "FaceBookProvider: Config must provide appId."
    }
    if (config.xfbml === undefined) {
      throw "FaceBookProvider: Config must provide xfbml."
    }
    if (config.version === undefined) {
      throw "FaceBookProvider: Config must provide version."
    }
  }
  
  setGlobalObject(new_global_object) {
    this.global_object = new_global_object;
  }
  init(){
    console.log(this.version);
    this.global_object.fbAsyncInit = function() {
      FB.init({
        appId      : this.appId,
        xfbml      : this.xfbml,
        version    : this.version
      });
    };
    var fb_element = this.d().createElement("div");
    if (!this.d().getElementById('facebook-jssdk')) {
      var js = this.d().createElement('script'); 
      js.id = 'facebook-jssdk';
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=" + this.xbfml + "&version=" + this.version + "&appId=" + this.appId;
      var fjs = this.d().getElementsByTagName('script');
      var prependEl = (fjs.length === 0) ? this.d().body.firstChild : fjs[0];
      prependEl.parentNode.insertBefore(js, prependEl);
    }     
  }
  
  getElement() {
    var element = this.d().createElement('div');
    element.setAttribute('class', 'fb-login-button');
    element.setAttribute('data-max-rows', '1');
    element.setAttribute('data-size', 'medium');
    element.setAttribute('data-show-faces', 'false');
    element.setAttribute('data-auto-logout-link', 'true');
    // <div class="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="true"></div>
    return element;
  }
  
  d() {
    if (this.global_object.document === undefined) {
      throw "FacebookProvider: No document.";
    }
    return this.global_object.document;
  }
}
export default FaceBookProvider