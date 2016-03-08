import expect, { createSpy } from 'expect';

import store from './Customers';

describe('Customers', () => {
    it('customers should start with empty', () => {
        const customers = store.getCustomers();
        expect(customers.length).toEqual(0);
    });

    it('setting customers and getting them', () => {
        const c0 = { name: 'Bill' };
        const c1 = { name: 'Francine' };
        store.setCustomers([c0, c1]);

        const customers = store.getCustomers();
        const [sc0, sc1] = customers;

        expect(customers.length).toEqual(2);
        expect(c0).toBe(sc0);
        expect(c1).toBe(sc1);
    });

    it('subscribing to the store', () => {
        const spy = createSpy();
        const unsubscribe = store.subscribe(spy);
        store.setCustomers([]);

        expect(spy).toHaveBeenCalled();
        spy.reset();

        unsubscribe();
        store.setCustomers([]);

        expect(spy).toNotHaveBeenCalled();
    });
});

afterEach(() => store.setCustomers([]));
