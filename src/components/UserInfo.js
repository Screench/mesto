export class UserInfo {
    constructor({userNameSelector, userOccupationSelector}) {
      this._profileName = document.querySelector(userNameSelector);
      this._profileOccupation = document.querySelector(userOccupationSelector);
    }
  
    getUserInfo() {
      return {
        name: this._profileName.textContent,
        job: this._profileOccupation.textContent,
      }
    }
  
    setUserInfo(data) {
      this._profileName.textContent = data.username;
      this._profileOccupation.textContent = data.job;
    }
  
  }