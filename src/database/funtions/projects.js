import { db, storage } from '../firebase'
import { setDoc, doc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const addProjectFirebase = async (project) => {
    try {
        const docRef = doc(db, 'projects', project.uid)
        const payload = {
            ...project
        }
        console.log(payload)
        await setDoc(docRef, payload)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}

const getProjectsOrg = async (org) => {
    try {
        const projectsRef = collection(db, 'projects')
        const q = query(projectsRef, where("company", "==", org))
        const snapshot = await getDocs(q)
        let data = []
        console.log(snapshot.docs)
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

export { addProjectFirebase, getProjectsOrg }