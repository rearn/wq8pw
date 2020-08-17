<template lang="pug">
  div#app
    Header(v-bind:msg="title")
    Table(v-bind:message="message")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/master/Header.vue';
import Table from '@/components/master/Table.vue';

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
  components: {
    Header,
    Table,
  },
  computed: {
    message() {
      return this.$store.state.List;
    },
    title() {
      return 'test';
    },
  },
  created() {
    this.$store.dispatch('loadDigest')
      .then(() => {
        console.log('aaaa');
        this.$store.dispatch('getListAsync').then(() => {
          if (this.$store.state.List === '') {
            this.$router.push('/master/login');
          }
        });
      });
  },
})

export default class Master extends Vue {}
</script>
