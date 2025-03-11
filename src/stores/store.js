import { createStore } from 'vuex';
import { collection,addDoc, getDocs, deleteDoc,doc, updateDoc,Timestamp  } from 'firebase/firestore';
import { db } from './firbase';

const collectionDb = collection(db,'tasks');


export const store = createStore({
    state:{
        tasks : [],
        isEditing : false,
        selected : {},
        filtered : "all"
    },
    getters: {

        getTasks: state => {
          return state.tasks;
        },

        getIsEditing : state => state.isEditing,

        getSelected : state => state.selected,

        getFiltered : state => state.filtered

    },
    mutations : {

        addTaskLocal : (state,task) => {
            state.tasks.unshift(task);
        },

        deleteTaskLocal : (state,id) => {
            if(id){
                const idx = state.tasks.findIndex(task => task.id == id);
                if(idx != -1) state.tasks.splice(idx,1);
            }
        },

        edit : (state,id) => {
            if(id){
                const task = state.tasks.find(task => task.id == id);
                if(task){
                    state.selected = task;
                    state.isEditing = true;
                }
            }
        },

        updateSelected : (state,taskname) => {
            if(taskname){
                state.selected.taskname = taskname;
            }
        },

        updateIsEditing : (state) => state.isEditing = false,

        updateFiltered : (state,val) => state.filtered = val,

        setTasks : (state,tasks) => state.tasks= tasks

    },
    actions : {

        async fetch(){
            const querySnapShot = await getDocs(collectionDb);

            if(querySnapShot){

                querySnapShot.forEach(doc => {
                    this.state.tasks.push({
                        id:doc.id,
                        ...doc.data()
                    });
                });

            }

        },

        async add({commit},taskname){

            if(taskname){
                const newtask = {
                    taskname,
                    isDone : false,
                };
    
                const doc = await addDoc(collectionDb,newtask);
    
                commit('addTaskLocal',{
                    id:doc.id,
                    ...newtask
                });
            }

        },


        async delete({commit},id){
            if(id){
                await deleteDoc(doc(db,'tasks',id));
                commit('deleteTaskLocal',id);
            }
        },

        async update({commit},taskname){
            if(taskname){
                await updateDoc(doc(db,'tasks', this.state.selected.id), { taskname });
                commit('updateSelected',taskname)
            }
        },




    }
})