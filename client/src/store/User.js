import { makeAutoObservable } from 'mobx';

export default class User {
    _isAuth = false;
    _user = null;

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(isAuth) {
        this._isAuth = isAuth;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}

