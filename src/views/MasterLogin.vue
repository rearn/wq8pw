<template lang="pug">
  div#app
    Header(v-bind:msg="title")
    Auth(v-bind:msg="title")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/master/Header.vue';
import Auth from '@/components/master/Auth.vue';
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
    Auth,
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
})

export default class MasterLogin extends Vue {}
</script>
