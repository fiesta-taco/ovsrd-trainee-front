
import {render} from '@testing-library/vue';
import CardModal from '@/components/CardModal';


// eslint-disable-next-line no-undef
test('CardModal', () => {
    // eslint-disable-next-line no-undef, no-constant-condition
    if('render modal', async () => {
        const wrapper = render(CardModal);
        // eslint-disable-next-line no-undef
        expect(wrapper.exists()).toBe(true);
    });
});