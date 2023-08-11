//import { shallowMount } from '@vue/test-utils';
import { render } from '@testing-library/vue';
import DeskBoard from '@/components/DeskBoard';


// eslint-disable-next-line no-undef
test('DeskBoard', () => {
    // eslint-disable-next-line no-undef, no-constant-condition
    if ('render ', async () => {
        const wrapper = render(DeskBoard);
        // eslint-disable-next-line no-undef
        expect(wrapper.exists()).toBe(true);
        // eslint-disable-next-line no-undef
        expect(wrapper.findAll('.list')).toHaveLength(2); //expect lenght 2
        await wrapper.find('.add-list').trigger('click'); //simulation click
        // eslint-disable-next-line no-undef
        expect(wrapper.findAll('.list')).toHaveLength(3); // expect 3
    });
});