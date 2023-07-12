import http from "@/http";
import IProjects from "@/interfaces/IProjects";
import { State } from "@/store";
import { GET_PROJECTS, REGISTER_PROJECT, CHANGE_PROJECT, DELETE_PROJECT } from "@/store/actions-type";
import { ADD_PROJECT, ALTER_PROJECT, REMOVE_PROJECT, DEFINE_PROJECT } from "@/store/mutations-type";
import { Module } from "vuex";

export interface ProjectState {
    projects: IProjects[]
}

export const project: Module<ProjectState, State> = {
    mutations: {
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProjects
            state.projects.push(project)
        },
        [ALTER_PROJECT](state, project: IProjects) {
            const index = state.projects.findIndex(proj => proj.id === project.id);
            state.projects[index] = project;
        },
        [REMOVE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id)
        },
        [DEFINE_PROJECT](state, projects: IProjects[]) {
            state.projects = projects;
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
    }
}