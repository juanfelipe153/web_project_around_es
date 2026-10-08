export type UserInfoData = {
    name: string;
    about: string;
};

export class UserInfo {
    private nameElement: HTMLElement;
    private descriptionElement: HTMLElement;

   
    constructor({ nameSelector, aboutSelector }: { nameSelector: string; aboutSelector: string }) {
        this.nameElement = document.querySelector(nameSelector) as HTMLElement;
        this.descriptionElement = document.querySelector(aboutSelector) as HTMLElement;
    }

   
    public getUserInfo(): UserInfoData {
        return {
            name: this.nameElement.textContent || '',
            about: this.descriptionElement.textContent || ''
        };
    }

    
    public setUserInfo({ name, about }: UserInfoData): void {
        if (name) {
            this.nameElement.textContent = name;
        }
        if (about) {
            this.descriptionElement.textContent = about;
        }
    }
}