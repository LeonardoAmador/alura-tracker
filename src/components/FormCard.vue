<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Form to create a new task">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="What task would you like to start?"
                    v-model="description"
                    >
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="projectId">
                        <option value="">Select Project</option>
                        <option 
                            :value="project.id"
                            v-for="project in projects"
                            :key="project.id"
                        >
                            {{project.name}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Timer @timerEnded="saveTask"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import Timer from './Timer.vue';
import { useStore } from 'vuex';
import { key } from '@/store'
import { NOTIFICATE } from '@/store/mutations-type';
import { NotificationType } from '@/interfaces/INotifications';

export default defineComponent({
    name: "FormCard",
    emits: ["whenSaveTask"],
    components: {
        Timer
    },
    setup(props, { emit }) {
        const store = useStore(key);

        const description = ref("");
        const projectId = ref("");

        const projects = computed(() => store.state.project.projects);

        const saveTask = (elapsedTime: number): void => {
            const project = projects.value.find((p) => p.id == projectId.value);

            if (!project) {
                store.commit(NOTIFICATE, {
                    title: "Ops!",
                    text: "Select a project before finishing a task!",
                    type: NotificationType.FAILURE
                });
                return;
            }

            emit("whenSaveTask", {
                secondDuration: elapsedTime,
                description: description.value,
                project: projects.value.find(proj => proj.id == projectId.value)
            })
            description.value = "";
        }

        return {
            projects,
            description,
            projectId,
            saveTask
        }
    }
})

</script>

<style>

.form {
    color: var(--primary-text);
    background-color: var(--primary-bg);
}

</style>