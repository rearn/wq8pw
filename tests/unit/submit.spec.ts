import { shallowMount } from '@vue/test-utils';
import Submit from '@/components/index/Submit.vue';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mockAxios = new MockAdapter(axios);

window.confirm = jest.fn(() => true);

describe('Submit.vue', () => {
  it('send uri', () => {
    const post = {short: '6uX-6AZbLTo', long: 'TBIVTQ06BCMJK'};
    const uri = 'http://example.com/';
    const d = {short: window.location.href + '6uX-6AZbLTo', long: window.location.href + 'TBIVTQ06BCMJK'};
    const ret = {uri, antenna: false, key: 0};
    Object.assign(ret, d);
    mockAxios.onPost('/api/v1/accept/post').reply(200, post);
    const wrapper = shallowMount(Submit);
    wrapper.find('[name="uri"]').setValue(uri);
    wrapper.find('form').trigger('submit.prevent');
    return wrapper.vm.$nextTick().then(() => {
      return wrapper.vm.$nextTick().then(() => {
        return wrapper.vm.$nextTick().then(() => {
          expect(wrapper.vm.$data.message).toContainEqual(ret);
        });
      });
    });
  });
  it('del', () => {
    const uri = 'http://example.com/';
    const d = {short: window.location.href + '6uX-6AZbLTo', long: window.location.href + 'TBIVTQ06BCMJK'};
    const ret = {uri, antenna: false, key: 0};
    Object.assign(ret, d);
    const message = [ret];
    const wrapper = shallowMount(Submit);
    wrapper.vm.$data.message = message;
    return wrapper.vm.$nextTick().then(() => {
      wrapper.find('div.result button').trigger('click');
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.vm.$data.message).toEqual([]);
      });
    });
  });
});
