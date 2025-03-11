<script setup lang="ts">
    import { computed, onMounted, reactive,ref } from 'vue';
    import AppForm from './components/AppForm.vue';
    import AppList from './components/AppList.vue';
    import { store } from './stores/store';




    const getIsEditing = computed<boolean>(() => store.getters.getIsEditing);

    const addNewTask = async (taskname:string) => {
        if(!getIsEditing.value){
            //create
            await store.dispatch('add',taskname);
        }else{
            await store.dispatch('update',taskname);
        }
    }


    onMounted(async () => {
        await store.dispatch('fetch');
    })


</script>

<template>
    <main class="card">

        <h1 class="title">Todo-List</h1>

        <app-form @submit="addNewTask"></app-form>

        <app-list></app-list>

    </main>
</template>

<style scoped>
.card{
    width: 400px;
    background-color: #f4f4f4;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 5px 10px 10px #999;
}
.title{
    text-align: center;
    color: steelblue;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}


</style>
