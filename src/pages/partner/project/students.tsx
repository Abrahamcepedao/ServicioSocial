//Next
import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router';

//React
import React, { useState, useEffect } from 'react'

//Material UI
import Snackbar from '@mui/material/Snackbar';
import { Theme, useTheme } from '@mui/material/styles';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//Material UI - icons
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

//Components
import SideBar from '@/components/global/Sidebar';
import Student from '@/components/partner/Student';

//Context
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/context/ProjectsContext';

//data


//interfaces
import Project from '@/utils/interfaces/Project.interface';
import StudentInt from '@/utils/interfaces/Student.interface';
import IStudent from '@/utils/interfaces/Student.interface';

//Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Students() {
    //context
    const { user } = useAuth()
    const { unregisterStudent, acceptStudent } = useProjects()
    const selectedProject:Project = useProjects().selectedProject

    //Material UI
    const theme = useTheme();

    //router
    const router = useRouter()

    //useState
    const [allStudents, setAllStudents] = useState<Array<StudentInt>>([])
    const [studentList, setStudentList] = useState<Array<StudentInt>>([])

    //useState - open
    const [state, setState] = useState({
        open: false,
    })

    //useState - alert open
    const [utils, setUtils] = useState({
      open: false,
      message: "",
      severity: "error",
      collapse: false,
      filter: ""
    })


    //useEffect
    useEffect(() => {
      if(selectedProject !== null) {
        if(selectedProject.students.length !== 0) {
          setStudentList(selectedProject.students)
          setAllStudents(selectedProject.students)
        }
      } else {
        router.push("/partner/projects")
      }
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
      let temp:StudentInt[] = [...allStudents]
      temp = temp.filter((el:StudentInt) => el.uid.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) || el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) )
      setStudentList(temp)
      setUtils({...utils, filter: e.target.value})
    }

    /* handle unregister student */
    const handleUnregisterClick = async(item:IStudent) => {
      console.log(item)
      const res = await unregisterStudent(selectedProject, item)
        if(res) {
            if(selectedProject.inscripcion === "Inscripción por IRIS") {
                setUtils({
                    ...utils,
                    open: true,
                    severity: 'success',
                    message: "¡Se elimino el registro exitosamente!"
                })
            } else {
                setUtils({
                ...utils,
                    open: true,
                    severity: 'success',
                    message: "¡Se rechazó la solicitud exitosamente!"
                })
            }
            let data = [...allStudents]
            data = data.filter((el:IStudent) => el.uid !== item.uid)
            setAllStudents(data)
            setStudentList(data)
            setState({...state})
        } else {
            if(selectedProject.inscripcion === "Inscripción por IRIS") {
                setUtils({
                    ...utils,
                    open: true,
                    severity: 'error',
                    message: "Ocurrió un error al eliminar el registro"
                })
            } else {
                setUtils({
                    ...utils,
                    open: true,
                    severity: 'error',
                    message: "Ocurrió un error al rechazar la solicitud"
                })
            }
            
            setState({...state})
        }
    }


    /* handle unregister student */
    const handleAcceptClick = async(item:IStudent) => {
      console.log(item)
      const res = await acceptStudent(selectedProject, item)
        if(res) {
            setUtils({
                ...utils,
                open: true,
                severity: 'success',
                message: "¡Se aceptó la solicitud exitosamente!"
            })
            let data = [...allStudents]
            data = data.filter((el:IStudent) => el.uid !== item.uid)
            data.push({
              ...item,
              status: "RE"
            })
            setAllStudents(data)
            setStudentList(data)
            setState({...state})
        } else {
            setUtils({
                  ...utils,
                  open: true,
                  severity: 'error',
                  message: "Ocurrió un error al aceptar la solicitud"
              })
            
            setState({...state})
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
            <div className='lg:w-[calc(100%-176px)] min-h-screen bg-light dark:bg-dark lg:left-44 relative p-4 md:p-10 pb-20'>
                {/* header */} 
                <div className='flex justify-between items-center max-w-5xl m-auto mt-10'>
                    {selectedProject !== null && (
                      <div>
                        <h2 className='subtitle text-black dark:text-white flex-1 mb-3'>{selectedProject.name}</h2>
                        <div className='border border-primary rounded-2xl pl-3 pr-3 pt-2 pb-2 flex justify-start items-center w-24'>
                            <PeopleAltRoundedIcon className='text-black dark:text-white mr-3'/>
                            <p className='text-black dark:text-white flex-1'> {selectedProject.occupied + "/" + selectedProject.availability}</p>
                        </div>
                        
                      </div>
                    )}
                    
                    <div className='flex justify-end items-center'>
                      <div className='filter__container'>
                          <SearchRoundedIcon/>
                          <input placeholder='Nombre o matricula' value={utils.filter} onChange={(e) => {handleFilterChange(e)}} className='filter__input'/>
                      </div>
                    </div>
                </div>

                {/* table with students */}
                <div className='max-w-5xl m-auto mt-8'>
                    <h2 className='subtitle2 text-black dark:text-white opacity-80'>Alumnos registrados</h2>
                    {(studentList.length !== 0 && studentList.filter((el:StudentInt) => el.status === "RE").length !== 0) ? studentList.filter((el:StudentInt) => el.status === "RE").map((student: StudentInt, i:number) => (
                      <div key={i}>
                        <Student student={student} deleteStudent={handleUnregisterClick} acceptStudent={handleAcceptClick} projectType={selectedProject.inscripcion === "Inscripción por IRIS" ? "IRIS" : "Entrevista"}/>
                      </div>
                    )) : (
                      <div className='rounded-xl p-5 bg-lightAlt dark:bg-darkAlt'>
                        <h3 className='subtitle2'>No se encontraron alumnos registrados</h3>
                      </div>
                    )}  

                    {selectedProject.inscripcion !== "Inscripción por IRIS" && (
                      <>
                        <h2 className='subtitle2 text-black dark:text-white mt-10 opacity-80'>Alumnos solicitantes</h2>
                        {(studentList.length !== 0 && studentList.filter((el:StudentInt) => el.status === "AP").length !== 0) ? studentList.filter((el:StudentInt) => el.status === "AP").map((student: StudentInt, i:number) => (
                          <div key={i}>
                            <Student student={student} deleteStudent={handleUnregisterClick} acceptStudent={handleAcceptClick} projectType={selectedProject.inscripcion === "Inscripción por IRIS" ? "IRIS" : "Entrevista"}/>
                          </div>
                        )) : (
                          <div className='rounded-xl p-5 bg-lightAlt dark:bg-darkAlt'>
                            <h3 className='subtitle2'>No se encontraron alumnos solicitantes</h3>
                          </div>
                        )}
                      </>  
                    )}
                </div>

            </div>

            {/* alert */}
            <Snackbar open={utils.open} autoHideDuration={4000} onClose={handleClose}>
              {/* @ts-ignore */}
              <Alert onClose={handleClose} severity={utils.severity} sx={{ width: '100%' }}>
                {utils.message}
              </Alert>
            </Snackbar>
        </main>
      </>
    )
}
