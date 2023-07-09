import IProjects from "@/interfaces/IProjects";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore} from "vuex";
import { ADD_PROJECT, ALTER_PROJECT, NOTIFICATE, REMOVE_PROJECT } from "./mutations-type";
import { INotifications } from "@/interfaces/INotifications";

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
        [NOTIFICATE](state, newNotification: INotifications) {
            newNotification.id = new Date().getTime();
            state.notifications.push(newNotification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000)
        }
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}