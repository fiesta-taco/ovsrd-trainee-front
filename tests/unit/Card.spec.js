import {render} from '@testing-library/vue';
import Card from '@/components/Card';


// eslint-disable-next-line no-undef
test('Card', () => {
    // eslint-disable-next-line no-undef, no-constant-condition
    if('render card', async () => {
        const wrapper = render(Card);
        // eslint-disable-next-line no-undef
        expect(wrapper.exists()).toBe(true);

    });
});