//React
import React, { useEffect, useState } from 'react';

//Next.js
import { useRouter } from 'next/router';

//Material UI
import { IconButton, Tooltip } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//Material UI - icons
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

//interfaces
import IAdmin from '@/utils/interfaces/Admin.interface';

//Material UI - Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AppProps = {
    admin: IAdmin,
    //deleteProject: (uid:string) => void
};

const Admin = ({admin}:AppProps) => {
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
        console.log(admin)
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
            <div className="bg-light-gray  text-sm pt-4 pb-4 text-left rounded-lg mb-4 p-4">    
                {/* upper */}
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        
                        <h3 className='subtitle'>{admin.name}</h3>
                    </div>
                    <div className='flex flex-col items-end'>
                      <div className='bg-admin pt-1 pb-1 pl-4 w-10 mb-2 pr-4 rounded-xl'></div>
                      <div className='flex justify-end items-center'>
                          <Tooltip title="Editar" placement='top'>
                              <IconButton>
                                <CreateRoundedIcon className='text-black dark:text-white transition-transform duration-500 hover:scale-110'/>
                              </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar" placement='top'>
                              <IconButton>
                                <DeleteRoundedIcon className='text-black dark:text-white transition-transform duration-500 hover:scale-110'/>
                              </IconButton>
                          </Tooltip>
                      </div>
                    </div>
                </div>   

                {/* lower */}         
                <div className='grid grid-cols-4 mb-4'>
                    <div className='opacity-50'>
                        <EmailRoundedIcon/>
                        <p>{admin.mail}</p>
                    </div>
                    <div className='opacity-50'>
                        <ContactPhoneRoundedIcon/>
                        <p>{admin.phone}</p>
                    </div>
                </div>
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

export default Admin