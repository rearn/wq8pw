<template lang="pug">
  div#about
    h1 test
    p {{ message }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Index from '@/components/Index.vue'; // @ is an alias to /src

interface Dlist {
  id: {
    short: string;
    logn: string;
  };
  uri: string;
  type: string;
}

@Component({
  computed: {
    message() {
      const l: Dlist = this.$store.state.List;
      return this.$store.state.List;
      return 'aaa';
    },
  },
  created() {
    this.$store.dispatch('getListAsync');
  },
})


export default class Master extends Vue {}
</script>