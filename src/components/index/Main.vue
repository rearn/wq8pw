<template lang="pug">
  mixin twitter(username)
    span Twitter: 
      a(href="https://twitter.com/" + username) @#{username}
  section#main
    h2 当サイトについて
    p
      |  当サイトは短縮URLサービスです。
      |  なにかありましたら、 
      +twitter("rearn499")
      | に連絡お願いします。
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Main extends Vue {
  @Prop() private user!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h2 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
