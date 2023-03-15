//React
import React, { useEffect, useState } from 'react';

//Context
import { useAuth } from '../../context/AuthContext'
//Material UI
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//Components
import Project from './CurrentProject';

//Interfaces
import IProject from '@/utils/interfaces/Project.interface';

//Material UI - Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Projects = () => {
    //context
    const { user } = useAuth()

    //useState - open
    const [state, setState] = useState({
        open: false,
        collapse: false,
        isFav: false,
        isRegistered: false
    })

    //useState - alert open
    const [utils, setUtils] = useState({
      open: false,
      message: "",
      severity: "error",
    })


    return (
        <div className=''>
            {/* current project */}
            <div className='rounded-xl p-4 border border-primary'>
                <h2 className='subtitle text-black dark:text-white border-b border-primary w-full pb-2'>Proyecto actual</h2>
                <Project project={user.currentProject}/>
            </div>

            {/* applied projects */}
            {user.appliedProjects && (
              <div className='rounded-xl p-4 border border-primary mt-4'>
                  <h2 className='subtitle text-black dark:text-white border-b border-primary w-full pb-2'>Proyecto solicitados</h2>
                  {user.appliedProjects.length !== 0 && user.appliedProjects.map((item:IProject, i:number) => (
                    <div key={i}>
                      <Project project={item}/>
                    </div>
                  ))}
              </div>
            )}
            
            {/* past projects */}
            {/* <div className='bg-transparent rounded-xl p-4 border border-primary mt-4'>
                <h2 className='subtitle text-black dark:text-white border-b border-primary w-full pb-2'>Proyectos pasados</h2>
                <Project project={user.currentProject}/>
                <Project project={user.currentProject}/>
            </div> */}
            
        </div>
    )
}

export default Projects