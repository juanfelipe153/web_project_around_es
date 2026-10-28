export class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarImageSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.descriptionElement = document.querySelector(aboutSelector);
        this.avatarImageElement = document.querySelector(avatarImageSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || '',
            about: this.descriptionElement.textContent || '',
            avatarImage: this.avatarImageElement.src,
        };
    }
    setUserInfo({ name, about, avatarImage }) {
        if (name) {
            this.nameElement.textContent = name;
        }
        if (about) {
            this.descriptionElement.textContent = about;
        }
        if (avatarImage) {
            this.avatarImageElement.src = avatarImage;
        }
    }
}
//# sourceMappingURL=UserInfo.js.map