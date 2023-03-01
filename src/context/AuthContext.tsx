import {createContext, useContext}  from 'react'
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut } 
from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../database/firebase'
import { addUser, getUser, addStudent, signedUpStudent, addPartner, signedUpPartner } from '../database/funtions/auth'

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}: {children:React.ReactNode}) => {
    const [user,setUser] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user){
                console.log(user)
                const temp = await getUser(user.email)
                
                setUser(temp)
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signup = async (mail:string, password:string, name:string, phone:string, type: string) => {

        return await createUserWithEmailAndPassword(auth, mail, password).then((result) => {
            const temp = {
                uid: result.user.uid,
                mail,
                name,
                phone,
                type
            }
            console.log(temp)
            setUser(temp)
            addUser(temp)
        })
    }

    const signupStudent = async(mail:string, password:string, matricula:string) => {
        return await createUserWithEmailAndPassword(auth, mail, password).then(async (result) => {
            //get student and set data
            const res = await signedUpStudent(matricula)
            if(res !== false) {
                setUser(res)
            } else {
                return false
            }
        })
    }

    const signupPartner = async(mail:string, password:string, key:string) => {
        return await createUserWithEmailAndPassword(auth, mail, password).then(async (result) => {
            //get student and set data
            const res = await signedUpPartner(key)
            if(res !== false) {
                setUser(res)
            } else {
                return false
            }
        })
    }




    const login = async (mail:string, password:string) => {
        return signInWithEmailAndPassword(auth, mail, password)
            .then(async (result) => {
                const item = await getUser(mail)
                console.log(item)
                setUser(item)
            })
    }

    const logout = async() => {
        setUser(null)
        await signOut(auth)
    }

    const createStudent = async (mail:string, phone:string, name:string, matricula:string, carrera:string, semestre:number, horas: number) => {
        const temp = {
            uid: matricula,
            mail,
            phone,
            name,
            carrera,
            semestre,
            horas,
            type: "student"
        }
        console.log(temp)
        const res = await addStudent(temp)
        console.log(res)
        return res
    }

    const createPartner = async (mail:string, phone:string, name:string, company:string, key:string, file:File, fileName:string) => {
        const temp = {
            uid: key,
            mail,
            phone,
            name,
            key,
            company,
            file,
            fileName,
            type: "partner"
        }
        
        const res = await addPartner(temp)
        console.log(res)
        return res
    }

    return <AuthContext.Provider value={{user, login, signup, logout, createStudent, createPartner, signupStudent, signupPartner}}>
        {loading ? null : children}
    </AuthContext.Provider>
}