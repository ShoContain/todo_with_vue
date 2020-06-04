<template>
  <div v-if="uncheckedLeft">{{ uncheckedNum }}個のタスクが未完了です</div>
  <div v-else>タスクは全て完了しています</div>
</template>

<script>
    export default {
        name: "TodoItemUnchecked",
        props:{
          uncheckedNum: {
            type:Number,
            required:true,
          },
          uncheckedLeft:{
            type: Boolean,
            required: true,
          }
        }
    }
</script>

<style scoped>

</style>
