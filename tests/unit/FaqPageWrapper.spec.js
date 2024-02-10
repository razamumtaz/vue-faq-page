import { mount } from '@vue/test-utils';
import FaqPageWrapper from '@/components/FaqPageWrapper.vue';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([])
  })
);

describe('FaqPageWrapper', () => {
  test('renders correctly', () => {
    const wrapper = mount(FaqPageWrapper);
    expect(wrapper.exists()).toBe(true);
  });

  test('initializes with default data values', () => {
    const wrapper = mount(FaqPageWrapper);
    expect(wrapper.vm.faqs).toEqual([]);
    expect(wrapper.vm.showLoadMore).toBe(true);
    expect(wrapper.vm.limit).toBe(10);
    expect(wrapper.vm.offset).toBe(0);
    expect(wrapper.vm.openFaqId).toBe(null);
  });

  test('capitalizes the first letter of a string', () => {
    const wrapper = mount(FaqPageWrapper);
    expect(wrapper.vm.capitalizeFirstLetter('test')).toBe('Test');
  });

});
