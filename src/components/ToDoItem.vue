<template>
    <div class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="finished" :checked="finished" @change="updateTodo">
        <label class="todo-item-label" v-if="!editing"
               @dblclick="editTodo" :class="{completed:finished}">
          {{ title }}
        </label>
        <input type="text" v-model="title" class="todo-item-edit"
               v-else="editing" @blur="updateTodo" @keyup.enter="updateTodo"
               v-focus @keyup.esc="cancelTodo">
      </div>
      <div>
        <button @click="pluralize">ON</button>
        <span class="remove-item" @click="removeTodo(todo.id)">
          &times;
        </span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ToDoItem",
        props:{
          todo:{
            type:Object,
            type:Object,
            required:true,
          },
          checkAll:{
            type:Boolean,
            required:true,
          }
        },
      data(){
          return {
            beforeEditCache:'',
            'id':this.todo.id,
            'title':this.todo.title,
            'finished':this.todo.finished,
            'editing':this.todo.editing,
          }
      },
      created() {
          eventBus.$on('pluralize',this.handlePluralize)
      },
      beforeDestroy() {
        eventBus.$off('pluralize',this.handlePluralize)
      },
      directives:{
        focus:{
          inserted:function (el) {
            el.focus()
          }
        }
      },
      watch:{
          checkAll(){
            this.finished = this.checkAll ? true : this.todo.finished;
          },
      },
      methods:{
          removeTodo(id){
            this.$store.dispatch('deleteTodo',id)
          },
          editTodo(){
          this.beforeEditCache=this.title;
          this.editing=true;
        },
          updateTodo(){
          if (this.title.trim() == '') {
            this.title = this.beforeEditCache;
          }
          this.editing=false;
          this.$store.dispatch('updateTodo',{
            'id':this.id,
            'title': this.title,
            'finished':this.finished,
            'editing':this.editing,
          });
        },
          cancelTodo(){
          this.title=this.beforeEditCache;
          this.editing=false;
        },
        pluralize(){
            eventBus.$emit('pluralize')
        },
        handlePluralize(){
          this.title = this.title+'です';
          this.$store.dispatch('updateTodo',{
            'id':this.id,
            'title':this.title,
            'finished':this.finished,
            'editing':this.editing
          })
        }
      }
    }
</script>

<style scoped>

</style>
