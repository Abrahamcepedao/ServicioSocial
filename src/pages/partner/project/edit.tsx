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
import { IconButton, Collapse, Tooltip } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

//Material UI - icons
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import { CreateRounded, DeleteRounded } from '@mui/icons-material';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';

//CSS
import styles from '@/styles/Home.module.css'

//Components
import SideBar from '@/components/global/Sidebar';
import { TransparentInput } from '@/components/global/Select';

//Context
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/context/ProjectsContext';

//data
import carreras from '@/utils/constants/carreras';
import claves from '@/utils/constants/claves';
import duration from '@/utils/constants/duration';
import hours from '@/utils/constants/hours';
import modalities from '@/utils/constants/modalities';
import inscripcion from '@/utils/constants/inscripcion';

//interfaces
import ProjectInt from '@/utils/interfaces/Project.interface';


//Material UI - Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function Edit() {
    //context
    const { user } = useAuth()
    const { updateProject } = useProjects()
    const selectedProject:ProjectInt = useProjects().selectedProject

    //Material UI
    const theme = useTheme();

    //router
    const router = useRouter()

    //useState
    const [projectsList, setProjectsList] = useState<Array<ProjectInt>>([])

    //useState - formData
    const [formData, setFormData] = useState({
      name: "",
      key: "",
      group: "",
      crn: "",
      duration: "",
      hours: "",
      inscription: "",
      availability: "",
      modality: "",
      location: "",
    })
    const [carrerasList, setCarrerasList] = useState<string[]>([]);

    //useState - alert open
    const [utils, setUtils] = useState({
      open: false,
      message: "",
      severity: "error",
      collapse: false
    })


    //useEffect
    useEffect(() => {
      //console.log(user)
      console.log(selectedProject)
      if(selectedProject !== null) {
        //set form data
        setFormData({
            name: selectedProject.name,
            key: selectedProject.key,
            group: selectedProject.group,
            crn: selectedProject.crn,
            duration: selectedProject.duration,
            hours: selectedProject.hours,
            inscription: selectedProject.inscripcion,
            availability: selectedProject.availability.toString(),
            modality: selectedProject.modality,
            location: selectedProject.location
        })
        setCarrerasList(selectedProject.carrerasList)
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


    /* handle input change */
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      })
    }

    /* handle select change */
    const handleSelectChange = (e:SelectChangeEvent<string>) => {
      console.log(e.target.value)
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      })
    }

    /* handle carreras change */
    const handleCarrerasChange = (event: SelectChangeEvent<typeof carrerasList>) => {
      const {
        target: { value },
      } = event;
      setCarrerasList(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value
      );
    };


     /* verify form */
    const verifyForm = () => {
      //check fields are not empty
      
      return true
    }

    /* handle create project */
    const handleUpdateProjec = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //verify form
        if(verifyForm()) {
          let temp = {
            name: formData.name,
            key: formData.key,
            group: formData.group,
            crn: formData.crn,
            hours: formData.hours,
            inscripcion: formData.inscription,
            availability: Number(formData.availability),
            duration: formData.duration,
            carrerasList: carrerasList,
            modality: formData.modality,
            location: formData.location,
            company: user.company,
            logoUrl: user.fileUrl,
            uid: selectedProject.uid,
            occupied: selectedProject.occupied,
            students: selectedProject.students
          }
          
          const res = await updateProject(temp)
          if(res) {
            //resete form
            setUtils({
                ...utils,
                open: true,
                severity: 'success',
                message: "Projecto agregado exitosamente.",
                collapse: false
              })
          } else {
            setUtils({
                ...utils,
                open: true,
                severity: 'error',
                message: "Error al registrar proyecto. Inténtelo de nuevo.",
                collapse: false
              })
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
            <div className='lg:w-[calc(100%-176px)] min-h-screen bg-light dark:bg-dark lg:left-44 relative p-4 md:p-10 pb-20'>
                {/* header */} 
                <div className='flex justify-between items-center max-w-5xl m-auto mt-10'>
                    <h2 className='title text-dark dark:text-light flex-1'>Edita la experiencia</h2>
                   
                </div>

                {/* edit project */}
                <div className='max-w-5xl m-auto mt-10'>
                    <form onSubmit={(e) => {handleUpdateProjec(e)}}>
                        <div className='grid grid-cols-1 gap-4 mb-8 items-end sm:grid-cols-2 md:grid-cols-3 opacity-75'>
                            {/* name */}
                            <div className='input__container !border:gray'>
                                <input 
                                name='name' placeholder='Nombre de experiencia'
                                autoComplete='off'
                                value={formData.name} onChange={(e) => {handleInputChange(e)}}
                                className="input"
                                />
                            </div>


                            {/* group */}
                            <div className='input__container '>
                                <input 
                                name='group' placeholder='Clave del grupo'
                                autoComplete='off'
                                value={formData.group} onChange={(e) => {handleInputChange(e)}}
                                className="input"
                                />
                            </div>

                            {/* crn */}
                            <div className='input__container '>
                                <input 
                                name='crn' placeholder='CRN'
                                autoComplete='off'
                                value={formData.crn} onChange={(e) => {handleInputChange(e)}}
                                className="input"
                                />
                            </div>

                            {/* Ubicación */}
                            <div className='input__container '>
                                <input 
                                name='location' placeholder='Ubicación de experiencia'
                                autoComplete='off'
                                value={formData.location} onChange={(e) => {handleInputChange(e)}}
                                className="input"
                                />
                            </div>

                            {/* availability */}
                            <div className='input__container '>
                                <input 
                                name='availability' placeholder='Cupo de experiencia'
                                autoComplete='off'
                                value={formData.availability} onChange={(e) => {handleInputChange(e)}}
                                className="input"
                                />
                            </div>

                            {/* key */}
                            <FormControl className="w-full m-0">
                                <label className='mb-2'>Claves</label>
                                <Select
                                className='!border-black dark:!text-white'
                                value={formData.key}
                                name="key"
                                onChange={(e) => {handleSelectChange(e)}}
                                label="Carreras"
                                input={<TransparentInput className='!outline-none'/>}
                                inputProps={{
                                    classes: {
                                        icon: "!text-black dark:!text-white"
                                    }
                                }}
                                >
                                {claves.map((key) => (
                                    <MenuItem
                                    key={key}
                                    value={key}
                                    >
                                    {key}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            {/* duration (select)*/}
                            <FormControl className="w-full m-0">
                                <label className='mb-2'>Duración</label>
                                <Select
                                className='!border-black dark:!text-white'
                                value={formData.duration}
                                name="duration"
                                onChange={(e) => {handleSelectChange(e)}}
                                input={<TransparentInput className='!outline-none'/>}
                                inputProps={{
                                    classes: {
                                        icon: "!text-black dark:!text-white"
                                    }
                                }}
                                >
                                {duration.map((item, i) => (
                                    <MenuItem
                                    key={i}
                                    value={item}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            {/* hours */}
                            <FormControl className="w-full m-0">
                                <label className='mb-2'>Horas a acreditar</label>
                                <Select
                                className='!border-black dark:!text-white'
                                value={formData.hours}
                                name="hours"
                                onChange={(e) => {handleSelectChange(e)}}
                                input={<TransparentInput className='!outline-none'/>}
                                inputProps={{
                                    classes: {
                                        icon: "!text-black dark:!text-white"
                                    }
                                }}
                                >
                                {hours.map((key,i) => (
                                    <MenuItem
                                    key={i}
                                    value={key}
                                    >
                                    Hasta {key}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            {/* incripcion */}
                            <FormControl className="w-full m-0">
                                <label className='mb-2'>Tipo de inscripción</label>
                                <Select
                                className='!border-black dark:!text-white'
                                value={formData.inscription}
                                name="inscription"
                                onChange={(e) => {handleSelectChange(e)}}
                                input={<TransparentInput className='!outline-none'/>}
                                inputProps={{
                                    classes: {
                                        icon: "!text-black dark:!text-white"
                                    }
                                }}
                                >
                                {inscripcion.map((key,i) => (
                                    <MenuItem
                                    key={i}
                                    value={key}
                                    >
                                    Hasta {key}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            {/* Carreras */}
                            <FormControl className="w-full m-0">
                                <label className='mb-2'>Carreras</label>
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                className='!border-black'
                                multiple
                                value={carrerasList}
                                onChange={handleCarrerasChange}
                                label="Carreras"
                                input={<TransparentInput id="select-multiple-chip" className='!outline-none'/>}
                                inputProps={{
                                    classes: {
                                        icon: "!text-black dark:!text-white"
                                    }
                                }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className="!text-black dark:!text-white !border-2 !border-primary !border-solid" />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {carreras.map((carrera) => (
                                    <MenuItem
                                    key={carrera}
                                    value={carrera}
                                    style={getStyles(carrera, carrerasList, theme)}
                                    >
                                    {carrera}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            {/* modality */}
                            <FormControl className="w-full m-0">
                                <label className='mb-2'>Modalidad</label>
                                <Select
                                className='!border-black dark:!text-white'
                                value={formData.modality}
                                name="modality"
                                onChange={(e) => {handleSelectChange(e)}}
                                input={<TransparentInput className='!outline-none'/>}
                                inputProps={{
                                    classes: {
                                        icon: "!text-black dark:!text-white"
                                    }
                                }}
                                >
                                {modalities.map((item, i) => (
                                    <MenuItem
                                    key={i}
                                    value={item}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            

                        </div>
                        <div className='text-center'>
                            <button className='button bg-primary text-white' type='submit'>Guardar datos</button>
                        </div>
                    </form>
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
