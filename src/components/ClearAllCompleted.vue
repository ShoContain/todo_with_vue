<template>
  <button v-show="showClearAllCompletedButton" @click="clearAllCompleted">完了したタスクを削除</button>
</template>

<script>
    export default {
        name: "ClearAllCompleted",
        computed:{
          showClearAllCompletedButton(){
            return this.$store.getters.showClearAllCompletedButton
          }
        },
        methods:{
        clearAllCompleted(){
          this.$store.dispatch('clearCompleted')
        }
      }
    }
</script>

<style scoped>

</style>
