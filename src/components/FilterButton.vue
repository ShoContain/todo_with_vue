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
        data(){
          return{
            'filter':'all',
          }
        },
        methods:{
          changeFilter(filter){
            this.fillter=filter
            eventBus.$emit('toDosWithFilter',filter)
          }
        },
    }
</script>

<style scoped>

</style>
