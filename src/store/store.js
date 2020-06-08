import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    filter: "all",
    toDos: [],
    loading:true,
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
      db.collection('todos').add({
        //IDはFireBaseで自動的に付与される
        title:todo.title,
        finished:false,
        created_at:new Date(),
      })
        .then(docRef=>{
          context.commit('addTodo',{
            id:docRef.id,
            title:todo.title,
            finished:false,
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    //チェック済みリスト全削除
    clearCompleted(context) {
      db.collection('todos')
        .where('finished', '==', true).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
              .then(() => {
                context.commit('clearCompleted')
              })
          })
        })
      },
    changeFilter(context, filter) {
      context.commit('changeFilter',filter)
    },
    //全てにチェックをいれる
    checkAllTodos(context,checked){
     db.collection('todos').get()
       .then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
          doc.ref.update({
            finished:checked,
          })
          .then(()=>{
            context.commit('checkAllTodos',checked)
          })
        })
       })
    },
    //削除
    deleteTodo(context, id) {
      db.collection('todos').doc(id).delete()
        .then(()=>{
          context.commit('deleteTodo',id)
        })
    },
    //更新
    updateTodo(context,todo) {
      db.collection('todos').doc(todo.id).set({
        id:todo.id,
        title:todo.title,
        finished:todo.finished,
        created_at:new Date(),
      })
        .then(()=>{
          context.commit('updateTodo',todo)
        })
        .catch(error => {
          console.log(error)
        })
    },
    retrieveTodos(context){
      context.state.loading = true
      db.collection('todos').get()
        .then(querySnapshot=>{
          let array = []
          querySnapshot.forEach(doc=>{
            const data = {
              id:doc.id,
              title:doc.data().title,
              finished:doc.data().finished,
              created_at:doc.data().created_at,
            }
            //新しい配列にプッシュ
            array.push(data);
          })
          //firebaseではIDが付与されるが表示順は保証されないのでcreated_atをソートする
          const arraySorted = array.sort((a,b)=>{
            return a.created_at.seconds - b.created_at.seconds;
          })
          context.state.loading = false
          //配列をコミットして渡す
          context.commit('retrieveTodos',arraySorted)
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
})
