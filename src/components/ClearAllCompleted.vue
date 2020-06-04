<template>
  <button v-show="showClearAllCompletedButton" @click="clearAllCompleted">完了したタスクを削除</button>
</template>

<script>
    export default {
        name: "ClearAllCompleted",
        props:{
          showClearAllCompletedButton:{
            type:Boolean,
            required:true,
          }
        },
      methods:{
        clearAllCompleted(){
          eventBus.$emit('clearAllCompleted')
        }
      }
    }
</script>

<style scoped>

</style>
