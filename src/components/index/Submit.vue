<template lang="pug">
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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Submit extends Vue {
  @Prop() private msg!: string;
  uri = '';
  jamp_flag = false;
  warn(msg: string, event: Event) {
    const uri: string = this.uri;
    const jamp_flag = this.jamp_flag;
    alert([msg, uri, jamp_flag].toString());
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
