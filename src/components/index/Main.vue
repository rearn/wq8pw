<template lang="pug">
  section#main
    h2 当サイトについて
    p
      |  当サイトは短縮URLサービスです。
      |  なにかありましたら、 
      span Twitter:
        a(v-bind:href="username.url") {{ username.account }}
      | に連絡お願いします。
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Main extends Vue {
  @Prop() private user!: string;
  private username = {
    url: 'https://twitter.com/' + this.user,
    account: '@' + this.user,
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h2
  margin 40px 0 0
a
  color #42b983
</style>
