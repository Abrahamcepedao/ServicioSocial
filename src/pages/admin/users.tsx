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
import CircularProgress from '@mui/material/CircularProgress';

//Material UI - icons
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import { AttachFileRounded, FileUpload } from '@mui/icons-material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';

//Components
import SideBar from '@/components/global/Sidebar';

//Context
import { useAuth } from '@/context/AuthContext';
import Student from '@/components/admin/Student';
import Partner from '@/components/admin/Partner';
import Admin from '@/components/admin/Admin';

/* XLSX */
import readXlsxFile from 'read-excel-file'

/* Papaparse */
import Papa from "papaparse";

//Interfaces
import IStudent from '@/utils/interfaces/Student.interface';
import IStudentFile from '@/utils/interfaces/StudentFile.interfase';

//Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Users() {
    //context
    const { createStudent, createPartner, createAdmin, deleteUser, users, getUsers } = useAuth()

    //router
    const router = useRouter()

    //useState - users
    const [state, setState] = useState({
      users: [],
      usersList: [],
      userType: "all",
      filter: ""
    })

    //useState - formData
    const [formData, setFormData] = useState({
      maiil: "",
      name: "",
      phone: "",
      type: "student"
    })

    //useState - student
    const [student, setStudent] = useState({
        matricula: "",
        mail: "",
        carrera: "",
        semestre: "",
        horas: "",
        promedio: ""
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

    //useState - file
    const [fileData, setFileData] = useState({
      file: "",
      fileName: "",
      loading: false,
      collapse: false,
      users: [],
      uploading: false
    })
    const [file, setFile] = useState<File | null>(null);
    const [fileUsers, setFileUsers] = useState<Array<IStudentFile>>([])
    const [number, setNumber] = useState<number>(0);
    const [intervalID, setIntervalID] = useState<number>(0);

    //useEffect
    useEffect(() => {
      fetchUsers()
    },[])

    /* handle alert close */
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setUtils({...utils, open: false});
    };


    /* handle filter change */
    const handleFilterChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      let data = []
      let val = e.target.value
      if(val !== "") {
        state.users.forEach((item:any) => {
          if(item.name.toLocaleLowerCase().includes(val.toLocaleLowerCase())){
            data.push(item)
          } else if(item.mail.toLocaleLowerCase().includes(val.toLocaleLowerCase())) {
            data.push(item)
          } else if(item.company !== undefined) {
            if(item.company.toLocaleLowerCase().includes(val.toLocaleLowerCase())) {
              data.push(item)
            }
          }
        })
        setState({
          ...state,
          usersList: data,
          filter: val
        })
      } else {
        handleUserTypeClick(state.userType)
      }
    }

    /* handle fecth users */
    const fetchUsers = async () => {
      const res = await getUsers()
      if(res !== false) {
        setState({
          ...state,
          users: res,
          usersList: res,
        })
      } else {
        setUtils({
          ...utils,
          message: "Error el obtener usuarios",
          severity: "error",
          open: true,
        })
      }
    }

    /* Functions - handle file upload */
    const handleFileChange = async(e:React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.files[0]);
      if(e.target.files[0] !== undefined) {
          setFile(e.target.files[0])

          let files = e.target.files; //get files
          var file = files[0];

          //validate file
          if(file.type !== 'text/csv') {
            const schema = {
              'matricula': {
                prop: 'matricula',
                type: String,
                required: true
              },
              'nombre': {
                prop: 'nombre',
                type: String,
                required: true
              },
              'mail': {
                prop: 'mail',
                type: String,
                required: true
              },
              'telefono': {
                prop: 'telefono',
                type: String,
                required: true
              },
              'semestre': {
                prop: 'semestre',
                type: Number,
                required: true
              },
              'carrera': {
                prop: 'carrera',
                type: String,
                required: true
              },
              'horas': {
                prop: 'horas',
                type: Number,
                required: true
              },
              'promedio': {
                prop: 'promedio',
                type: Number,
                required: true
              },

            }
            readXlsxFile(file, {schema}).then((rows) => {
              console.log('rows: ', rows);

              setFileData({
                ...fileData,
                fileName: file.name,
                loading: true,
                collapse: true,
              });

              if(rows.rows.length > 0) {
                //@ts-ignore
                setUsersNoFile(rows.rows);
              }
              //return rows;
            }).catch((error) => {
              console.log('error: ', error);
              setFileData({
                ...fileData,
                loading: false,
                fileName: file.name,
                collapse: false
              });
              return;
            });
            

            
          } else {

            setFileData({
              ...fileData,
              fileName: file.name,
              collapse: true,
            });

            setUsersFile(file);
          }
      }
    };

    const setUsersNoFile = (data: IStudentFile[]) => {
      console.log('useers: ', data);
      setFileUsers(data)
      let num = 0;

      const interval: any = setInterval(() => {
          if(num === data.length) {
            clearInterval(intervalID);
          } else {
            num = num + 1;
            setNumber(num);
          }

      }, 0.001)

      setIntervalID(interval);
    }

    const setUsersFile = (file: File) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        //@ts-ignore
        complete: function (results:any) {
          console.log(results.data)
          setFileUsers(results.data)

          let num = 0;

          const interval: any = setInterval(() => {
              if(num === results.data.length) {
                clearInterval(intervalID);
              } else {
                num = num + 1;
                setNumber(num);
              }

          }, 5)

          setIntervalID(interval);
        },
      });
    }

    const uploadUsers = async() => {
      let tempAddedUsers:IStudent[] = []
      
      const promises = fileUsers.map(async(student:IStudentFile) => {
        const res = await createStudent(
          student.mail,
          student.telefono,
          student.nombre,
          student.matricula,
          student.carrera,
          Number(student.semestre),
          Number(student.horas),
          Number(student.promedio)
        )
        if(res !== false) {
          tempAddedUsers.push(res)
        }
      })
      await Promise.all(promises)

      console.log(tempAddedUsers)
      return tempAddedUsers
    }

    const handleUploadUsers = async() => {
      setFileData({
        ...fileData,
        uploading: !fileData.uploading
      })

      let tempAddedUsers = await uploadUsers()
      console.log(tempAddedUsers)
      //add to users list
      let tempUsers = [...state.users]
      tempAddedUsers.forEach((item) => {
        tempUsers.push(item)
      })

      setFileData({
        ...fileData,
        uploading: false,
        loading: false,
        collapse: false,
        fileName: ""
      })
      setFile(null)

      console.log(tempUsers)
      setState({
        ...state,
        users: tempUsers,
        usersList: tempUsers
      })

      setUtils({
        ...utils,
        open: true,
        message: `Se registraron ${tempAddedUsers.length} alumnos exitosamente`,
        severity: "success"
      })

      
    }

    /* handle cancel upload users */
    const handleCancelUploadUsers = () => {
      setFileData({
        ...fileData,
        fileName: "",
        uploading: false,
        loading: false,
        collapse: false
      })
      setNumber(0)
      setFile(null)
    }

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

    const resetForm = () => {
      setFormData({
        maiil: "",
        name: "",
        phone: "",
        type: "student"
      })
      setStudent({
        matricula: "",
        mail: "",
        carrera: "",
        semestre: "",
        horas: "",
        promedio: ""
      })
      setPartner({
        company: "",
        key: "",
        file: "",
        fileName: ""
      })
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
              Number(student.horas),
              Number(student.promedio)
            )
            if(res !== false) {
              setUtils({
                ...utils,
                open: true,
                severity: 'success',
                message: "Se registró el alumno exitosamente",
                collapse: false
              })
              let data = [...state.users]
              data.push(res)
              setState({
                ...state,
                users: data,
                usersList: data
              })
              resetForm()
            } else {
              setUtils({
                ...utils,
                open: true,
                severity: 'error',
                message: "Error al registrar alumno. Inténtelo de nuevo.",
                collapse: false
              })
            }
        } else if(formData.type === "partner") {
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
              await fetchUsers()
              resetForm()
            } else {
              setUtils({
                ...utils,
                open: true,
                severity: 'error',
                message: "Error al registrar organización. Inténtelo de nuevo.",
                collapse: false
              })
            }
        } else {
            const res = await createAdmin(
              formData.maiil,
              formData.phone,
              formData.name,
            )

            if(res !== false) {
              setUtils({
                ...utils,
                open: true,
                severity: 'success',
                message: "Se registró el usuario administrador exitosamente",
                collapse: false,
              })
              let data = [...state.users]
              data.push(res)
              setState({
                ...state,
                users: data,
                usersList: data
              })
              resetForm()
            } else {
              setUtils({
                ...utils,
                open: true,
                severity: 'error',
                message: "Error al registrar el usuario administrador. Inténtelo de nuevo.",
                collapse: false
              })
            }
        }

        
      }
    }

    /* handle user type click */
    const handleUserTypeClick = (userType: string) => {

      const temp = state.users.filter((el) => el.type === userType)
      setState({
        ...state,
        userType,
        usersList: userType !== "all" ? temp : state.users,
        filter: ""
      })
      
    }

    /* handle delete user */
    const handleUserDelete = (uid:string) => {

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
                <h2 className='title text-black dark:text-white flex-1'>Edita los usuarios</h2>
                <div className='flex justify-end items-center'>
                  <div className='filter__container'>
                    <SearchRoundedIcon/>
                    <input value={state.filter} onChange={(e) => {handleFilterChange(e)}} placeholder='Busca un usuario' className='filter__input'/>
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

                  <Tooltip title="Cargar archivo" placement='top'>
                    <label htmlFor='file' className="">
                      <UploadRoundedIcon className='text-black dark:text-white cursor-pointer duration-500 transition-transform hover:scale-110'/>
                    </label>
                  </Tooltip>
                  <input name='file' id='file' type="file" onChange={(e) => {handleFileChange(e)}} className="file__input"/>
                  
                  
                </div>
              </div>

              <Collapse in={fileData.collapse}>
                <div className='max-w-5xl m-auto mt-10 flex justify-end items-center'>
                  {/* users */}
                  <div className='bg-lightAlt dark:bg-darkAlt rounded-xl p-5 w-56'>
                    <div className='flex items-center justify-center mb-4'>
                      <PeopleRoundedIcon className='text-black dark:text-white mr-3'/>
                      <p className='text-black dark:text-white'>{number}</p>
                    </div>
                    
                    <div className='flex items-center justify-center'>
                      <button onClick={handleCancelUploadUsers} className='button__sm bg-secondary text-white mr-4'>Cancelar</button>
                      <button onClick={handleUploadUsers} className='button__sm bg-primary text-white'>Registar</button>
                    </div>
                  </div>

                  {/* progress */}
                  {fileData.uploading && (
                    <div className='ml-4'>
                      <CircularProgress />
                    </div>
                  )}
                </div>
              </Collapse>

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
                          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
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

                      {/* promedio */}
                      {formData.type === "student" && (
                        <div className='input__container '>
                          <PsychologyRoundedIcon/>
                          <input 
                            name='promedio' placeholder='Ingrese su promedio'
                            type="text"
                            autoComplete='off'
                            value={student.promedio} onChange={(e) => {handleStudentChange(e)}}
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
                            <label htmlFor='file_img' className='file__input__btn bg-primary'>
                              <AttachFileRounded/>
                            </label>
                            <input className='file__input' name='file_img' id="file_img" type="file" onChange={(e) => {handleImgChange(e)}}/>
                            <p>{partner.fileName.length > 20 ? partner.fileName.substring(0,20) + "..." : partner.fileName}</p>
                          </div>
                        </div>
                      )}


                    </div>

                    <div className='text-center'>
                      <button className='button bg-primary text-white' type='submit'>Registrar {formData.type === "student" ? "estudiante" : formData.type === "partner" ? "organización" : "administrador"}</button>
                    </div>


                  </form>
                </div>
              </Collapse>

              {/* filter users */}
              <div className='max-w-5xl m-auto mt-10 flex justify-between items-center'>
                <div className='flex justify-start items-start flex-1'>
                  <div 
                    onClick={() => {handleUserTypeClick("all")}}
                    className='rounded-xl border-2 border-all pl-4 pr-4 pt-1 pb-1 mr-2 cursor-pointer transition-transform duration-500 hover:scale-105' 
                    style={{background: state.userType === "all" ? "#e99517" : "none", color: state.userType === "all" ? "#f7e7cf" : "#e99517"}}>Todos</div>
                  <div 
                    onClick={() => {handleUserTypeClick("student")}}
                    className='rounded-xl border-2 border-student pl-4 pr-4 pt-1 pb-1 mr-2 cursor-pointer transition-transform duration-500 hover:scale-105' 
                    style={{background: state.userType === "student" ? "#d6192c" : "none", color: state.userType === "student" ? "#f9d9dc" : "#d6192c"}}>Alumnos</div>
                  <div 
                    onClick={() => {handleUserTypeClick("partner")}}
                    className='rounded-xl border-2 border-partner pl-4 pr-4 pt-1 pb-1 mr-2 cursor-pointer transition-transform duration-500 hover:scale-105' 
                    style={{background: state.userType === "partner" ? "#17c4be" : "none", color: state.userType === "partner" ? "#defcfa" : "#17c4be"}}>Socios</div>
                  <div 
                    onClick={() => {handleUserTypeClick("admin")}}
                    className='rounded-xl border-2 border-admin pl-4 pr-4 pt-1 pb-1 cursor-pointer transition-transform duration-500 hover:scale-105' 
                    style={{background: state.userType === "admin" ? "#1973c6" : "none", color: state.userType === "admin" ? "#e5f0f9" : "#1973c6"}}>Admins</div>
                </div>
                <div>
                    <Tooltip title="Filtrar" placement='top'>
                      <IconButton>
                        <FilterListRoundedIcon className='text-black dark:text-white transition-transform duration-1000 hover:scale-110'/>
                      </IconButton>
                    </Tooltip>
                </div>
              </div>

              {/* length */}
              <div className='max-w-5xl m-auto mb-1s mt-5'>
                <div className='w-32 flex items-center'>
                  <PeopleRoundedIcon className='text-black dark:text-white mr-3'/>
                  <p className='text-black dark:text-white'>{state.usersList.length + "/" +  state.users.length}</p>
                </div>
              </div>
              
              {/* list of users */}
              <div className='max-w-5xl m-auto mt-2'>
                  {state.usersList.length !== 0 && state.usersList.map((item:any, i:number) => (
                    <div key={i}>
                      {item.type === "student" && (
                        <Student student={item}/>
                      )}
                      {item.type === "partner" && (
                        <Partner partner={item}/>
                      )}
                      {item.type === "admin" && (
                        <Admin admin={item}/>
                      )}
                    </div>
                  ))}
              </div>
              
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
