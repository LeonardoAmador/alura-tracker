<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="projects">
        <h1 class="title">Projects</h1>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Projects'
})

</script>

<style scoped>

.projects {
    padding: 1.25rem;
}

</style>