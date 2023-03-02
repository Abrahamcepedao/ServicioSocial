import { db, storage } from '../firebase'
import { setDoc, doc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


const addUser = async (user) => {
    try {
        const docRef = doc(db, 'users', user.uid)
        const payload = {
            uid: user.uid,
            mail: user.mail,
            name: user.name,
            phone: user.phone,
            type: user.type,
        }
        console.log(payload)
        await setDoc(docRef, payload)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}

const addStudent = async (user) => {
    try {
        const docRef = doc(db, 'users', user.uid)
        const payload = {
            uid: user.uid,
            mail: user.mail,
            phone: user.phone,
            name: user.name,
            carrera: user.carrera,
            semestre: user.semestre,
            horas: user.horas,
            type: user.type,
            signedUp: false
        }

        console.log(payload)
        await setDoc(docRef, payload)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}

const signedUpStudent = async (matricula) => {
    try {
        const docRef = doc(db, 'users', matricula)
        const res = await getDoc(docRef)
        
        const temp = res.data()
        console.log(temp)

        const payload = {
            uid: temp.uid,
            mail: temp.mail,
            phone: temp.phone,
            name: temp.name,
            carrera: temp.carrera,
            semestre: temp.semestre,
            horas: temp.horas,
            type: temp.type,
            signedUp: true
        }
        await setDoc(docRef, payload)
        console.log(payload)
        return payload

    } catch(error) {
        console.log(error)
        return false
    }
} 

const addPartner = async (partner) => {
    try {

        const file = partner.file
        const storageRef = ref(storage, `file/${partner.uid}/${partner.fileName}`)

        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                console.log(progress)
            },
            (error) => {
                console.log(error)
                return false
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    try {
                        console.log(downloadURL)

                        const payload = {
                            uid: partner.uid,
                            mail: partner.mail,
                            phone: partner.phone,
                            name: partner.name,
                            key: partner.key,
                            company: partner.company,
                            fileName: partner.fileName,
                            fileUrl: downloadURL,
                            fileRef: `file/${partner.uid}/${partner.fileName}`,
                            type: partner.type,
                            signedUp: false
                        }

                        const docRef = doc(db, 'users', partner.uid)
                        await setDoc(docRef, payload)

                    } catch (error) {
                        console.log(error)
                        return false
                    }
                })
            }
        )
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}

const signedUpPartner = async (key) => {
    try {
        const docRef = doc(db, 'users', key)
        const res = await getDoc(docRef)
        
        const temp = res.data()
        console.log(temp)

        const payload = {
            uid: temp.uid,
            mail: temp.mail,
            phone: temp.phone,
            name: temp.name,
            key: temp.key,
            company: temp.company,
            fileName: temp.fileName,
            fileUrl: temp.fileUrl,
            fileRef: temp.fileRef,
            type: temp.type,
            signedUp: true
        }
        await setDoc(docRef, payload)
        console.log(payload)
        return payload

    } catch(error) {
        console.log(error)
        return false
    }
} 

const getUser = async (mail) => {
    try {
        console.log(mail)
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where("mail", "==", mail))
        const snapshot = await getDocs(q)
        let data = null
        //console.log(snapshot)
        snapshot.docs.forEach((item) => {

            if(item.exists) {
                
                data = item.data() 
            }
        })
        
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export { addUser, getUser, addStudent, addPartner, signedUpStudent, signedUpPartner }