import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// ベースURL
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
export const store = new Vuex.Store({
  state: {
    filter: "all",
    toDos: [],
  },
    getters:{
      uncheckedNum(state){
        return state.toDos.filter(todo=>!todo.finished).length;
      },
      uncheckedLeft(state,getters){
        return getters.uncheckedNum !=0;
      },
      toDosWithFilter(state){
        if (state.filter==='all'){
          return state.toDos
        }else if(state.filter==='uncompletedAll'){
          return state.toDos.filter(todo=>!todo.finished);
        }else if(state.filter==='completedAll'){
          return state.toDos.filter(todo=>todo.finished);
        }else{
          return state.toDos;
        }
      },
      showClearAllCompletedButton(state){
        return state.toDos.filter(todo=>todo.finished).length>0
      },
    },
  mutations:{
    //commitされたデータ（ペイロード）をstateに加える
    addTodo(state,todo){
      state.toDos.push({
        id:todo.id,
        title:todo.title,
        finished:false,
        editing:false,
      })
    },
    clearCompleted(state){
      state.toDos = state.toDos.filter(todo=>!todo.finished)
    },
    changeFilter(state,filter){
      state.filter = filter
    },
    checkAllTodos(state,checked){
      state.toDos.forEach(todo=>(todo.finished = checked))
    },
    deleteTodo(state,id){
      const index = state.toDos.findIndex(item=>item.id === id)
      state.toDos.splice(index,1)
    },
    updateTodo(state,todo){
      const index = state.toDos.findIndex(item=>item.id === todo.id)
      state.toDos.splice(index,1,{
        'id':todo.id,
        'title': todo.title,
        'finished':todo.finished,
        'editing':todo.editing,
      })
    },
    retrieveTodos(state,todos){
      state.toDos = todos
    },
  },
  actions:{
    //コンポーネントのmethodsからcommitを使ってmutationsを実行するのではなくシンプルな処理でもactionsを通してmutationsを実行する。
    //commitされたデータ（ペイロード）をstateに加える
    //axiosを使う際などはactionsで非同期処理を行う

    // 追加
    addTodo(context, todo) {
      axios.post('/todos',{
        title:todo.title,
        finished:false,
      })
        .then(response=>{
          context.commit('addTodo',response.data)
        })
        .catch(error => {
          console.log(error())
        })
    },
    clearCompleted(context) {
      // チェック済みの配列を定義
      const finished = store.state.toDos
        .filter(todo=>todo.finished)
        .map(todo=>todo.id)

      axios.delete('/clearCompleted',{
        //deleteリクエストではデータオブジェクトを渡す
        data:{
          todos:finished,
        }
      })
        .then(response=>{
          context.commit('clearCompleted')
        })
        .catch(error => {
          console.log(error())
        })
      },
    changeFilter(context, filter) {
      context.commit('changeFilter',filter)
    },
    //全てにチェックをいれる
    checkAllTodos(context,checked) {
      axios.patch('/checkAllTodo',{
        finished:checked
      })
        .then(response=>{
          context.commit('checkAllTodos',checked)
        })
        .catch(error => {
          console.log(error())
        })
    },
    //削除
    deleteTodo(context, id) {
      axios.delete('/todos/'+id)
        .then(response=>{
          context.commit('deleteTodo',id)
        })
        .catch(error => {
          console.log(error())
        })
    },
    //更新
    updateTodo(context,todo) {
      axios.patch('/todos/'+todo.id,{
        title:todo.title,
        finished:todo.finished,
      })
        .then(response=>{
          context.commit('updateTodo',response.data)
        })
        .catch(error => {
          console.log(error())
        })
    },
    retrieveTodos(context){
      axios.get('/todos')
        .then(response=>{
          context.commit('retrieveTodos',response.data)
        })
        .catch(error => {
          console.log(error())
        })
    },
  }
})
