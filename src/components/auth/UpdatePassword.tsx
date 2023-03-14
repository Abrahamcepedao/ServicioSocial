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
import LockRoundedIcon from '@mui/icons-material/LockRounded';

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

const UpdatePassword = () => {
    //context
    const { user } = useAuth()

    //useState - open
    const [formData, setFormData] = useState({
        current: "",
        password: "",
        confirmPassword: "",
    })

    //useState - alert open
    const [utils, setUtils] = useState({
      open: false,
      message: "",
      severity: "error",
    })

    /* handle input change  - formdata */
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      })
    }


    return (
        <div>
            <h2 className='subtitle mb-4'>Cambia tu contraseña</h2>

            {/* info message */}

            <div>
                <form className='grid grid-cols-2 gap-4'>
                    <div className='input__container '>
                        <LockRoundedIcon/>
                        <input 
                        name='current' placeholder='Contraseña actual'
                        type="password" autoComplete='new-password'
                        value={formData.current} onChange={(e) => {handleInputChange(e)}}
                        className="input"
                        />
                    </div>
                    <div className='input__container '>
                        <LockRoundedIcon/>
                        <input 
                        name='password' placeholder='Nueva contraseña'
                        type="password" autoComplete='new-password'
                        value={formData.password} onChange={(e) => {handleInputChange(e)}}
                        className="input"
                        />
                    </div>
                    <div className='input__container '>
                        <LockRoundedIcon/>
                        <input 
                        name='confirmPassword' placeholder='Confirme su nueva contraseña'
                        type="password" autoComplete='new-password'
                        value={formData.confirmPassword} onChange={(e) => {handleInputChange(e)}}
                        className="input"
                        />
                    </div>
                    <div>
                        <button className='button bg-primary text-white' type='submit'>Cambiar contraseña</button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default UpdatePassword