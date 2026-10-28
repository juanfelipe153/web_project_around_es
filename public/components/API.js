var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class API {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _handleResponse(res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            });
            return this._handleResponse(res);
        });
    }
    getInitialCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            });
            return this._handleResponse(res);
        });
    }
    updateUserInfo(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, about }) {
            const res = yield fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({ name, about })
            });
            return this._handleResponse(res);
        });
    }
    addCard(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, link }) {
            const res = yield fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({ name, link })
            });
            return this._handleResponse(res);
        });
    }
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            });
            return this._handleResponse(res);
        });
    }
    changeLikeCardStatus(cardId, isLiked) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = isLiked ? 'PUT' : 'DELETE';
            const res = yield fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: method,
                headers: this._headers
            });
            return this._handleResponse(res);
        });
    }
    updateUserAvatar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ avatar }) {
            const res = yield fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({ avatar })
            });
            return this._handleResponse(res);
        });
    }
}
export const api = new API({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "38205c13-8d01-4040-9b30-ad9e7a82c9cb",
        "Content-Type": "application/json"
    }
});
//# sourceMappingURL=API.js.map