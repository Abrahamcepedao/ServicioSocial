import {createContext, useContext}  from 'react'
import React, { useState } from 'react'

//Firebase functions
import { 
    addProjectFirebase,
    getProjectsOrg,
    getAllProjects,
    updateProjectFirebase,
    deleteProjectFirebase
} from '../database/funtions/projects'

//Interfaces
import Project from '@/utils/interfaces/Project.interface'
import ProjectAdmin from '@/utils/interfaces/ProjectAdmin.interface'

const ProjectsContext = createContext<any>({})

export const useProjects = () => useContext(ProjectsContext)

export const ProjectsContextProvider = ({children}: {children:React.ReactNode}) => {
    const [projects, setProjects] = useState<Array<Project>>([])
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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


    return <ProjectsContext.Provider value={{
        projects, 
        addProject, 
        updateProject,
        deleteProject,
        getProjectsByOrg,
        getProjects,
        setProject,
        selectedProject,
    }}>
        {children}
    </ProjectsContext.Provider>
}