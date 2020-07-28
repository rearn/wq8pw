<template lang="pug">
  div#about
    h1 test
    table
      tbody
        tr
          th short
          th long
          th uri
          th type
        tr(v-for="item in message")
          td {{ item.encrypt.short }}
          td {{ item.encrypt.long }}
          td {{ item.uri }}
          td {{ item.type }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface Dlist {
  id: number;
  encrypt: {
    short: string;
    logn: string;
  };
  uri: string;
  type: string;
}

@Component({
  computed: {
    message() {
      const l: Dlist[] = this.$store.state.List;
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