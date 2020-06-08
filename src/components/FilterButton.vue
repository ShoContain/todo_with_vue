<template>
  <div>
    <button :class="{active:filter==='all'}" @click="changeFilter('all')">全てのタスク</button>
    <button :class="{active:filter==='uncompletedAll'}" @click="changeFilter('uncompletedAll')">未完了のタスク</button>
    <button :class="{active:filter==='completedAll'}" @click="changeFilter('completedAll')">完了したタスク</button>
  </div>
</template>

<script>
  export default {
    name: "FilterButton",
    computed: {
      filter() {
        return this.$store.state.filter
      },
    },
    methods: {
      changeFilter(filter) {
        this.$store.dispatch('changeFilter',filter)
      },
    },
  }
</script>

<style scoped>

</style>
