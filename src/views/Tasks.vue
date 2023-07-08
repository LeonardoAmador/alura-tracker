<template>
    <FormCard @whenSaveTask="saveTask" />
    <div class="list">
        <Task v-for="(task, i) in tasks" :key="i" :task="task" />
        <Box v-if="isListEmpty"> 
            You aren't very productive today :( 
        </Box>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormCard from "../components/FormCard.vue";
import Task from "../components/Task.vue";
import ITask from "../interfaces/ITask";
import Box from "../components/Box.vue";

export default defineComponent({
    name: "App",
    components: {
        FormCard,
        Task,
        Box,
    },
    data() {
        return {
            tasks: [] as ITask[],
        };
    },
    computed: {
        isListEmpty(): boolean {
            return this.tasks.length === 0;
        }
    },
    methods: {
        saveTask(task: ITask): void {
            this.tasks.push(task);
        }
    },
});
</script>
