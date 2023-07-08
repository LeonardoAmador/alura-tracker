import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Tasks from '../views/Tasks.vue';
import Projects from '../views/Projects.vue';

const route: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tasks',
        component: Tasks
    },
    {
        path: "/projects",
        name: "Projects",
        component: Projects
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: route
})

export default router;