//import { shallowMount } from '@vue/test-utils';
import {render} from '@testing-library/vue';
import Board from '@/components/Board';


// eslint-disable-next-line no-undef
test('Board', () => {
    // eslint-disable-next-line no-undef, no-constant-condition
    if('render board', async () => {
        const wrapper = render(Board);
        // eslint-disable-next-line no-undef
        expect(wrapper.exists()).toBe(true);
    });
});