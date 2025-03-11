<template>
    <li class="list-group-items" :class="{'done':task.isDone}">

        <div class="text-box"  @click="checkHandler">
            <div class="form-check">
                <input type="checkbox" class="form-check-input" v-model="task.isDone"/>
            </div>
            <div class="text">
                <p>{{ task.taskname }}</p>
            </div>
        </div>

        <div class="edit-box">
            <button type="button" class="edit-btn" @click="edit">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="del-btn" @click="del">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>

    </li>
</template>

<script setup>
    import { db } from '@/stores/firbase';
    import { store } from '@/stores/store';
    import { doc,updateDoc } from 'firebase/firestore';

    const props = defineProps({
        task:{
            type : Object,
            required : true
        }
    });



    function checkHandler(){

        // firebase
        const taskdoc = doc(db,'tasks',props.task.id);
        updateDoc(taskdoc,{
            isDone : !props.task.isDone
        });

        // local
        props.task.isDone = !props.task.isDone;

    }


    function edit(){
        store.commit('edit',props.task.id);
    }

    function del(){
        store.dispatch('delete',props.task.id);
    }


</script>

<style scoped>
    .list-group-items{
        width: 98%;
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 20px;
        margin-bottom: 10px;
        box-shadow: 5px 5px 5px #999;
        position: relative;
        overflow: visible;
    }
    .text-box{
        width: 80%;
        display: flex;
    }
    .form-check{
        margin-right: 10px;
    }
    .form-check-input{
        accent-color: green;
    }
    .done{
        background-color: steelblue;
        color: white;
        font-style: italic;
    }

    .text{
        width: 90%;
    }

    .text p{
        width: 100%;
        overflow: hidden;
        text-overflow:ellipsis ;
        text-wrap: nowrap;
        margin: 0;
        padding: 0;
    }
    .text::selection{
        background-color: red;
        color: white;
    }

    .edit-btn,.del-btn{
        background-color: transparent;
        border: 0;
        font-size: 16px;
    }
    .edit-btn{
        color: skyblue;
    }
    .del-btn{
        color: red;
    }

</style>