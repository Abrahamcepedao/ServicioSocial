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
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import BadgeIcon from '@mui/icons-material/Badge';


//interfaces
import ProjectInt from '@/utils/interfaces/Project.interface';
import Student from '@/utils/interfaces/Student.interface';



const Profile = () => {
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

    useEffect(() => {
        console.log(user)
    }, [])


    return (
        <div>
            <div className="text-sm pt-4 pb-4 text-left rounded-lg mb-4">
                <div className='grid grid-rows-2 xl:grid-rows-1 xl:grid-cols-2 gap-3 mb-4 rounded-xl p-4 border border-primary'>
                    {user!== null && (
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-center'>
                            <div className='opacity-50'>
                                <PersonRoundedIcon/>
                                <p>{user.name}</p>
                            </div>
                            <div className='opacity-50'>
                                <BadgeIcon/>
                                <p>{user.uid}</p>
                            </div>
                            <div className='opacity-50'>
                                <EmailRoundedIcon/>
                                <p>{user.mail}</p>
                            </div>
                            <div className='opacity-50'>
                                <ContactPhoneRoundedIcon/>
                                <p>{user.phone}</p>
                            </div>
                        </div>
                    )}
                    {user!== null && (
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-1 text-center'>
                            <div className='opacity-50'>
                                <SchoolRoundedIcon/>
                                <p>{user.carrera}</p>
                            </div>
                            <div className='opacity-50'>
                                <WatchLaterRoundedIcon/>
                                <p>{user.horas}</p>
                            </div>
                            <div className='opacity-50'>
                                <ComputerRoundedIcon/>
                                <p>{user.semestre}</p>
                            </div>
                            <div className='opacity-50'>
                                <PsychologyRoundedIcon/>
                                <p>{user.promedio}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* lower */}         
                <div className='grid grid-cols-6 mb-4'>
                    
                </div>

            </div>
        </div>
    )
}

export default Profile