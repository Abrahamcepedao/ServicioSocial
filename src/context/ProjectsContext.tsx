import {createContext, useContext}  from 'react'
import React, { useState } from 'react'

//Firebase functions
import { 
    addProjectFirebase,
    getProjectsOrg
} from '../database/funtions/projects'

const ProjectsContext = createContext<any>({})

export const useProjects = () => useContext(ProjectsContext)

export const ProjectsContextProvider = ({children}: {children:React.ReactNode}) => {
    const [projects,setProjects] = useState<any>(null)


    const addProject = async (project:any) => {
        console.log(project)
        return await addProjectFirebase(project)
    }

    const getProjectsByOrg = async (org:string) => {
        console.log(org)
        const res = await getProjectsOrg(org)
        console.log(res)
        if(res !== false) {
            setProjects(res)
            return res
        } else {
            return false
        }
    }


    return <ProjectsContext.Provider value={{projects, addProject, getProjectsByOrg }}>
        {children}
    </ProjectsContext.Provider>
}