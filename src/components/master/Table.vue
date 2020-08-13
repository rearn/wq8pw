<template lang="pug">
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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Table extends Vue {
  @Prop() private message!: string;
}
</script>
