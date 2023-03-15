//React
import React, { useEffect, useState } from 'react';

//Next.js
import { useRouter } from 'next/router';

//Material UI
import { Collapse } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//Material UI - icons
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import BadgeIcon from '@mui/icons-material/Badge';

//interfaces
import Student from '@/utils/interfaces/Student.interface';

//Material UI - Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AppProps = {
    student: Student,
    deleteStudent?: (item:Student) => void,
    acceptStudent?: (item:Student) => void,
    projectType: string,
};

const Student = ({student, deleteStudent, acceptStudent, projectType}:AppProps) => {
    //context
    //const { setProject } = useProjects()

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
        console.log(student)
    },[])

    /* handle alert close */
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setUtils({...utils, open: false});
    };


    return (
        <div>
            <div className="bg-lightAlt dark:bg-darkAlt  text-sm pt-4 pb-4 text-left rounded-lg mb-4 p-4">    
                {/* upper */}
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <h3 className='subtitle2 text-black dark:text-white'>{student.name}</h3>
                    </div>
                    <div>
                        {projectType === "IRIS" && (
                            <button onClick={() => {deleteStudent(student)}} className='button__sm bg-secondary text-white'>Eliminar registro</button>
                        )}
                        {projectType !== "IRIS" && (
                            <div className='flex justify-end items-center'>
                                <button onClick={() => {deleteStudent(student)}} className='button__sm bg-secondary text-white mr-4'>{student.status === "AP" ? "Rechazar" : "Eliminar registroo"}</button>
                                {student.status === "AP" && (
                                    <button onClick={() => {acceptStudent(student)}} className='button__sm bg-primary text-white'>Aceptar</button>
                                )}
                            </div>
                        )}
                    </div>
                </div>   

                {/* lower */}         
                <div className='grid grid-cols-7 mb-4 text-center'>
                    <div className='opacity-50'>
                        <BadgeIcon/>
                        <p>{student.uid}</p>
                    </div>
                    <div className='opacity-50'>
                        <EmailRoundedIcon/>
                        <p>{student.mail}</p>
                    </div>
                    <div className='opacity-50'>
                        <ContactPhoneRoundedIcon/>
                        <p>{student.phone}</p>
                    </div>
                    <div className='opacity-50'>
                        <SchoolRoundedIcon/>
                        <p>{student.carrera}</p>
                    </div>
                    <div className='opacity-50'>
                        <WatchLaterRoundedIcon/>
                        <p>{student.horas}</p>
                    </div>
                    <div className='opacity-50'>
                        <ComputerRoundedIcon/>
                        <p>{student.semestre}</p>
                    </div>
                    <div className='opacity-50'>
                        <PsychologyRoundedIcon/>
                        <p>{student.promedio}</p>
                    </div>
                </div>

                {/* collapse */}
                <Collapse in={state.open}>
                    <div className='flex justify-between items-center'>
                        <div className='opacity-50'>
                            <p>Clave: <b>{student.semestre}</b></p>
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

export default Student