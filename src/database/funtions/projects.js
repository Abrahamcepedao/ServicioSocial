import { db, storage } from '../firebase'
import { setDoc, doc, updateDoc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


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

export { 
    addProjectFirebase, 
    getProjectsOrg, 
    getAllProjects,
    updateProjectFirebase 
}