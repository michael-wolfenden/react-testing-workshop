import React from 'react';
import expect, { createSpy } from 'expect';
import { mount } from 'enzyme';

import Toggle from './Toggle';

describe('Toggle', () => {
    function renderWithProps(props) {
        return mount(<Toggle {...props} />);
    }

    it('toggle--off class applied by default', () => {
        const component = renderWithProps();

        expect(component.exists('div.toggle--off')).toEqual(true);
    });

    it('toggle--on class applied when initialToggledOn specified to true', () => {
        const component = renderWithProps({
            initialToggledOn: true,
        });

        expect(component.exists('div.toggle--on')).toEqual(true);
    });

    it('invokes the onToggle prop when clicked', () => {
        const onToggle = createSpy();
        const component = renderWithProps({ onToggle });

        component
            .find('button')
            .simulate('click');

        expect(component.exists('div.toggle--on')).toEqual(true);
        expect(onToggle).toHaveBeenCalledWith(true);
    });
});
