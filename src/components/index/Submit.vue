<template lang="pug">
  section#submit
    p 以下でURLが生成できます。
    p.warning サイト閉鎖時にすべてのURL対応表を公開しますので、機密情報は入れないでください。
    transition-group(tag="div" appear)
      div.result(v-for="(item, i) in message" v-bind:key="item.key")
        div.uri
          span {{ item.uri }}
          | の短縮URLを作成しました。
          | クリックでコピーできます。
        div
          div.short.output
            label short URL
            input(type="text" v-model="item.short" readonly v-on:click="copy($event.toElement);")
          div.long.output
            label long URL
            input(type="text" v-model="item.long" readonly v-on:click="copy($event.toElement);")
        button(v-on:click="del(i);") 削除
    form(v-on:submit.prevent="send();")
      p
        label URL
        input(type="url" name="uri" v-model="uri" required)
      p
        input(type="checkbox" name="antenna" v-model="antenna")
        | 自動ジャンプせず警告ページを表示する。
      div#recaptcha
      button(type="submit" value="submit") 送信する
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import RecaptchaInit from './RecaptchaInit';

const recaptchaInit = new RecaptchaInit();

interface Msg {
  uri: string;
  antenna: boolean;
  key?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).onloadCallback = () => {
  recaptchaInit.flag = true;
};

@Component({
  created() {
    Promise.all([
      this.$store.dispatch('getRecaptchaSitekeyAsync'),
      recaptchaInit.wait(),
    ]).then(() => {
      if (this.$store.state.Recaptcha.use) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).grecaptcha.render('recaptcha', {
          sitekey: this.$store.state.Recaptcha.sitekey,
        });
      }
    });
  },
})
export default class Submit extends Vue {
  @Prop() private msg!: string;

  private uri = '';

  private antenna = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private message: Msg[] = [];

  private key = 0;

  public send() {
    const { uri } = this;
    const { antenna } = this;
    const a: Msg = { uri, antenna };
    console.log(a);
    axios.post('/api/v1/accept/post', a).then((b) => {
      const d = b.data;
      Object.keys(d).forEach((v) => {
        d[v] = window.location.href + d[v];
      });
      Object.assign(a, d);
      a.key = this.key;
      this.key += 1;
      this.message.push(a);
      console.log(this.message);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public copy(element: HTMLInputElement) {
    element.select();
    document.execCommand('copy');
    // eslint-disable-next-line no-alert
    alert('コピーしました。');
  }

  public del(index: number) {
    console.log(index);
    this.message.splice(index, 1);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
enter-derlay-time = 0.5s
leave-derlay-time = 0.5s
enter-time = 0.5s
leave-time = 0.5s
.v-enter-active
  max-height 100vh
  transition max-height enter-derlay-time linear, opacity enter-time linear enter-derlay-time
.v-leave-active
  max-height 100vh
  transition max-height leave-time linear leave-derlay-time, opacity leave-derlay-time linear
.v-enter
  opacity 0
  max-height 0
.v-leave-to
  opacity 0
  max-height 0
p.warning:before
  content "※"
label:after
  content ": "
form
  width 18em
  border 1px solid #aaa
  margin auto
div.result
  background-color #ffeeee
  margin auto
  border 1px dashed #aaa
  div
    text-align left
    div.output
      margin auto
      width 18em
      label
        display block
        margin auto
        text-align left
      input
        display block
        margin auto
        width 20em
      button
        display block
        margin auto
  div.uri
    text-align center
    span
      padding-right 0.5em
</style>
