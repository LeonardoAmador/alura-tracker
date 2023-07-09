import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Tasks from '../views/Tasks.vue';
import Projects from '../views/Projects.vue';
import Form from '../views/projects/Form.vue';
import List from '../views/projects/List.vue';

const route: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tasks',
        component: Tasks
    },
    {
        path: '/projects',
        component: Projects,
        children: [
            {
                path: "",
                name: "Projects",
                component: List
            },
            {
                path: "new",
                name: "New Project",
                component: Form
            },
            {
                path: ":id",
                name: "Edit Project",
                component: Form,
                props: true
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: route
})

export default router;