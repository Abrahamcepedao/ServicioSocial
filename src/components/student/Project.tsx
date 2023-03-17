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
    const { user, setUserCurrentProject, setUserAppliedProjects } = useAuth()
    const { favs, addFav, deleteFav, registerStudent, unregisterStudent, deleteUserCurrentProjec, deleteUserAppliedProject } = useProjects()

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


    //useEffect
    useEffect(() => {
        console.log(project)
        setup()
    },[project])


    /* handle alert close */
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setUtils({...utils, open: false});
    };

    /*  set project fav state */
    const setup = () => {
        //check is fav
        let isFav = false
        if(favs.length !== 0){
            favs.forEach((item:ProjectInt) => {
                if(item.uid === project.uid) {
                    isFav = true
                }
            })
        }

        //check is registered
        let isRegistered = false
        if(project.students.length !== 0){
            if(project.students.findIndex((el:Student) => el.uid === user.uid) !== -1) {
                isRegistered = true
            }
        }

        //set State
        setState({...state, isRegistered, isFav})
    }

    /* handle favorite project click */
    const handleFavoriteClick = () => {
        if(state.isFav) {
            //delete from favs
            deleteFav(project.uid)
            if(deleteFromFav !== undefined) {
                deleteFromFav(project.uid)
            }
        } else {
            //add to favs
            addFav({...project, isFav: true})
        }
        setState({...state, isFav: !state.isFav})
    }


    /* handle register click */
    const handleRegisterClick = async() => {
        const res = await registerStudent(project, user)
        if(res) {
            if(project.inscripcion === "Inscripción por IRIS") {
                setUtils({
                    ...utils,
                    open: true,
                    severity: 'success',
                    message: "¡Te registraste exitosamente!"
                })
                setUserCurrentProject(project)
            } else {
                setUtils({
                    ...utils,
                    open: true,
                    severity: 'success',
                    message: "¡Solicitaste tu registro exitosamente!"
                })
                setUserAppliedProjects(project)
            }
            
            setState({...state, isRegistered: true})
        } else {
            
            if(project.inscripcion === "Inscripción por IRIS") {
                setUtils({
                    ...utils,
                    open: true,
                    severity: 'error',
                    message: "Ocurrió un error al registrar la experiencia"
                })
            } else {
               setUtils({
                    ...utils,
                    open: true,
                    severity: 'error',
                    message: "Ocurrió un error al solicitar tu registro"
                })
            }
            setState({...state, isRegistered: false})
        }
    }

    /* handle unregister click */
    const handleUnregisterClick = async() => {
        const res = await unregisterStudent(project, user)
        if(res) {
            
            if(project.inscripcion === "Inscripción por IRIS") {
                setUtils({
                    ...utils,
                    open: true,
                    severity: 'success',
                    message: "¡Se elimino el registro exitosamente!"
                })
                deleteUserCurrentProjec()
            } else {
                setUtils({
                ...utils,
                    open: true,
                    severity: 'success',
                    message: "¡Se elimino tu solicitud exitosamente!"
                })
                deleteUserAppliedProject(project.uid)
            }
            setState({...state, isRegistered: false})
        } else {
            if(project.inscripcion === "Inscripción por IRIS") {
                setUtils({
                    ...utils,
                    open: true,
                    severity: 'error',
                    message: "Ocurrió un error al eliminar la experiencia"
                })
            } else {
                setUtils({
                    ...utils,
                    open: true,
                    severity: 'error',
                    message: "Ocurrió un error al eliminar tu solicitud"
                })
            }
            
            setState({...state, isRegistered: true})
        }
    }

    return (
        <div>
            <div className="bg-lightAlt dark:bg-darkAlt  text-sm pt-4 pb-4 text-left rounded-lg mb-4 p-4">
                {/* upper */}
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <h3 className='subtitle text-black dark:text-white'>{project.name}</h3>
                    </div>
                    <div className='flex justify-end items-center'>
                        <p className='font-bold mr-4 text-black dark:text-white'>{project.occupied + "/" + project.availability}</p>

                        {/* action buttons */}
                        {user.type === "student" && (
                            <IconButton onClick={handleFavoriteClick}>
                                {state.isFav ? (
                                    <FavoriteRoundedIcon className='!text-secondary'/>    
                                ) : (
                                    <FavoriteBorderRoundedIcon className='text-black dark:text-white'/>
                                )}
                            </IconButton>
                        )}
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
                        <p>{project.occupied + "/" + project.availability}</p>
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
                    {user.type === "student" && (
                        <>
                            {state.isRegistered ? (
                                <button onClick={() => {handleUnregisterClick()}} className='button__sm bg-secondary text-white max-h-16'>{project.inscripcion === "Inscripción por IRIS" ? "Eliminar registro" : "Eliminar solicitud"}</button>
                            ) : (
                                <button onClick={() => {handleRegisterClick()}} className='button__sm bg-primary text-white max-h-16'>{project.inscripcion === "Inscripción por IRIS" ? "Registrar experiencia" : "Solicitar experiencia"}</button>
                            )}
                        </>
                    )}
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
            <Snackbar open={utils.open} autoHideDuration={4000} onClose={handleClose}>
              {/* @ts-ignore */}
              <Alert onClose={handleClose} severity={utils.severity} sx={{ width: '100%' }}>
                {utils.message}
              </Alert>
            </Snackbar>
        </div>
    )
}

export default Project