<template lang="pug">
  section#auth
    form(v-on:submit.prevent="auth();")
      p
        label name
        input(type="text" name="name" v-model="name" required)
      p
        label password
        input(type="password" name="pass" v-model="pass" required)
      button(type="submit" value="submit") Login
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
form-width = 15rem
button-width = 3rem
top-color = #ccc
right-color = #ccc

form
  text-align left
  width form-width
  margin auto
  p
    margin .2rem 0
    width form-width
    label
      ::after
        content '\a'
        white-space pre
    input
      width form-width
      box-sizing border-box
      border-width 2px
      border-style inset
      border-color top-color right-color
      border-radius .25rem
  button
    margin-left form-width - ((form-width + button-width) / 2)
    width button-width
    text-align center
    border-width 2px
    border-style outset
    border-color top-color right-color
    border-radius .25rem

</style>
