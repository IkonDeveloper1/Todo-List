<template>
    <div>
        <draggable-component  
            v-if="tasks.length > 0" 
            v-model="tasks" 
            class="list-group" 
            tag="ul"
            itemKey="id"
            @update:modelValue="onTaskReorder"
        >

            <template #item="{ element: task }">
                <list-item :task="task" :key="task.id"></list-item>
            </template>

        </draggable-component>

        <div v-else class="nothing">Nothing here!</div>

    </div>
</template>

<script lang="ts" setup>
    import ListItem from './ListItem.vue';
    import { ref,computed, watchEffect } from 'vue';
    import { store } from '@/stores/store';
    import draggableComponent from 'vuedraggable';
   

    interface Task{
        id : string,
        taskname : string,
        isDone : boolean
    }

    const tasks = ref([]);

    const filter = computed(() => store.getters.getFiltered);


    const gettasks = computed<Task[]>(() => {

        if(filter.value === "all"){

            return store.getters.getTasks;

        }else if(filter.value === "checked"){

            return  store.getters.getTasks.filter(task => task.isDone == true);

        }else{

            return  store.getters.getTasks.filter(task => task.isDone == false);

        }
    });

    watchEffect(() => {
        tasks.value = gettasks.value;
    });

    const onTaskReorder = (newOrder) => {
        tasks.value = newOrder;  
        store.commit('setTasks', newOrder);  
    };

</script>

<style  scoped>
    
.list-group{
    max-height: 230px;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
}

.nothing{
    color: #777;
    text-align: center;
}

</style>