<template>
  <div>
    <input v-model="newTodo" type="text" class="todo-input"
           placeholder="何をリストに加えますか？"
           @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animate__fadeInUp" leave-active-class="animate__fadeOutDown">
    <to-do-item v-for="(todo,index) in toDosWithFilter" :key="todo.id" class="todo-item" :checkAll="!uncheckedLeft"
                :todo="todo" :index="index" />
    </transition-group>

    <div class="extra-container">
      <div>
        <label><input @change="ckeckAllTodos" type="checkbox" :checked="!uncheckedLeft"
        >全てチェック</label>
      </div>
      <div v-if="uncheckedLeft">{{ uncheckedNum }}個のタスクが未完了です</div>
      <div v-else>タスクは全て完了しています</div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{active:filter==='all'}" @click="filter='all'">全てのタスク</button>
        <button :class="{active:filter==='uncompletedAll'}" @click="filter='uncompletedAll'">未完了のタスク</button>
        <button :class="{active:filter==='completedAll'}" @click="filter='completedAll'">完了したタスク</button>
      </div>

      <div>
        <transition name="fade">
        <button v-if="showClearAllCompletedButton" @click="clearAllCompleted">完了したタスクを削除</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import ToDoItem from "./ToDoItem";
  export default {
    name: "TodoList",
    components:{
      ToDoItem
    },
    data() {
      return {
        newTodo: '',
        idForTodo: 3,
        beforeEditCache:'',
        filter:"all",
        toDos: [
          {
            "id": 1,
            "title": '料理',
            'finished': false,
            'editing':false,
          },
          {
            "id": 2,
            "title": 'サッカー',
            'finished': true,
            'editing':false,
          }
        ]
      }
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim().length == 0) {
          return
        }
        this.toDos.push({
          id: this.idForTodo,
          title: this.newTodo,
          finished: false,
        })
        this.newTodo = ''
        this.idForTodo++
      },
      removeTodo(index) {
        this.toDos.splice(index, 1)
      },
      ckeckAllTodos(){
        this.toDos.forEach((todo)=>todo.finished=event.target.checked)
      },
      clearAllCompleted(){
        this.toDos = this.toDos.filter(todo=>!todo.finished)
      },
      finishUpdate(data){
        this.toDos.splice(data.index,1,data.todo);
      }
    },
    computed:{
      uncheckedNum(){
          return this.toDos.filter(todo=>!todo.finished).length;
      },
      uncheckedLeft(){
        return this.uncheckedNum !=0;
      },
      toDosWithFilter(){
        if (this.filter==='all'){
          return this.toDos
        }else if(this.filter==='uncompletedAll'){
          return this.toDos.filter(todo=>!todo.finished);
        }else if(this.filter==='completedAll'){
          return this.toDos.filter(todo=>todo.finished);
        }else{
          return this.toDos;
        }
      },
      showClearAllCompletedButton(){
        return this.toDos.filter(todo=>todo.finished).length>0
        },
    },
    created() {
      eventBus.$on('removeTodo',(index)=>this.removeTodo(index))
      eventBus.$on('finishUpdate',(data)=>this.finishUpdate(data))
    },
  }
</script>

<style lang="scss">
  button{
    outline: none;
    cursor: pointer;
  }
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 15px;

    &:focus {
      outline: none;
    }
  }

  .todo-item {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation-duration: .6s;

    .remove-item {
      cursor: pointer;
      background: purple;
      color: white;
      padding: 5px;
      border-radius: 10%;
      &:hover {
        background: lighten(purple,5%);
      }
    }
  }

  .todo-item-left{
    display: flex;
    align-items: center;
  }
  .todo-item-label{
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  /*ダブルクリック後にinputをtrueにして入力できるようにする*/
  .todo-item-edit{
    font-size: 24px;
    color: #323030;
    width: 100%;
    margin-left: 12px;
    padding: 8px;
    border-radius: 5%;
    border: 1px solid #ccc;
    &:focus{
      outline: none;
    }
  }

  .completed{
    text-decoration: line-through;
    color: black;
  }
  .extra-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #d3c4e7;
    padding-top: 10px;
    margin: 30px 0;
  }
  .active{
    background: #7dcda8;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
