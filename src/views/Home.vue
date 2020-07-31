<template lang="pug">
  div#app
    Header(v-bind:msg="message")
    Main(v-bind:user="user")
    Submit()
    
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/index/Header.vue'; // @ is an alias to /src
import Main from '@/components/index/Main.vue';
import Submit from '@/components/index/Submit.vue';

@Component({
  components: {
    Header,
    Main,
    Submit,
  },
})
export default class Home extends Vue {
  public message = '短縮URLサービス wq8pw にようこそ';
  public user = 'rearn499';
}
</script>
