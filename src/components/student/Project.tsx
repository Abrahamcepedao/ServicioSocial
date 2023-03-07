//React
import { useEffect, useState } from 'react';

//Next.js
import { useTheme } from 'next-themes';
import Image from 'next/image'

//Context
import { useAuth } from '../../context/AuthContext'
import { useProjects } from '@/context/ProjectsContext';

//Material UI
import { IconButton } from '@mui/material'
import {Collapse} from '@mui/material';

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

interface AppProps {
    key: number,
    project: ProjectInt
}

const Project = ({key, project}:AppProps) => {
    //Theme
    const { theme } = useTheme()

    //context
    const { user } = useAuth()
    const { addFav, deleteFav } = useProjects()

    //useState - open
    const [state, setState] = useState({
        open: false,
        collapse: false,
        isFav: false
    })


    //useEffect
    useEffect(() => {
        console.log(project)
    },[])

    const handleFavoriteClick = () => {
        if(state.isFav) {
            //delete from favs
            deleteFav(project.uid)
        } else {
            //add to favs
            addFav(project)
        }
        setState({...state, isFav: !state.isFav})
    }


    const handleRegisterClick = () => {

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
                        <p className='font-bold mr-4'>{"0/" + project.availability}</p>

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
                    <button onClick={() => {handleRegisterClick()}} className='button__sm bg-primary text-white'>Registrar experiencia</button>
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
        </div>
    )
}

export default Project