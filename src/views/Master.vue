<template lang="pug">
  div#about
    h1 test
    p {{ message }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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