<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="box has-text-weight-bold" :style="styles">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Box",
    data() {
        return {
            styles: {
                backgroundColor: '#FAF0CA'
            }
        }
    }
})
</script>


