<template>
    <section>
        <form @submit.prevent="saveProject">
            <div class="field">
                <label for="projectName" class="label">
                    Project Name: 
                </label>
                <input 
                    type="text" 
                    class="input" 
                    id="projectName" 
                    v-model="projectName"
                />
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Save
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotifications';
import useNotificator from '@/hooks/notificator';
import { CHANGE_PROJECT, REGISTER_PROJECT } from '@/store/actions-type';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Form",
    props: {
        id: { type: String }
    },
    mounted () {
        if (this.id) {
            const project = this.store.state.project.projects.find(proj => proj.id == this.id);
            this.projectName = project?.name ?? "";
        }
    },
    data() {
        return {
            projectName: ""
        }
    },
    methods: {
        saveProject() {
            if (this.id) {
                this.store
                    .dispatch(CHANGE_PROJECT, {
                        id: this.id,
                        name: this.projectName
                    }).then(() => this.handleSuccess());
            } else {
                this.store
                    .dispatch(REGISTER_PROJECT, this.projectName)
                    .then(() => this.handleSuccess());
            }
        },
        handleSuccess() {
            this.projectName = "";
                this.notificate(NotificationType.SUCCESS, 'Great!', 'Your project is already available')
                this.$router.push('/projects')
        }
    },
    setup() {
        const store = useStore();
        const { notificate } = useNotificator();
        return {
            store,
            notificate
        }
    }
})

</script>