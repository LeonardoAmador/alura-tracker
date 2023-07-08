<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Form to create a new task">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="What task would you like to start?"
                    v-model="description"
                    >
            </div>
            <div class="column">
                <Timer @timerEnded="timerEnded"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Timer from './Timer.vue';

export default defineComponent({
    name: "FormCard",
    emits: ["whenSaveTask"],
    components: {
        Timer
    },
    data() {
        return {
            description: ""
        }
    },
    methods: {
        timerEnded(elapsedTime: number): void {
            this.$emit("whenSaveTask", {
                secondDuration: elapsedTime,
                description: this.description
            })
            this.description = "";
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