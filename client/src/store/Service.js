import { makeAutoObservable } from 'mobx';

export default class Service {
    constructor() {
        this._services = [];
        makeAutoObservable(this);
    }
    
    setServices(services) {
        this._services = services;
    }
    
    get services() {
        return this._services;
    }
}
