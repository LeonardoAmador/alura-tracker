import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore} from "vuex";
import { NOTIFICATE } from "./mutations-type";
import { INotifications } from "@/interfaces/INotifications";
import { ProjectState, project } from "./modules/project";
import { TaskState, task } from "./modules/tasks";
export interface State {
    notifications: INotifications[];
    task: TaskState;
    project: ProjectState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        notifications: [],
        task: {
            tasks: []
        },
        project: {
            projects: []
        }
    },
    mutations: {
        [NOTIFICATE](state, newNotification: INotifications) {
            newNotification.id = new Date().getTime();
            state.notifications.push(newNotification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000)
        }
    },
    modules: {
        project,
        task
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}