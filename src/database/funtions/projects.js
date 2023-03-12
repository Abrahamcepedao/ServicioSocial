import { db, storage } from '../firebase'
import { setDoc, doc, updateDoc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'

/* add project */
const addProjectFirebase = async (project) => {
    try {
        const docRef = doc(db, 'projects', project.uid)
        const payload = {
            ...project,
            occupied: 0,
            students: []
        }
        console.log(payload)
        await setDoc(docRef, payload)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}

/* update project info */
const updateProjectFirebase = async (project) => {
    try {
        const docRef = doc(db, 'projects', project.uid)
        const payload = {
            ...project
        }

        console.log(payload)
        await updateDoc(docRef, payload)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}

/* delete project */
const deleteProjectFirebase = async (uid) => {
    try {
        const docRef = doc(db, 'projects', uid)
        await deleteDoc(docRef)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}


/* get proyect by org name */
const getProjectsOrg = async (org) => {
    try {
        const projectsRef = collection(db, 'projects')
        const q = query(projectsRef, where("company", "==", org))
        const snapshot = await getDocs(q)
        let data = []
        
        snapshot.docs.forEach((item) => {
            console.log(item)
            if(item.exists) {
                data.push(item.data())
            }
        })

        console.log(data)
        return data

    } catch(error) {
        console.log(error)
        return false
    }
}

/* get all projects */
const getAllProjects = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'projects'))

        let data = []
        snapshot.docs.forEach((item) => {
            if(item.exists) {
                data.push(item.data())
            }
        })

        return data
    } catch(error) {
        console.log(error)
        return false
    }
}

/* register student */
const registerStudentFirebase = async (project, student) => {
    try {
        const docRef = doc(db, 'projects', project.uid)
        const userRef = doc(db, 'users', student.uid)

        let students = project.students
        let studentTemp = {
            carrera: student.carrera,
            horas: student.horas,
            mail: student.mail,
            name: student.name,
            phone: student.phone,
            semestre: student.semestre,
            promedio: student.promedio,
            signeUp: student.signeUp,
            type: student.type,
            uid: student.uid
        }
        students.push(studentTemp)

        let payload = {
            ...project,
            students
        }
        console.log(payload)

        let currentProject = {
            name: project.name,
            key: project.key,
            group: project.group,
            crn: project.crn,
            hours: project.hours,
            inscripcion: project.inscripcion,
            availability: project.availability,
            occupied: project.occupied,
            duration: project.duration,
            carrerasList: project.carrerasList,
            modality: project.modality,
            location: project.location,
            company: project.company,
            logoUrl: project.logoUrl,
            uid: project.uid
        }

        let userPayload = {
            ...student,
            currentProject
        }
        console.log(userPayload)

        await updateDoc(docRef, payload)
        await updateDoc(userRef, userPayload)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}

/* unregister student */
const unregisterStudentFirebase = async (project, student) => {
    try {
        const docRef = doc(db, 'projects', project.uid)
        const userRef = doc(db, 'users', student.uid)

        let students = project.students
        students = students.filter((el) => el.uid !== student.uid)


        let payload = {
            ...project,
            students
        }
        console.log(payload)

        let userPayload = {
            ...student,
            currentProject: null
        }
        console.log(userPayload)

        await updateDoc(docRef, payload)
        await updateDoc(userRef, userPayload)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}

export { 
    addProjectFirebase, 
    updateProjectFirebase,
    deleteProjectFirebase,
    getProjectsOrg, 
    getAllProjects,
    registerStudentFirebase,
    unregisterStudentFirebase,
}