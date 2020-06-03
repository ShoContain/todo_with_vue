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
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>
</template>

<script>
    export default {
        name: "ToDoItem",
        props:{
          todo:{
            type:Object,
            required:true,
          },
          index:{
            type: Number,
            required: true,
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
          removeTodo(index){
            eventBus.$emit('removeTodo',index);
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
          eventBus.$emit('finishUpdate',{
            'index':this.index,
            'todo': {
              'id':this.id,
              'title': this.title,
              'finished':this.finished,
              'editing':this.editing,
            }
          });
        },
          cancelTodo(){
          this.title=this.beforeEditCache;
          this.editing=false;
        },
      }
    }
</script>

<style scoped>

</style>
