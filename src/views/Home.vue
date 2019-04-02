<template lang="pug">
  div#app
    img(alt="Vue logo" src="../assets/logo.png")
    HelloWorld(v-bind:msg="message")
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
