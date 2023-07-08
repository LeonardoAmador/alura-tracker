import IProjects from "@/interfaces/IProjects";
import { InjectionKey } from "vue";
import { Store, createStore } from "vuex";

interface State {
    projects: IProjects[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        projects: [
            {
                id: new Date().toISOString(),
                name: "TypeScript"
            },
            {
                id: new Date().toISOString(),
                name: "Vue"
            },
            {
                id: new Date().toISOString(),
                name: "Vuex"
            }
        ]
    }
});