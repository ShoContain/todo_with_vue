<template>
  <div>
    <input v-model="newTodo" type="text" class="todo-input"
           placeholder="何をリストに加えますか？"
           @keyup.enter="addTodo">
    <div class="lds-dual-ring" v-if="$store.state.loading"></div>
    <transition-group name="fade" enter-active-class="animate__fadeInUp" leave-active-class="animate__fadeOutDown">
    <to-do-item v-for="todo in toDosWithFilter" :key="todo.id" class="todo-item" :checkAll="!uncheckedLeft"
                :todo="todo"/>
    </transition-group>

    <div class="extra-container">
      <todo-check-all />
      <todo-item-unchecked />
    </div>

    <div class="extra-container">
      <filter-button />
      <div>
        <transition name="fade">
        <clear-all-completed/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import ToDoItem from "./ToDoItem";
  import TodoItemUnchecked from "./TodoItemUnchecked";
  import TodoCheckAll from "./TodoCheckAll";
  import FilterButton from "./FilterButton";
  import ClearAllCompleted from "./ClearAllCompleted";
  import axios from "axios";

  export default {
    name: "TodoList",
    components:{
      ToDoItem,
      TodoItemUnchecked,
      TodoCheckAll,
      FilterButton,
      ClearAllCompleted,
    },
    data() {
      return {
        newTodo: '',
        idForTodo: 3,
        beforeEditCache:'',
      }
    },
    created() {
      this.$store.dispatch('retrieveTodos')
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim().length == 0) {
          return
        }
        //stateに直接プッシュしてもデータは更新されないので
        // store.jsのミューテーションで定義したメソッドにpayload（加えるデータ)を渡してコミットする
        this.$store.dispatch('addTodo',{
          id: this.idForTodo,
          title: this.newTodo,
        })
        this.newTodo = ''
        this.idForTodo++
      },
    },
    computed:{
      uncheckedNum(){
        return this.$store.getters.uncheckedNum
      },
      uncheckedLeft(){
        return this.$store.getters.uncheckedLeft
      },
      toDosWithFilter(){
       return this.$store.getters.toDosWithFilter
      },
      showClearAllCompletedButton(){
        return this.$store.getters.showClearAllCompletedButton
        },
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

  /*スピナー*/
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-top: 20px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 32px;
    height: 32px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #90b664;
    border-color: #90b664 transparent #90b664 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
