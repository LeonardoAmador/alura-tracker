<template>
    <FormCard @whenSaveTask="saveTask" />
    <div class="list">
        <div class="field">
            <p class="control has-icons-left">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Enter to filter" 
                    v-model="filter"
                >
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Box v-if="isListEmpty">
            You aren't very productive today 
            <span class="has-text-weight-bold">:(</span>
        </Box>
        <Task v-for="(task, i) in tasks" :key="i" :task="task" @whenClickTask="selectTask"/>
        <Modal :show="selectedTask != null">
            <template v-slot:header>
                <p class="modal-card-title">Edit task</p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </template>
            <template v-slot:body>
                <div class="field">
                    <label for="taskDescription" class="label">
                        Description: 
                    </label>
                    <input 
                        type="text" 
                        class="input" 
                        id="taskDescription" 
                        v-model="selectedTask.description"
                    />
                </div>
            </template>
            <template v-slot:footer>
                <button class="button is-success" @click="alterTask">Save changes</button>
                <button class="button" @click="closeModal">Cancel</button>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import FormCard from "../components/FormCard.vue";
import Task from "../components/Task.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import { ALTER_TASK, GET_PROJECTS, GET_TASKS, REGISTER_TASK } from "@/store/actions-type";
import ITask from "@/interfaces/ITask";
import Modal from '../components/Modal.vue';

export default defineComponent({
    name: "App",
    components: {
        FormCard,
        Task,
        Box,
        Modal
    },
    data() {
        return {
            selectedTask: null as ITask | null,
        }
    },
    methods: {
        saveTask(task: ITask): void {
            this.store.dispatch(REGISTER_TASK, task);
        },
        selectTask(task: ITask) {
            this.selectedTask = task;
        },
        closeModal() {
            this.selectedTask = null;
        },
        alterTask() {
            this.store.dispatch(ALTER_TASK, this.selectedTask)
                .then(() => this.closeModal());
        }
    },
    computed: {
        isListEmpty(): boolean {
            return this.tasks.length === 0;
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(GET_TASKS);
        store.dispatch(GET_PROJECTS);
        
        const filter = ref("");

        watchEffect(() => {
            store.dispatch(GET_TASKS, filter.value);
        });

        return {
            tasks: computed(() => store.state.task.tasks),
            store,
            filter
        }
    }
});
</script>
