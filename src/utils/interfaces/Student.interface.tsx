import Project from "./Project.interface"

interface Student {
    carrera: string,
    horas: number,
    mail: string,
    name: string,
    phone: string,
    semestre: number,
    promedio: number,
    signeUp: boolean,
    type: string,
    uid: string,
    status: string,
    currentProject?: Project,
    pastProjects: Project[]
}

export default Student