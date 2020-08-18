<template lang="pug">
  table
    tbody
      tr
        th id
        th short
        th long
        th type
        th uri
      tr(v-for="item in message")
        td.id {{ item.id }}
        td.short {{ item.encrypt.short }}
        td.long {{ item.encrypt.long }}
        td.type {{ item.type }}
        td.uri {{ item.uri }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Table extends Vue {
  @Prop() private message!: string;
}
</script>

<style scoped lang="stylus">
form-width = 15rem
button-width = 3rem
color-border = #000
color-th-odd  = #000000
color-th-even = #000000
color-td-odd  = #eeeeee
color-td-even = #ffffff

table
  text-align left
  font-family 'Courier New','Courier',monospace

  font-size 1rem
  border-collapse collapse
  th
    text-align center
    font-weight bold
    font-style italic
    border-bottom double 3px color-border
    padding 0.2em
    color white
  th:nth-child(odd)
    background-color color-th-odd
  th:nth-child(even)
    background-color color-th-even
  td
    border-top dashed 1px color-border
    padding 0.3em
  td:nth-child(odd)
    background-color color-td-odd
  td:nth-child(even)
    background-color color-td-even
  td.id
    text-align right
  td.type
    text-align center

</style>
