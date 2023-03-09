import {createContext, useContext}  from 'react'
import React, { useState, useEffect } from 'react'

//Firebase functions
import { 
    addProjectFirebase,
    getProjectsOrg,
    getAllProjects,
    updateProjectFirebase,
    deleteProjectFirebase,
    registerStudentFirebase,
    unregisterStudentFirebase
} from '../database/funtions/projects'

//Interfaces
import Project from '@/utils/interfaces/Project.interface'
import Student from '@/utils/interfaces/Student.interface'

const ProjectsContext = createContext<any>({})

export const useProjects = () => useContext(ProjectsContext)

export const ProjectsContextProvider = ({children}: {children:React.ReactNode}) => {
    const [projects, setProjects] = useState<Array<Project>>([])
    const [favs, setFavs] = useState<Array<Project | null>>([])
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        if(localStorage.getItem("ss__favs")) {
            let data:Project[] | null = JSON.parse(localStorage.getItem("ss__favs") || "[]")
            console.log(data)
            //@ts-ignore
            setFavs(data)
        }
    },[])

    /* add to fav */
    const addFav = (project:Project) => {
        let data = [...favs]
        data.push(project)
        setFavs(data)

        localStorage.setItem("ss__favs", JSON.stringify(data))
    }

    const deleteFav = (uid:string) => {
        let data = [...favs]
        if(data.length !== 0) {
            //@ts-ignore
            data = data.filter((el:Project) => el.uid !== uid)
        }
        setFavs(data)

        localStorage.setItem("ss__favs", JSON.stringify(data))
    }

    /* set project */
    const setProject = (project:Project) => {
        setSelectedProject(project)
    }

    /* add project */
    const addProject = async (project:Project) => {
        return await addProjectFirebase(project)
    }

    /* update project info */
    const updateProject = async (project:Project) => {
        return await updateProjectFirebase(project)
    }

    /* delete project */
    const deleteProject = async (uid:string) => {
        return await deleteProjectFirebase(uid)
    }

    /* get project by organization */
    const getProjectsByOrg = async (org:string) => {
        
        const res = await getProjectsOrg(org)
        console.log(res)
        if(res !== false) {
            setProjects(res)
            return res
        } else {
            return false
        }
    }

    /* get all projects */
    const getProjects = async () => {
        const res = await getAllProjects()
        
        if(res !== false) {
            setProjects(res)
            return res
        } else {
            return false
        }
    }

    /* register student */
    const registerStudent = async (project: Project, student:Student) => {
        return await registerStudentFirebase(project, student)
    }

    /* unregister student */
    const unregisterStudent = async(project: Project, student: Student) => {
        return await unregisterStudentFirebase(project, student)
    }


    return <ProjectsContext.Provider value={{
        projects, 
        addProject, 
        updateProject,
        deleteProject,
        getProjectsByOrg,
        getProjects,
        setProject,
        selectedProject,
        favs,
        addFav,
        deleteFav,
        registerStudent,
        unregisterStudent
    }}>
        {children}
    </ProjectsContext.Provider>
}