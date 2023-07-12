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

import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotifications';
import useNotificator from '@/hooks/notificator';
import { CHANGE_PROJECT, REGISTER_PROJECT } from '@/store/actions-type';
import { useRouter } from 'vue-router';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Form",
    props: {
        id: { type: String }
    },
    setup(props) {
        const router = useRouter()

        const store = useStore();
        const { notificate } = useNotificator();

        const projectName = ref("");

        if (props.id) {             
            const project = store.state.project.projects.find(proj => proj.id == props.id);
            projectName.value = project?.name ?? "";
        }

        const saveProject = () => {
            if (props.id) {
                store.dispatch(CHANGE_PROJECT, {
                    id: props.id,
                    name: projectName.value
                }).then(() => handleSuccess());
            } else {
                store.dispatch(REGISTER_PROJECT, projectName.value)
                    .then(() => handleSuccess());
            }
        }

        const handleSuccess = () => {
            projectName.value = "";
            notificate(NotificationType.SUCCESS, 'Great!', 'Your project is already available')
            router.push('/projects')
        }

        return { projectName, saveProject }
    }
})

</script>