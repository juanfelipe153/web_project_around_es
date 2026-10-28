export class API {
  private _baseUrl: string;
  private _headers: Record<string, string>; // Cambiado a objeto

  constructor(options: { baseUrl: string; headers: Record<string, string> }) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  
  private async _handleResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  
  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
    return this._handleResponse(res);
  }

  
  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
    return this._handleResponse(res);
  }

  
  async updateUserInfo({ name, about }: { name: string; about: string }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    });
    return this._handleResponse(res);
  }

  
  async addCard({ name, link }: { name: string; link: string }) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    });
    return this._handleResponse(res);
  }

  
  async deleteCard(cardId: string) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
    return this._handleResponse(res);
  }

  
  async changeLikeCardStatus(cardId: string, isLiked: boolean) {
    const method = isLiked ? 'PUT' : 'DELETE';
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers
    });
    return this._handleResponse(res);
  }

  
  async updateUserAvatar({ avatar }: { avatar: string }) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    });
    return this._handleResponse(res);
  }
}


export const api = new API({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "38205c13-8d01-4040-9b30-ad9e7a82c9cb",
    "Content-Type": "application/json"
  }
});