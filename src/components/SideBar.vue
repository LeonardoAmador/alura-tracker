<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <button class="button" @click="changeTheme">
            {{ buttonText }}
        </button>
    </header>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: "SideBar",
    emits: ["changeTheme"],
    data() {
        return {
            darkMode: false
        }
    },
    computed: {
        buttonText() {
            if (this.darkMode) {
                return 'Disable Dark Mode';
            }
            return 'Active Dark Mode';
        }
    },
    methods: {
        changeTheme() {
            this.darkMode = !this.darkMode;
            this.$emit("changeTheme", this.darkMode);
        }
    }
}) 

</script>

<style scoped>

header {
    width: 100%;
    height: 100vh;
    background-color: #0d3b66;
    padding: 1rem;
    text-align: center;
}

.button {
    width: 100%;
    border-radius: 8px;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }

    .button {
        width: 54.5%;
        border-radius: 8px;
    }
}

</style>