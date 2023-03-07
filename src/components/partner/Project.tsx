//React
import React, { useEffect, useState } from 'react';

//Next.js
import { useTheme } from 'next-themes';
import Image from 'next/image'
import { useRouter } from 'next/router';

//Context
import { useAuth } from '../../context/AuthContext'
import { useProjects } from '@/context/ProjectsContext';

//Material UI
import { IconButton, Tooltip } from '@mui/material'
import {Collapse} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//Material UI - icons
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { CreateRounded, DeleteRounded } from '@mui/icons-material';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';

import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import InterpreterModeRoundedIcon from '@mui/icons-material/InterpreterModeRounded';

//interfaces
import ProjectInt from '@/utils/interfaces/ProjectAdmin.interface';

//Material UI - Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AppProps = {
    key: number,
    project: ProjectInt,
    deleteProject: (uid:string) => void
};

const Project = ({key, project, deleteProject}:AppProps) => {
    //context
    const { setProject } = useProjects()

    //router
    const router = useRouter()

    //useState - open
    const [state, setState] = useState({
        open: false,
        collapse: false,
    })

    //useState - alert open
    const [utils, setUtils] = useState({
      open: false,
      message: "",
      severity: "error"
    })

    //useEffect
    useEffect(() => {
        console.log(project)
    },[])

    /* handle alert close */
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setUtils({...utils, open: false});
    };

    /* handle view students click */
    const handleEditClick = () => {
      //set in context
      setProject(project)
      router.push("/partner/project/edit")
    }

    /* handle view students click */
    const handleViewStudents = () => {
      //set in context
      setProject(project)
      router.push("/partner/project/students")
    }

    return (
        <div key={key}>
            <div className="bg-light-gray  text-sm pt-4 pb-4 text-left rounded-lg mb-4 p-4">    
                {/* upper */}
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <h3 className='subtitle'>{project.name}</h3>
                    </div>
                    <div className='flex justify-end items-center'>
                        <p className='font-bold'>{"0/" + project.availability}</p>

                        {/* action buttons */}
                        <Tooltip title="Editar" placement='top'>
                            <IconButton onClick={() => {handleEditClick()}}>
                                <CreateRounded className='text-black dark:text-white'/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar" placement='top'>
                            <IconButton onClick={() => {deleteProject(project.uid)}}>
                                <DeleteRounded className='text-black dark:text-white'/>
                            </IconButton>
                        </Tooltip>
                        {state.open ? (
                            <IconButton onClick={() => {setState({...state, open: false})}}>
                                <KeyboardArrowUpRoundedIcon className='text-black dark:text-white'/>
                            </IconButton>    
                        ) : (
                            <IconButton onClick={() => {setState({...state, open: true})}}>
                                <KeyboardArrowDownRoundedIcon className='text-black dark:text-white'/>
                            </IconButton>    
                        )}
                    </div>
                </div>   

                {/* lower */}         
                <div className='grid grid-cols-6 mb-4'>
                    <div className='opacity-50'>
                        <Groups2RoundedIcon/>
                        <p>{"0/" + project.availability}</p>
                    </div>
                    <div className='opacity-50'>
                        <WatchLaterRoundedIcon/>
                        <p>Hasta {project.hours}</p>
                    </div>
                    <div className='opacity-50'>
                        <ComputerRoundedIcon/>
                        <p>{project.modality}</p>
                    </div>
                    <div className='opacity-50'>
                        <InterpreterModeRoundedIcon/>
                        <p>{project.inscripcion === "Inscripción por entrevista" ? "Entrevista" : "IRIS"}</p>
                    </div>
                    <div className='opacity-50'>
                        <InterpreterModeRoundedIcon/>
                        <p>Hasta {project.hours}</p>
                    </div>
                    <button onClick={() => {handleViewStudents()}} className='button__sm bg-primary'>Ver alumnos</button>
                </div>

                {/* collapse */}
                <Collapse in={state.open}>
                    <div className='flex justify-between items-center'>
                        <div className='opacity-50'>
                            <p>Clave: <b>{project.key}</b></p>
                            <p>Grupo: <b>{project.group}</b></p>
                            <p>CRN: <b>{project.crn}</b></p>
                            <p>Duración: <b>{project.duration}</b></p>
                            <p>Ubicación: <b>{project.location}</b></p>
                            <p>Carreras:  
                                {project.carrerasList.length !== 0 && project.carrerasList.map((item, i) => (
                                    <b key={i}> {item} {i === project.carrerasList.length - 1 ? "" : "·"}</b>
                                ))}
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>


            {/* alert */}
            <Snackbar open={utils.open} autoHideDuration={6000} onClose={handleClose}>
              {/* @ts-ignore */}
              <Alert onClose={handleClose} severity={utils.severity} sx={{ width: '100%' }}>
                {utils.message}
              </Alert>
            </Snackbar>
            
        </div>
    )
}

export default Project