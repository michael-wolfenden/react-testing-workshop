import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import CustomerList from './CustomerList';

describe('CustomerList', () => {
    function getStoreStub(customers = []) {
        const unsubscribe = expect.createSpy();
        const ref = { customers, unsubscribe };
        const store = {
            getCustomers: () => ref.customers,
            subscribe: cb => {
                ref.callback = cb;
                return ref.unsubscribe;
            },
        };

        return { ref, store };
    }

    function renderWithProps(props) {
        const store = getStoreStub().store;
        const actions = {
            addCustomer: () => { },
        };

        return mount(
            <CustomerList
              store={ store }
              actions={ actions }
              {...props}
            />
        );
    }

    it('Renders no customers and add button', () => {
        const component = renderWithProps();
        const componentText = component.text();

        expect(componentText).toContain('no customers');
        expect(componentText).toNotContain('list of customers');
    });

    it('Renders customers and add button', () => {
        const store = getStoreStub([{ name: 'Bob' }, { name: 'Joanna' }]).store;
        const component = renderWithProps({ store });
        const componentText = component.text();

        expect(componentText).toNotContain('no customers');
        expect(componentText).toContain('list of customers');
        expect(componentText).toContain('Bob');
        expect(componentText).toContain('Joanna');
    });

    it('Responds to store updates', () => {
        const { ref, store } = getStoreStub();
        const component = renderWithProps({ store });

        ref.customers = [{ name: 'Bob' }, { name: 'Joanna' }];
        ref.callback();

        const componentText = component.text();

        expect(componentText).toNotContain('no customers');
        expect(componentText).toContain('list of customers');
        expect(componentText).toContain('Bob');
        expect(componentText).toContain('Joanna');
    });

    it('Unsubscribes when unmounted', () => {
        const { ref, store } = getStoreStub();
        const component = renderWithProps({ store });

        component.unmount();

        expect(ref.unsubscribe).toHaveBeenCalled();
    });
});
