import http from "@/http";
import ITask from "@/interfaces/ITask";
import { State } from "@/store";
import { GET_TASKS, REGISTER_TASK, ALTER_TASK } from "@/store/actions-type";
import { DEFINE_TASKS, ADD_TASK, CHANGE_TASK } from "@/store/mutations-type";
import { Module } from "vuex";

export interface TaskState {
    tasks: ITask[]
}

export const task: Module<TaskState, State> = {
    state: {
        tasks: []
    },
    mutations: {
        [DEFINE_TASKS](state, tasks: ITask[]) {
            state.tasks = tasks;
        },
        [ADD_TASK](state, task: ITask) {
            state.tasks.push(task);
        },
        [CHANGE_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(t => t.id == task.id)
            state.tasks[index] = task;
        }
    },
    actions: {
        [GET_TASKS]({ commit }, filter: string) {
            let url = 'tasks';

            if (filter) url += '?description=' + filter; 
            
            http.get(url)
                .then(response => commit(DEFINE_TASKS, response.data))
        },
        [REGISTER_TASK]({ commit }, task: ITask) {
            return http.post("/tasks", task)
                .then(response => commit(ADD_TASK, response.data))
        },
        [ALTER_TASK]({ commit }, task: ITask) {
            return http.put(`/tasks/${task.id}`, task)
                .then(() => commit(CHANGE_TASK, task));
        }
    }
}
