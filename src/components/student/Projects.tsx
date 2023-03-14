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
        <div>
            <h2 className='subtitle text-black dark:text-white'>Proyecto actual</h2>

            <h2 className='subtitle text-black dark:text-white'>Proyectos pasados</h2>
        </div>
    )
}

export default Projects