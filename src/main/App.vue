<template lang="pug">
  div#app
    div#nav
      router-link(to="/") Home
      router-link(to="/master") Master
    router-view
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
    padding 0 10px
  a+a
    border-left 1px solid #999
</style>
