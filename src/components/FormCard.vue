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
                <Timer @timerEnded="timerEnded"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
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
    data() {
        return {
            description: "",
            projectId: ""
        }
    },
    methods: {
        timerEnded(elapsedTime: number): void {
            const project = this.projects.find((p) => p.id == this.projectId);

            if (!project) {
                this.store.commit(NOTIFICATE, {
                    title: "Ops!",
                    text: "Select a project before finishing a task!",
                    type: NotificationType.FAILURE
                });
                return;
            }

            this.$emit("whenSaveTask", {
                secondDuration: elapsedTime,
                description: this.description,
                project: this.projects.find(proj => proj.id == this.projectId)
            })
            this.description = "";
        }
    },
    setup() {
        const store = useStore(key);
        return {
            projects: computed(() => store.state.project.projects),
            store
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