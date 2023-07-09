<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="notifications">
        <article 
            class="message"
            :class="context[notification.type]" 
            v-for="notification in notifications" 
            :key="notification.id"
        >
            <div class="message-header">{{ notification.title }}</div>
            <div class="message-body"> {{notification.text}} </div>
        </article>
    </div>
</template>

<script>

import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotifications';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Notifications",
    data() {
        return {
            context: {
                [NotificationType.SUCCESS]: "is-success",
                [NotificationType.ATTENTION]: "is-warning",
                [NotificationType.FAILURE]: "is-danger"
            }
        }
    },
    setup() {
        const store = useStore();
        return {
            notifications: computed(() => store.state.notifications)
        }
    }
})

</script>

<style scoped>

.notifications {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 3;
}

</style>
