import IProjects from "./IProjects";
export default interface ITask {
    secondDuration: number,
    description: string,
    project: IProjects,
    id: number
}