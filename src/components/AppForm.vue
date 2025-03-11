<template>
    <form @submit.prevent="submit">

            <div>
                <input 
                    ref="input"
                    type="text" 
                    name="task" 
                    id="task" 
                    class="form-control" 
                    placeholder="Enter Your Task"
                    v-model.trim="gettaskname"
                    @keyup="textHandler"
                />
            </div>

            <div class="count-wrapper">

                <div class="role">
                    <span v-if="isEditing" class="edit">Editing</span>
                    <span v-else class="create">Creating</span>
                </div>

                <div class="count">
                    {{ textcount }} / {{ maxcount }}
                </div>

            </div>

            <div class="filter-wrapper">
                <select @change="filter" class="form-select">
                    <option value="all" selected>All</option>
                    <option value="checked">Checked</option>
                    <option value="uncheck">Uncheck</option>
                </select>
            </div>

    </form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { store } from '@/stores/store';



    const taskname = ref<string>('');
    const maxcount:number = 50;
    const input = ref<HTMLInputElement | null>(null);

    const emits = defineEmits(['submit']);

    const textcount = computed(() => gettaskname.value.length);
    const isEditing = computed(() => {
        return store.getters.getIsEditing
    });

    const textHandler = (e) => {
        const input = e.target as HTMLInputElement;
        if(input.value.length < maxcount){
            taskname.value = input.value
        }else{
            taskname.value = input.value = input.value.substring(0,maxcount);
        }
    }

    const submit = () => {

        emits('submit',taskname.value);

        store.commit('updateIsEditing');

        taskname.value = '';

        input.value.focus();

    }

    const gettaskname = computed({
        get(){
            if(isEditing.value && !taskname.value){
                input.value?.focus();
                return taskname.value = store.getters.getSelected?.taskname;
            }

            return taskname.value
        },
        set(newValue){
            taskname.value = newValue;
        }
    });


    const filter = (e) => {
        const select = e.target as HTMLSelectElement;
        store.commit('updateFiltered',select.value);
    }

    onMounted(() => {
        input.value.focus();
    })


</script>

<style scoped>
    form{
        margin-bottom: 20px;
    }
    .form-control{
        display: inline-block;
        width: 100%;
        background-color: transparent;
        outline: none;
        border: none;
        border-bottom: 1px solid blue;
        padding: 10px;
        transition: padding .2s ease-in;
    }
    .form-control:focus{
        border-bottom: 1px solid green;
    }
    .count-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .role{
        margin-right: 20px;
    }
    .role .edit{
        color: steelblue;
    }
    .role .create{
        color: green;
    }
    .count{
        color: #999;
    }

    .filter-wrapper{
        display: flex;
        justify-content: start;
    }

    .form-select{
        background-color: steelblue;
        color: white;
        border: none;
        outline: none;
        padding: 5px 10px;
    }

</style>