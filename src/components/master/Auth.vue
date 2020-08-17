<template lang="pug">
  section#auth
    form(v-on:submit.prevent="auth();")
      p
        label name
        input(type="text" name="name" v-model="name" required)
      p
        label password
        input(type="password" name="pass" v-model="pass" required)
      button(type="submit" value="submit") 送信する
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  methods: {
    auth() {
      this.$store.dispatch(
        'digestUserCreate',
        {
          user: this.$data.name,
          password: this.$data.pass,
        },
      ).then(() => this.$router.push('/master'));
    },
  },
})
export default class Auth extends Vue {
  private name = '';

  private pass = '';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h2
  margin 40px 0 0
a
  color #42b983
</style>
