<template>
  <main class="columns is-gapless is-multiline" :class="{ 'darkMode': activeDarkMode }">
    <div class="column is-one-quarter">
      <SideBar @changeTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
  },
  data() {
    return {
      activeDarkMode: false
    }
  },
  methods: {
    changeTheme(mode: boolean) {
      this.activeDarkMode = mode;
    }
  }
});

</script>

<style>

.list {
  padding: 1.25rem;
}

main {
  --primary-bg: #fff;
  --primary-text: #000;
}

main.darkMode {
  --primary-bg: #2b2d42;
  --primary-text: #ddd;
}

.content {
  background-color: var(--primary-bg);
}

</style>
