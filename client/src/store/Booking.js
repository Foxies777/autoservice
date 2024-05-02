import { makeAutoObservable } from 'mobx';

export default class Booking {
    constructor() {
        this._bookings = [];
        makeAutoObservable(this);
    }
    
    setBookings(bookings) {
        this._bookings = bookings;
    }
    
    get bookings() {
        return this._bookings;
    }
}
