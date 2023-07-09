<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section>
        <strong class="display">
            <span class="icon">
                <i class="fa-regular fa-clock"></i>
            </span>
            <span class="time">{{ timeRunning }}</span>
        </strong>
    </section>
</template>

<script lang="ts">

import { defineComponent } from "vue"

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Stopwatch",
    props: {
        seconds: {
            type: Number,
            default: 0
        }
    },
    computed: {
        timeRunning(): string {
            return new Date(this.seconds * 1000).toISOString().substr(11, 8);
        }
    },
})

</script>

<style scoped>

.display {
    color: var(--primary-text);
    display: flex;
    align-items: center;
}

.time {
    margin-right: .5rem;
}

</style>