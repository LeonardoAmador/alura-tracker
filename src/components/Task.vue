<template>
    <Box>
        <div class="columns clickable" @click="clickedTask">
            <div class="column is-4">
                {{ task.description || "Task without description" }}
            </div>
            <div class="column is-3">
                {{ task.project?.name || 'N/D' }}
            </div>
            <div class="column">
                <Stopwatch :seconds="task.secondDuration"/>
            </div>
        </div>
    </Box>
</template>

<script lang="ts">

import ITask from '@/interfaces/ITask';
import { defineComponent, PropType } from 'vue'
import Stopwatch from "./Stopwatch.vue";
import Box from './Box.vue';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Task",
    components: {
        Stopwatch,
        Box
    },
    emits: ["whenClickTask"],
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    },
    setup(props, { emit }) {
        
        const clickedTask = (): void => {
            emit("whenClickTask", props.task)
        }

        return { clickedTask }
    }
})

</script>

<style scoped>

.clickable {
    cursor: pointer;
}

</style>
