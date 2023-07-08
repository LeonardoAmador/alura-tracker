<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="" style="width: 100%">
        </h1>
        <div class="buttonContainer">
            <button class="button" @click="changeTheme">
                {{ buttonText }}
            </button>
        </div>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <router-link to="/" class="routerLink">
                        <i class="fas fa-tasks"></i>
                        Tasks
                    </router-link>
                </li>
                <li>
                    <router-link to="/projects" class="routerLink">
                        <i class="fas fa-project-diagram"></i>
                        Projects
                    </router-link>
                </li>
            </ul>
        </nav>
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

.buttonContainer {
    width: 100%;
}

.buttonContainer .button {
    width: 100%;
    border-radius: 8px;
}

.panel li {
    margin: 8px 0;
    display: grid;
    justify-content: flex-start;
    gap: 5px;
}

.routerLink {
    color: #fff;
}

.routerLink:hover {
    color: #faf0ca;
}

.routerLink.router-link-active {
    color: #faf0ca;
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