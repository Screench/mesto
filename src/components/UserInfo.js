export class UserInfo {
    constructor({userNameSelector, userOccupationSelector, userAvatarSelector}) {
      this._profileName = document.querySelector(userNameSelector);
      this._profileOccupation = document.querySelector(userOccupationSelector);
      this._profileAvatar = document.querySelector(userAvatarSelector);
    }
  
    getUserInfo() {
      return {
        name: this._profileName.textContent,
        job: this._profileOccupation.textContent,
      }
    }
  
    setUserInfo({name, about}) {
      this._profileName.textContent = name;
      this._profileOccupation.textContent = about;
    }
  
    setUserAvatar(url){
      this._profileAvatar.src = url.avatar
    }
  }