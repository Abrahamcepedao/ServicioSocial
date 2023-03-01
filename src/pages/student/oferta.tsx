//Next
import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router';

//React
import React, { useState, useEffect } from 'react'

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
import SideBar from '@/components/global/Sidebar';

//Context
import { useAuth } from '@/context/AuthContext';

//Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Oferta() {
    //context
    const { user } = useAuth()

    //router
    const router = useRouter()

    //useState - formData
    const [formData, setFormData] = useState({
      maiil: "",
      passsword: "",
    })


    return (
      <>
        <Head>
          <title>Servicio Social - ITESM</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className=''>
            <SideBar/>
            <div className='lg:w-[calc(100%-176px)] min-h-screen bg-primary lg:left-44 relative p-10'>
              <h1>Oferta</h1>
            </div>
        </main>
      </>
    )
}