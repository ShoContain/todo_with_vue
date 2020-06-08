<template>
  <div>
    <label>
      <input @change="ckeckAllTodos" type="checkbox" :checked="!uncheckedLeft">
      <span v-if="uncheckedLeft">全てチェック</span>
      <span v-else>チェックを外す</span>
    </label>
  </div>
</template>

<script>
    export default {
      name: "TodoCheckAll",
      computed:{
        uncheckedLeft(){
          return this.$store.getters.uncheckedLeft
        }
      },
      methods:{
        ckeckAllTodos(){
          this.$store.dispatch('checkAllTodos',event.target.checked);
          },
      }
    }
</script>

<style scoped>

</style>
