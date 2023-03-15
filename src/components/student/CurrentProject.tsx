//React
import React, { useEffect, useState } from 'react';

//Context
import { useAuth } from '../../context/AuthContext'
import { useProjects } from '@/context/ProjectsContext';

//Material UI
import { IconButton } from '@mui/material'
import {Collapse} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//Material UI - icons
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import InterpreterModeRoundedIcon from '@mui/icons-material/InterpreterModeRounded';


//interfaces
import ProjectInt from '@/utils/interfaces/Project.interface';
import Student from '@/utils/interfaces/Student.interface';

interface AppProps {
    project: ProjectInt,
    deleteFromFav?: (uid:string) => void
}

//Material UI - Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Project = ({project, deleteFromFav}:AppProps) => {
    //context
    const { user } = useAuth()
    const { favs, addFav, deleteFav, registerStudent, unregisterStudent } = useProjects()

    //useState - open
    const [state, setState] = useState({
        open: false,
        collapse: false,
    })

    //useEffect
    useEffect(() => {
        console.log(project)
    },[project])



    return (
        <div>
            {(project !== null && project !== undefined) ? (
                <div className="text-sm pt-4 pb-4 text-left rounded-lg mb-4">
                    {/* upper */}
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <h3 className='subtitle2 text-black dark:text-white opacity-80'>{project.name}</h3>
                        </div>
                        <div className='flex justify-end items-center'>
                            <p className='font-bold mr-4 text-black dark:text-white'>{project.occupied + "/" + project.availability}</p>
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
                        <div className=''>
                            <img className='rounded-lg w-20 h-auto mb-2' src={`${project.logoUrl}`}/>
                            <p className='opacity-50'>{project.company}</p>
                        </div>
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
            ) : (
                <div className='mt-4 opacity-60'>
                    <h4>Aún no tienes un proyecto asignado</h4>
                </div>
            )}
            
        </div>
    )
}

export default Project