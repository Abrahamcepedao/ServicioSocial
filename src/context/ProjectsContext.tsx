import {createContext, useContext}  from 'react'
import React, { useState } from 'react'

//Firebase functions
import { 
    addProjectFirebase,
    getProjectsOrg,
    getAllProjects
} from '../database/funtions/projects'

const ProjectsContext = createContext<any>({})

export const useProjects = () => useContext(ProjectsContext)

export const ProjectsContextProvider = ({children}: {children:React.ReactNode}) => {
    const [projects, setProjects] = useState<any>([])

    /* add project */
    const addProject = async (project:any) => {
        console.log(project)
        return await addProjectFirebase(project)
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
        getProjectsByOrg,
        getProjects
    }}>
        {children}
    </ProjectsContext.Provider>
}