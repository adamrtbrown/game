class Config {
  constructor(){
    this.global_object = window;
    this.account = { 
      loginDiv : "account_bar",
      provider : {
        facebook : {
          appId      : '119967911431488',
          xfbml      : true,
          version    : 'v2.5'
        }/*,
        google : {
          
        },
        dummy: {
        }
        */
      }
    }
  }
}
export default Config