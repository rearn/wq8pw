<template lang="pug">
  div#app
    Index(v-bind:msg="message" )
    section#main
      h2 当サイトについて
      p
        |  当サイトは短縮URLサービスです。
        |  なにかありましたら、 
        span Twitter: 
          a(href="https://twitter.com/rearn499") @rearn499
        | に連絡お願いします。
    section#submit
      p
        | 以下でURLが生成できます。
      p
        | ※サイト閉鎖時にすべてのURL対応表を公開しますので、機密情報は入れないでください。
      form(method="post" action="/accept/post" v-on:submit.prevent="warn('aaa', $event)")
          p
            label
              | URL: 
              input(type="url" name="uri" v-model="uri" required)
          p
            label
              input(type="checkbox" name="jamp_flag" v-model="jamp_flag")
              | 自動ジャンプせず警告ページを表示する。
          // div(id="g-recaptcha" data-sitekey="6LfEWDYUAAAAAPUPSx6IAIz1NUCCtRHfnEUp8xSY") 
          button(type="submit" value="submit") 送信する
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/index/Header.vue'; // @ is an alias to /src

@Component({
  components: {
    Header,
  },
})
export default class Home extends Vue {
  message = '短縮URLサービス wq8pw にようこそ';
  uri = '';
  jamp_flag = false;
  warn(msg: string, event: Event) {
    const uri: string = this.uri;
    const jamp_flag = this.jamp_flag;
    alert([msg, uri, jamp_flag].toString());
  }
}
</script>
