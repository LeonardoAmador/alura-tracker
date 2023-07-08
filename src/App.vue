<template>
  <main class="columns is-gapless is-multiline" :class="{ 'darkMode': activeDarkMode }">
    <div class="column is-one-quarter">
      <SideBar @changeTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <FormCard @whenSaveTask="saveTask"/>
      <div class="list">
        <Task v-for="(task, i) in tasks" :key="i" :task="task"/>
        <Box v-if="isListEmpty">
          You aren't very productive today :(
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import FormCard from './components/FormCard.vue';
import Task from './components/Task.vue';
import ITask from './interfaces/ITask';
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    FormCard,
    Task,
    Box
  },
  data() {
    return {
      tasks: [] as ITask[],
      activeDarkMode: false
    }
  },
  computed: {
    isListEmpty(): boolean {
      return this.tasks.length === 0;
    }
  },
  methods: {
    saveTask(task: ITask): void {
      this.tasks.push(task);
    },
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
