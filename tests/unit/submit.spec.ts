/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable vue/max-len */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Submit from '@/components/index/Submit.vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

const localVue = createLocalVue();
localVue.use(Vuex);

window.confirm = jest.fn(() => true);

describe('Submit.vue', () => {
  let actions: any;
  let store: any;

  beforeEach(() => {
    actions = {
      getRecaptchaSitekeyAsync: jest.fn(),
    };
    store = new Vuex.Store({
      state: {},
      actions,
    });
  });

  it('send uri', async () => {
    const post = { short: '6uX-6AZbLTo', long: 'TBIVTQ06BCMJK' };
    const uri = 'http://example.com/';
    const d = { short: `${window.location.href}6uX-6AZbLTo`, long: `${window.location.href}TBIVTQ06BCMJK` };
    const ret = { uri, antenna: false, key: 0 };
    Object.assign(ret, d);
    mockAxios.onPost('/api/v1/accept/post').reply(200, post);
    const wrapper = shallowMount(Submit, { store, localVue });
    expect(actions.getRecaptchaSitekeyAsync).toHaveBeenCalled();
    wrapper.find('[name="uri"]').setValue(uri);
    wrapper.find('form').trigger('submit.prevent');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.message).toContainEqual(ret);
  });
  it('del', () => {
    const uri = 'http://example.com/';
    const d = { short: `${window.location.href}6uX-6AZbLTo`, long: `${window.location.href}TBIVTQ06BCMJK` };
    const ret = { uri, antenna: false, key: 0 };
    Object.assign(ret, d);
    const message = [ret];
    const wrapper = shallowMount(Submit, { store, localVue });
    expect(actions.getRecaptchaSitekeyAsync).toHaveBeenCalled();
    wrapper.vm.$data.message = message;
    return wrapper.vm.$nextTick().then(() => {
      wrapper.find('div.result button').trigger('click');
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.vm.$data.message).toEqual([]);
      });
    });
  });
});
