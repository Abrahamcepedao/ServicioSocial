//Next
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';

//React
import React, { useState } from 'react'

//Material UI
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//Material UI - icons
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

//CSS
import styles from '@/styles/Home.module.css'

//Assets
import Logo from '../../public/logo.png'

//Components
import ThemeToggler from '@/components/global/ThemeToggler';

//Context
import { useAuth } from '@/context/AuthContext';

//Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
    //context
    const { signup } = useAuth()

    //useState - formData
    const [formData, setFormData] = useState({
      mail: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      type: "admin" //admin, user, socio
    })

    //useState - alert open
    const [utils, setUtils] = useState({
      open: false,
      message: "",
      severity: "error"
    })

    /* handle alert close */
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setUtils({...utils, open: false});
    };

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      })
    }

    /* verify and validate form data */
    const verifyForm = () => {
      if(formData.password !== formData.confirmPassword) {
        setUtils({
          ...utils,
          open: true,
          message: "Las contraseñas deben coincidir",
          severity: "error"
        })
        return false
      }
      //validate mail

      //validate phone

      //validate name

      return true
    }

    /* handle sign up */
    const handleSignUp = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(verifyForm()) {
        signup(formData.mail, formData.password, formData.name, formData.phone, formData.type)
      }
    }

    return (
      <>
        <Head>
          <title>Servicio Social - ITESM</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className='p-5'>
          <div className='flex flex-col items-center justify-between'>
              <div className='mb-20'>
                <Image src={Logo} width={200} height={140} alt="Servicio Social"/>
                <ThemeToggler />
              </div>
              <form onSubmit={(e) => {handleSignUp(e)}} className="flex-1" autoComplete='off'>
                  <div className='grid grid-cols-2 gap-4 mb-8'>
                      <div className='input__container '>
                        <EmailRoundedIcon/>
                        <input 
                          name='mail' placeholder='Ingrese su mail'
                          autoComplete='off'
                          value={formData.mail} onChange={(e) => {handleInputChange(e)}}
                          className="input"
                        />
                      </div>
                      <div className='input__container '>
                        <PersonRoundedIcon/>
                        <input 
                          name='name' placeholder='Ingrese su nombre completo'
                          value={formData.name} onChange={(e) => {handleInputChange(e)}}
                          className="input"
                        />
                      </div>
                      <div className='input__container '>
                        <LocalPhoneRoundedIcon/>
                        <input 
                          name='phone' placeholder='Ingrese su teléfono'
                          value={formData.phone} onChange={(e) => {handleInputChange(e)}}
                          className="input"
                        />
                      </div>
                      <div className='input__container '>
                        <LockRoundedIcon/>
                        <input 
                          name='password' placeholder='Ingrese su contraseña'
                          type="password" autoComplete='new-password'
                          value={formData.password} onChange={(e) => {handleInputChange(e)}}
                          className="input"
                        />
                      </div>
                      <div className='input__container '>
                        <LockRoundedIcon/>
                        <input 
                          name='confirmPassword' placeholder='Confirme su contraseña'
                          type="password" autoComplete='new-password'
                          value={formData.confirmPassword} onChange={(e) => {handleInputChange(e)}}
                          className="input"
                        />
                      </div>
                  </div>
                  
                  <div className='text-center'>
                    <button className='button bg-primary text-white' type='submit'>Registrarse</button>
                    <p className='mt-10'>¿Ya tienes cuenta?<Link href='/login' className='text-primary underline'> Inicia sesión</Link></p>
                  </div>
                  
              </form>
          </div>

          {/* alert */}
          <Snackbar open={utils.open} autoHideDuration={6000} onClose={handleClose}>
            {/* @ts-ignore */}
            <Alert onClose={handleClose} severity={utils.severity} sx={{ width: '100%' }}>
              {utils.message}
            </Alert>
          </Snackbar>
        </main>
      </>
    )
}
