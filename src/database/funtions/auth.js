import { db } from '../firebase'
import { setDoc, doc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'


const addUser = async (user) => {
    try {
        const docRef = doc(db, 'users', user.uid)
        if(user.password){
            const payload = {
                uid: user.uid,
                mail: user.mail,
                name: user.name,
                phone: user.phone,
                type: user.type,
                password: user.password,
                signedUp: false,
                accountType: "demo"
            }
            await setDoc(docRef, payload)
        } else {
            const payload = {
                uid: user.uid,
                mail: user.mail,
                name: user.name,
                phone: user.phone,
                type: user.type,
            }
            console.log(payload)
            await setDoc(docRef, payload)
        }
        
    } catch(error) {
        console.log(error)
    }
}

const getUser = async (uid) => {
    try {
        const docRef = doc(db, 'users', uid)
        const res = await getDoc(docRef)
        
        console.log(res.data())
        return res.data()
    } catch (error) {
        console.log(error)
    }
}

export { addUser, getUser }