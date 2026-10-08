export class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.descriptionElement = document.querySelector(aboutSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || '',
            about: this.descriptionElement.textContent || ''
        };
    }
    setUserInfo({ name, about }) {
        if (name) {
            this.nameElement.textContent = name;
        }
        if (about) {
            this.descriptionElement.textContent = about;
        }
    }
}
//# sourceMappingURL=UserInfo.js.map