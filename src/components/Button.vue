<template>
    <button class="button" @click="clicked" :disabled="disabled">
        <span class="icon">
            <i :class="icon"></i>
        </span>
        <span>{{ text }}</span>
    </button>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Button",
    emits: ["clicked"],
    props: {
        disabled: {
            type: Boolean
        },
        icon: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    methods: {
        clicked(): void {
            this.$emit("clicked")
        }
    }
})

</script>
