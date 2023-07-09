import IProjects from "@/interfaces/IProjects";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore} from "vuex";
import { ADD_PROJECT, ADD_TASK, ALTER_PROJECT, DEFINE_PROJECT, DEFINE_TASKS, NOTIFICATE, REMOVE_PROJECT } from "./mutations-type";
import { INotifications } from "@/interfaces/INotifications";
import { CHANGE_PROJECT, DELETE_PROJECT, GET_PROJECTS, GET_TASKS, REGISTER_PROJECT, REGISTER_TASK } from "./actions-type";
import http from "@/http";
import ITask from "@/interfaces/ITask";

interface State {
    projects: IProjects[],
    tasks: ITask[],
    notifications: INotifications[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        projects: [],
        tasks: [],
        notifications: []
    },
    mutations: {
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProjects
            state.projects.push(project)
        },
        [ALTER_PROJECT](state, project: IProjects) {
            const index = state.projects.findIndex(proj => proj.id = project.id);
            state.projects[index] = project;
        },
        [REMOVE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id)
        },
        [DEFINE_PROJECT](state, projects: IProjects[]) {
            state.projects = projects;
        },
        [DEFINE_TASKS](state, tasks: ITask[]) {
            state.tasks = tasks;
        },
        [ADD_TASK](state, task: ITask) {
            state.tasks.push(task);
        },
        [NOTIFICATE](state, newNotification: INotifications) {
            newNotification.id = new Date().getTime();
            state.notifications.push(newNotification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000)
        }
    },
    actions: {
        [GET_PROJECTS]({ commit }) {
            http.get("projects")
                .then(response => commit(DEFINE_PROJECT, response.data))
        },
        [REGISTER_PROJECT](context, projectName: string) {
            return http.post("/projects", {
                name: projectName
            })
        },
        [CHANGE_PROJECT](context, project: IProjects) {
            return http.put(`/projects/${project.id}`, project);
        },
        [DELETE_PROJECT]({ commit }, id: string) {
            return http.delete(`/projects/${id}`)
                .then(() => commit(REMOVE_PROJECT, id));
        },
        [GET_TASKS]({ commit }) {
            http.get("tasks")
                .then(response => commit(DEFINE_TASKS, response.data))
        },
        [REGISTER_TASK]({ commit }, task: ITask) {
            return http.post("/tasks", task)
                .then(response => commit(ADD_TASK, response.data))
        },
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}