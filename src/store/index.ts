import IProjects from "@/interfaces/IProjects";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore} from "vuex";
import { ADD_PROJECT, ALTER_PROJECT, DEFINE_PROJECT, NOTIFICATE, REMOVE_PROJECT } from "./mutations-type";
import { INotifications } from "@/interfaces/INotifications";
import { GET_PROJECTS } from "./actions-type";
import http from "@/http";

interface State {
    projects: IProjects[];
    notifications: INotifications[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        projects: [],
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
        }
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}