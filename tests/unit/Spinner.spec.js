//import { shallowMount } from '@vue/test-utils';
import {render} from '@testing-library/vue';
import Spinner from '@/components/Spinner';


// eslint-disable-next-line no-undef
test('Spinner', () => {
    // eslint-disable-next-line no-undef, no-constant-condition
    if('render sipnner', async () => {
        const wrapper = render(Spinner);
        // eslint-disable-next-line no-undef
        expect(wrapper.exists()).toBe(true);

    });
});