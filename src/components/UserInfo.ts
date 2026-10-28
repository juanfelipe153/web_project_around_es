export type UserInfoData = {
    name: string;
    about: string;
    avatarImage?: string;
};

export class UserInfo {
    private nameElement: HTMLElement;
    private descriptionElement: HTMLElement;
    private avatarImageElement:HTMLImageElement;
   
    constructor({ nameSelector, aboutSelector,avatarImageSelector }: { nameSelector: string; aboutSelector: string;avatarImageSelector:string }) {
        this.nameElement = document.querySelector(nameSelector) as HTMLElement;
        this.descriptionElement = document.querySelector(aboutSelector) as HTMLElement;
        this.avatarImageElement = document.querySelector(avatarImageSelector) as HTMLImageElement;
    }

   
    public getUserInfo(): UserInfoData {
        return {
            name: this.nameElement.textContent || '',
            about: this.descriptionElement.textContent || '',
            avatarImage: this.avatarImageElement.src,
        };
    }

    
    public setUserInfo({ name, about, avatarImage }: UserInfoData): void {
        if (name) {
            this.nameElement.textContent = name;
        }
        if (about) {
            this.descriptionElement.textContent = about;
        }
        if (avatarImage){
            this.avatarImageElement.src = avatarImage;
        }
    }
}