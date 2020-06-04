<template>
  <div>
    <label><input @change="ckeckAllTodos" type="checkbox" :checked="!uncheckedLeft">
      <span v-if="uncheckedLeft">全てチェック</span>
      <span v-else>チェックを外す</span>
    </label>
  </div>
</template>

<script>
    export default {
        name: "TodoCheckAll",
        props:{
          uncheckedLeft: {
            type:Boolean,
            required:true,
          },
        },
      methods:{
        ckeckAllTodos(){
            eventBus.$emit('checkAllTodos');
          },
      }
    }
</script>

<style scoped>

</style>
