<template>
  <div v-if="uncheckedLeft">{{ uncheckedNum }}個のタスクが未完了です</div>
  <div v-else>タスクは全て完了しています</div>
</template>

<script>
    export default {
        name: "TodoItemUnchecked",
        computed:{
          uncheckedNum(){
            return this.$store.getters.uncheckedNum
          },
          uncheckedLeft(){
            return this.$store.getters.uncheckedLeft
          }
        }
    }
</script>

<style scoped>

</style>
