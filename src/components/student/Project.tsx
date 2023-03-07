//React
import { useEffect, useState } from 'react';

//Next.js
import { useTheme } from 'next-themes';
import Image from 'next/image'

//Context
import { useAuth } from '../../context/AuthContext'

//CSS

//Material UI
import { IconButton } from '@mui/material'
import {Collapse} from '@mui/material';

//Material UI - icons
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

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
        
    }



    return (
        <div key={key}>
            <div className="bg-light dark:bg-dark flex justify-between items-center overflow-scroll text-sm pt-4 pb-4 text-left">
                <div className='w-24 min-w-sm flex justify-start items-center'>
                    {state.isFav ? (
                        <IconButton onClick={() => {setState({...state, isFav: false})}}>
                            <FavoriteRoundedIcon className='!text-secondary'/>
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => {setState({...state, isFav: true})}}>
                            <FavoriteBorderRoundedIcon className='text-black dark:text-white'/>
                        </IconButton>
                    )}
                    
                    <img src={project.logoUrl} className="w-20 h-auto rounded-lg ml-4"/>
                </div>
                
                <div className='w-12 min-w-xs'>
                    Hasta {project.hours}
                </div>

                <div className='w-24 min-w-sm'>
                    {project.modality}
                </div>
                <div className='w-24 min-w-sm'>
                    {project.inscripcion}
                </div>
                <div className='w-12 min-w-xs flex justify-start items-center'>
                    {project.availability}
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

            <Collapse in={state.open}>

                <div>
                    {project.location}
                </div>
            </Collapse>
        </div>
    )
}

export default Project