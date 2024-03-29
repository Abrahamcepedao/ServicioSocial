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
    unregisterStudentFirebase,
    acceptStudentFirebase
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

    const updateFavs = (project:Project) => {
        console.log(project)
        let data = [...favs]
        let index = data.findIndex((el:Project) => el.uid === project.uid)
        if(index !== -1) {
            //let students = project.students
            data[index].students = project.students
            data[index].occupied = project.occupied
        }
        console.log(data)
        setFavs(data)
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

    /* update projects */
    const updateProjects = async (project:Project) => {
        console.log(project)
        let data = [...projects]
        let index = data.findIndex((el:Project) => el.uid === project.uid)
        if(index !== -1) {
            /* data[index].students = project.students
            data[index].occupied = project.occupied */
            data[index] = {
                ...project
            }
        }
        console.log(data)
        setProjects(data)
    }

    /* update project info */
    const updateProject = async (project:Project) => {
        const res = await updateProjectFirebase(project)
        if(res !== false) {
            updateProjects(project)
            return true
        }
        return false
        
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
        const res = await registerStudentFirebase(project, student)
        if(res !== false) {
            updateProjects(res)
            updateFavs(res)
            
        } 
        return res
    }

    /* unregister student */
    const unregisterStudent = async(project: Project, student: Student) => {
        const res = await unregisterStudentFirebase(project, student)
        if(res !== false) {
            updateProjects(res)
            updateFavs(res)
        } 
        return res
    }

    /* accept student */
    const acceptStudent = async(project: Project, student: Student) => {
        const res = await acceptStudentFirebase(project, student)
        if(res !== false) {
            updateProjects(res)
        } 
        return res
    }


    /* handle logout out */
    const logoutUser = () => {
        setFavs([])
        setProjects([])
        setSelectedProject(null)
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
        unregisterStudent,
        acceptStudent,
        logoutUser
    }}>
        {children}
    </ProjectsContext.Provider>
}