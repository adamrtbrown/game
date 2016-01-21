(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function Config() {
  _classCallCheck(this, Config);

  this.global_object = window;
  this.account = {
    loginDiv: "account_bar",
    provider: {
      facebook: {
        appId: '119967911431488',
        xfbml: true,
        version: 'v2.5'
      } /*,
        google : {
         
        },
        dummy: {
        }
        */
    }
  };
};

exports.default = Config;

},{}],2:[function(require,module,exports){
'use strict';

var _config = require('./cfg/config');

var _config2 = _interopRequireDefault(_config);

var _user = require('./user/user');

var _user2 = _interopRequireDefault(_user);

var _user_interface = require('./ui/user_interface');

var _user_interface2 = _interopRequireDefault(_user_interface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = new _config2.default();
console.log(_user_interface2.default);
var user_interface = new _user_interface2.default();
user_interface.setConfig(config);
onload = function onload() {
  user_interface.init();
};

var user = new _user2.default(config.account);

},{"./cfg/config":1,"./ui/user_interface":3,"./user/user":6}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _login = require('../user/ui/login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserInterface = function () {
  function UserInterface(config) {
    _classCallCheck(this, UserInterface);

    this.config = config;
  }

  _createClass(UserInterface, [{
    key: 'setGlobalObject',
    value: function setGlobalObject(new_global_object) {
      this.global_object = new_global_object;
    }
  }, {
    key: 'setConfig',
    value: function setConfig(new_config) {
      this.config = new_config;
      this.setGlobalObject(this.config.global_object);
    }
  }, {
    key: 'init',
    value: function init() {
      this.login = new _login2.default(this.config);
      this.login.init();
    }
  }]);

  return UserInterface;
}();

exports.default = UserInterface;

},{"../user/ui/login":5}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FaceBookProvider = function () {
  function FaceBookProvider(config) {
    _classCallCheck(this, FaceBookProvider);

    this.facebook_config = config.account.provider.facebook;
    this.validateConfig(this.facebook_config);
    this.setGlobalObject(config.global_object);
    this.appId = this.facebook_config.appId;
    this.xfbml = this.facebook_config.xfbml;
    this.version = this.facebook_config.version;
  }

  _createClass(FaceBookProvider, [{
    key: "validateConfig",
    value: function validateConfig(config) {
      if (config === undefined) {
        throw "FaceBookProvider: Must provide Facebook app config.";
      }
      if (config.appId === undefined) {
        throw "FaceBookProvider: Config must provide appId.";
      }
      if (config.xfbml === undefined) {
        throw "FaceBookProvider: Config must provide xfbml.";
      }
      if (config.version === undefined) {
        throw "FaceBookProvider: Config must provide version.";
      }
    }
  }, {
    key: "setGlobalObject",
    value: function setGlobalObject(new_global_object) {
      this.global_object = new_global_object;
    }
  }, {
    key: "init",
    value: function init() {
      console.log(this.version);
      this.global_object.fbAsyncInit = function () {
        console.log("fb init");
        FB.init({
          appId: this.appId,
          xfbml: this.xfbml,
          version: this.version
        });
      };
      var fb_element = this.d().createElement("div");
      if (!this.d().getElementById('facebook-jssdk')) {
        var js = this.d().createElement('script');
        js.id = 'facebook-jssdk';
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=" + this.xbfml + "&version=" + this.version + "&appId=" + this.appId;
        var fjs = this.d().getElementsByTagName('script');
        var prependEl = fjs.length === 0 ? this.d().body.firstChild : fjs[0];
        prependEl.parentNode.insertBefore(js, prependEl);
      }
    }
  }, {
    key: "getElement",
    value: function getElement() {
      var element = this.d().createElement('div');
      element.setAttribute('class', 'fb-login-button');
      element.setAttribute('data-max-rows', '1');
      element.setAttribute('data-size', 'medium');
      element.setAttribute('data-show-faces', 'false');
      element.setAttribute('data-auto-logout-link', 'true');
      // <div class="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="true"></div>
      return element;
    }
  }, {
    key: "d",
    value: function d() {
      if (this.global_object.document === undefined) {
        throw "FacebookProvider: No document.";
      }
      return this.global_object.document;
    }
  }]);

  return FaceBookProvider;
}();

exports.default = FaceBookProvider;

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _facebook_provider = require("../provider/facebook_provider");

var _facebook_provider2 = _interopRequireDefault(_facebook_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginUI = function () {
  function LoginUI(config) {
    _classCallCheck(this, LoginUI);

    this.setConfig(config);
    this.provider = [];
  }

  _createClass(LoginUI, [{
    key: "setConfig",
    value: function setConfig(new_config) {
      this.validateConfig(new_config);
      this.config = new_config;
      this.setGlobalObject(this.config.global_object);
    }
  }, {
    key: "setGlobalObject",
    value: function setGlobalObject(new_global_object) {
      this.global_object = new_global_object;
    }
  }, {
    key: "validateConfig",
    value: function validateConfig(new_config) {
      if (new_config.account === undefined) {
        throw "LoginUI: Config must specify the 'account' property.";
      }
      if (new_config.account.provider === undefined) {
        throw "LoginUI: Config must have at least one provider.";
      }
    }
  }, {
    key: "init",
    value: function init() {
      if (this.config === undefined) {
        throw "LoginUI: Configuration not set.";
      }
      this.setupProviders();
      this.addProviderUI();
      this.providerInit();
    }
  }, {
    key: "setupProviders",
    value: function setupProviders() {
      if (this.config.account.provider.facebook !== undefined) {
        this.FaceBookProvider = new _facebook_provider2.default(this.config);
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
  }, {
    key: "addProvider",
    value: function addProvider(new_provider) {
      this.provider.push(new_provider);
    }
  }, {
    key: "addProviderUI",
    value: function addProviderUI() {
      this.provider.forEach(function (provider) {
        console.log(this.config.account.loginDiv);
        console.log(this.d());
        this.d().getElementById(this.config.account.loginDiv).appendChild(provider.getElement());
      }, this);
    }
  }, {
    key: "providerInit",
    value: function providerInit() {
      this.provider.forEach(function (provider) {
        provider.init();
      });
    }
  }, {
    key: "d",
    value: function d() {
      if (this.global_object.document === undefined) {
        throw "LoginUI: No document element to use.";
      }
      return this.global_object.document;
    }
  }]);

  return LoginUI;
}();

exports.default = LoginUI;

},{"../provider/facebook_provider":4}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user_repository = require('./user_repository');

var _user_repository2 = _interopRequireDefault(_user_repository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: 'constuctor',
    value: function constuctor() {
      this._user_repo = null;
    }
  }, {
    key: 'user_repo',
    value: function user_repo() {
      if (null === this._user_repo) {
        this._user_repo = new _user_repository2.default();
      }
      return _user_repo;
    }
  }, {
    key: 'setUserRepo',
    value: function setUserRepo(new_repo) {
      this._user_repo = new_repo;
    }
  }, {
    key: 'setProvider',
    value: function setProvider(new_provider) {
      user_repo.setProvider(new_provider);
    }
  }]);

  return User;
}();

exports.default = User;

},{"./user_repository":7}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserRepository = function () {
  function UserRepository() {
    _classCallCheck(this, UserRepository);

    this._provider = null;
  }

  _createClass(UserRepository, [{
    key: "provider",
    value: function provider() {
      if (null === this_provider) {
        throw "UserRepository: User provider not defined.";
      }
      return this._provider;
    }
  }, {
    key: "setProvider",
    value: function setProvider(new_provider) {
      this._provider = new_provider;
    }
  }]);

  return UserRepository;
}();

exports.default = UserRepository;

},{}]},{},[2]);
