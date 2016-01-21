import Config from './cfg/config';
import User from './user/user';
import UserInterface from './ui/user_interface';
var config = new Config();
console.log(UserInterface);
var user_interface = new UserInterface();
user_interface.setConfig(config);
onload = function() {
  user_interface.init();
}

var user = new User(config.account);

