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
      form(method="post" action="/accept/post")
          p
            label
              | URL: 
              input(type="url" name="uri" required)
          p
            label
              input(type="checkbox" name="jamp_flag")
              | 自動ジャンプせず警告ページを表示する。
          // div(id="g-recaptcha" data-sitekey="6LfEWDYUAAAAAPUPSx6IAIz1NUCCtRHfnEUp8xSY") 
          // button(type="submit" value="submit") 送信する
          button(v-on:click="counter += 1") 送信する
          p {{ counter }}
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Index from '@/components/Index.vue'; // @ is an alias to /src

@Component({
  components: {
    Index,
  },
  data: {
    counter: 0,
  },
  computed: {
    message() {
      return '短縮URLサービス wq8pw にようこそ';
    },
  },
})
export default class Home extends Vue {}
</script>
