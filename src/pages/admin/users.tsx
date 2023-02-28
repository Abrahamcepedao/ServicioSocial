//Next
import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router';

//React
import React, { useState, useEffect } from 'react'

//Material UI
import { IconButton, Collapse, Tooltip } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


//Material UI - icons
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { AttachFileRounded } from '@mui/icons-material';

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

export default function Users() {
    //context
    const { createStudent, createPartner } = useAuth()

    //router
    const router = useRouter()

    //useState - formData
    const [formData, setFormData] = useState({
      maiil: "",
      name: "",
      passsword: "",
      phone: "",
      type: "student"
    })

    //useState - student
    const [student, setStudent] = useState({
        matricula: "",
        mail: "",
        carrera: "",
        semestre: "",
        horas: ""
    })

    //useState - partner
    const [partner, setPartner] = useState({
      company: "",
      key: "",
      file: "",
      fileName: ""
    })

    //useState - alert open
    const [utils, setUtils] = useState({
      open: false,
      message: "",
      severity: "error",
      collapse: false
    })

    /* handle alert close */
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setUtils({...utils, open: false});
    };

    /* const handle input change */
     /* handle input change */
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      })
    }

    /* handle student change */
    const handleStudentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setStudent({
        ...student,
        [e.target.name] : e.target.value
      })
    }

    /* handle socio change */
    const handlePartnerChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setPartner({
        ...partner,
        [e.target.name] : e.target.value
      })
    }

    /* validate image */
    const validateImg = (img:File) => {
      //validate immage


      return true
    }

    /* handle image change */
    const handleImgChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        if(e.target.files?.length !== 0) {
            //@ts-ignore
            if(validateImg(e.target.files[0])) {
                //@ts-ignore
                setPartner({...partner, file: e.target.files[0], fileName: e.target.files[0].name});
            } else {
                //prompt error here
                alert("El archivo debe ser de tipo .png")
            }
        }
    }

    const verifyForm = () => {
      //verify common data

      if(formData.type === "partner") {
        //verify partner data
      } else {
        //verify student data
      }

      return true
    } 

    /* handle create user */
    const handleCreateUser = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if(verifyForm()) {
        if(formData.type === "student") {
            const res = await createStudent(
              formData.maiil,
              formData.phone,
              formData.name,
              student.matricula,
              student.carrera,
              Number(student.semestre),
              Number(student.horas)
            )
            if(res) {
              setUtils({
                ...utils,
                open: true,
                severity: 'success',
                message: "Se registró el alumno exitosamente",
                collapse: false
              })
            } else {
              setUtils({
                ...utils,
                open: true,
                severity: 'error',
                message: "Error al registrar alumno. Inténtelo de nuevo.",
                collapse: false
              })
            }
        } else {
            const res = await createPartner(
              formData.maiil,
              formData.phone,
              formData.name,
              partner.company,
              partner.key,
              partner.file,
              partner.fileName
            )

            if(res) {
              setUtils({
                ...utils,
                open: true,
                severity: 'success',
                message: "Se registró la organización exitosamente",
                collapse: false,
              })
            } else {
              setUtils({
                ...utils,
                open: true,
                severity: 'error',
                message: "Error al registrar organización. Inténtelo de nuevo.",
                collapse: false
              })
            }
        }
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
        <main className=''>
            <SideBar/>
            <div className='lg:w-[calc(100%-176px)] min-h-screen bg-light dark:bg-dark lg:left-44 relative p-10'>

              {/* header */}
              <div className='flex justify-between items-center max-w-5xl m-auto mt-10'>
                <h2 className='title text-dark dark:text-light flex-1'>Edita los usuarios</h2>
                <div className='flex justify-end items-center'>
                  <div className='filter__container'>
                    <SearchRoundedIcon/>
                    <input placeholder='Busca un usuario' className='filter__input'/>
                  </div>

                  {utils.collapse ? (
                    <Tooltip title="Cerrar" placement='top'>
                      <IconButton onClick={() => {setUtils({...utils, collapse: false})}}>
                        <CancelRoundedIcon className='text-black dark:text-white'/>
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Agregar usuario" placement='top'>
                      <IconButton onClick={() => {setUtils({...utils, collapse: true})}}>
                        <PersonAddAlt1RoundedIcon className='text-black dark:text-white'/>
                      </IconButton>
                    </Tooltip>
                  )}
                  
                </div>
              </div>

              {/* add user */}
              <Collapse in={utils.collapse}>
                <div className='max-w-5xl m-auto mt-10'>
                  <form onSubmit={(e) => {handleCreateUser(e)}}>
                    <div className='grid grid-cols-3 gap-4 mb-8 items-center'>

                      {/* user type */}
                      <FormControl>
                        <label id="type" className='text-black dark:text-white input__label'>Gender</label>
                        <RadioGroup
                          row
                          aria-labelledby="type"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                        >
                          <FormControlLabel value="student" control={<Radio />} label="Alumno" />
                          <FormControlLabel value="partner" control={<Radio />} label="Socio" />
                        </RadioGroup>
                      </FormControl>

                      {/* mail */}
                      <div className='input__container '>
                        <EmailRoundedIcon/>
                        <input 
                          name='maiil' placeholder='Ingrese su mail'
                          autoComplete='off'
                          value={formData.maiil} onChange={(e) => {handleInputChange(e)}}
                          className="input"
                        />
                      </div>

                      {/* name */}
                      <div className='input__container '>
                        <PersonRoundedIcon/>
                        <input 
                          name='name' placeholder='Ingrese su nombre'
                          autoComplete='off'
                          value={formData.name} onChange={(e) => {handleInputChange(e)}}
                          className="input"
                        />
                      </div>

                      {/* phone */}
                      <div className='input__container '>
                        <LocalPhoneRoundedIcon/>
                        <input 
                          name='phone' placeholder='Ingrese su teléfono'
                          autoComplete='off'
                          value={formData.phone} onChange={(e) => {handleInputChange(e)}}
                          className="input"
                        />
                      </div>

                      {/* <--------student---------> */}

                      {/* matricula */}
                      {formData.type === "student" && (
                        <div className='input__container '>
                          <PersonRoundedIcon/>
                          <input 
                            name='matricula' placeholder='Ingrese su matrícula'
                            autoComplete='off'
                            value={student.matricula} onChange={(e) => {handleStudentChange(e)}}
                            className="input"
                          />
                        </div>
                      )}

                      {/* carrea */}
                      {formData.type === "student" && (
                        <div className='input__container '>
                          <SchoolRoundedIcon/>
                          <input 
                            name='carrera' placeholder='Ingrese su carera'
                            autoComplete='off'
                            value={student.carrera} onChange={(e) => {handleStudentChange(e)}}
                            className="input"
                          />
                        </div>
                      )}

                      {/* semestre */}
                      {formData.type === "student" && (
                        <div className='input__container '>
                          <NumbersRoundedIcon/>
                          <input 
                            name='semestre' placeholder='Ingrese su semestre (1..10)'
                            type="text"
                            autoComplete='off'
                            value={student.semestre} onChange={(e) => {handleStudentChange(e)}}
                            className="input"
                          />
                        </div>
                      )}

                      {/* horas de servico */}
                      {formData.type === "student" && (
                        <div className='input__container '>
                          <PendingActionsRoundedIcon/>
                          <input 
                            name='horas' placeholder='Ingrese sus horas'
                            type="text"
                            autoComplete='off'
                            value={student.horas} onChange={(e) => {handleStudentChange(e)}}
                            className="input"
                          />
                        </div>
                      )}

                      {/* <--------socio---------> */}
                      {/* company: "",
                        key: "",
                        logoImg: "",
                        logoUrl: "" */}
                      {/* key */}
                      {formData.type === "partner" && (
                        <div className='input__container '>
                          <KeyRoundedIcon/>
                          <input 
                            name='key' placeholder='Ingrese su clave'
                            type="text"
                            autoComplete='off'
                            value={partner.key} onChange={(e) => {handlePartnerChange(e)}}
                            className="input"
                          />
                        </div>
                      )}

                      {/* company */}
                      {formData.type === "partner" && (
                        <div className='input__container '>
                          <BusinessRoundedIcon/>
                          <input 
                            name='company' placeholder='Ingrese nombre de la organización'
                            type="text"
                            autoComplete='off'
                            value={partner.company} onChange={(e) => {handlePartnerChange(e)}}
                            className="input"
                          />
                        </div>
                      )}

                      {/* file */}
                      {formData.type === "partner" && (
                        <div className='file__container '>
                          <p>Imagen logotipo</p>
                          <div className='file__input__container'>
                            <label htmlFor='file' className='file__input__btn bg-primary'>
                              <AttachFileRounded/>
                            </label>
                            <input className='file__input' name='file' id="file" type="file" onChange={(e) => {handleImgChange(e)}}/>
                            <p>{partner.fileName.length > 20 ? partner.fileName.substring(0,20) + "..." : partner.fileName}</p>
                          </div>
                        </div>
                      )}


                    </div>

                    <div className='text-center'>
                      <button className='button bg-primary text-white' type='submit'>Registrar {formData.type === "student" ? "estudiante" : "organización"}</button>
                    </div>


                  </form>
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
        </main>
      </>
    )
}
