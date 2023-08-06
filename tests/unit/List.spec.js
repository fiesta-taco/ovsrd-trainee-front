//import { shallowMount } from '@vue/test-utils';
import {render} from '@testing-library/vue';
import List from '@/components/List';


// eslint-disable-next-line no-undef
test('List', () => {
    // eslint-disable-next-line no-undef, no-constant-condition
    if('render list', async () => {
        const wrapper = render(List);
        // eslint-disable-next-line no-undef
        expect(wrapper.exists()).toBe(true);
    });
});