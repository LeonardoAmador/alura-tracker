<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Stopwatch :seconds="seconds" />
        <Button @clicked="start" icon="fas fa-play" text="play" :disabled="timerRunning"/>
        <Button @clicked="finish" icon="fas fa-stop" text="stop" :disabled="!timerRunning"/>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import Stopwatch from './Stopwatch.vue';
import Button from './Button.vue';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Timer",
    emits: ["timerEnded"],   
    components: {
        Stopwatch,
        Button
    },
    data() {
        return {
            seconds: 0,
            timer: 0,
            timerRunning: false
        }
    },
    methods: {
        start() {
            this.timerRunning = true;
            this.timer = setInterval(() => {
                this.seconds += 1;
            }, 1000);
        },
        finish() {
            this.timerRunning = false;
            clearInterval(this.timer);
            this.$emit("timerEnded", this.seconds);
            this.seconds = 0;
        }
    }  
})

</script>