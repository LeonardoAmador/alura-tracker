<template>
    <FormCard @whenSaveTask="saveTask" />
    <div class="list">
        <Task v-for="(task, i) in tasks" :key="i" :task="task" @whenClickTask="selectTask"/>
        <Box v-if="isListEmpty"> 
            You aren't very productive today :( 
        </Box>
        <div class="modal" :class="{ 'is-active': selectedTask }" v-if="selectedTask">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Edit task</p>
                    <button class="delete" aria-label="close" @click="closeModal"></button>
                </header>
                <section class="modal-card-body">
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
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="alterTask">Save changes</button>
                    <button class="button" @click="closeModal">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import FormCard from "../components/FormCard.vue";
import Task from "../components/Task.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import { ALTER_TASK, GET_PROJECTS, GET_TASKS, REGISTER_TASK } from "@/store/actions-type";
import ITask from "@/interfaces/ITask";

export default defineComponent({
    name: "App",
    components: {
        FormCard,
        Task,
        Box,
    },
    data() {
        return {
            selectedTask: null as ITask | null
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
        return {
            tasks: computed(() => store.state.task.tasks),
            store
        }
    }
});
</script>
