import {createContext, useContext}  from 'react'
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut } 
from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../database/firebase'
import { addUser, getUser } from '../database/funtions/auth'

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}: {children:React.ReactNode}) => {
    const [user,setUser] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user){
                const temp = await getUser(user.uid)
                
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



    const login = async (mail:string, password:string) => {
        return signInWithEmailAndPassword(auth, mail, password)
            .then(async (result) => {
                const item = await getUser(result.user.uid)
                console.log(item)
                setUser(item)
            })
    }

    const logout = async() => {
        setUser(null)
        await signOut(auth)
    }

    const createStudent = async (mail:string, name:string, matricula:string, carrera:string, semestre:number, horas: number) => {
        const temp = {
            uid: matricula,
            mail,
            name,
            carrera,
            semestre,
            horas,
            type: "student"
        }
        
        addUser(temp)
    }

    const createPartner = async (mail:string, name:string, company:string, key:string, file:File, fileName:string) => {
        const temp = {
            uid: key,
            mail,
            name,
            key,
            file,
            fileName,
            type: "partner"
        }
        
        addUser(temp)
    }

    return <AuthContext.Provider value={{user, login, signup, logout, createStudent, createPartner}}>
        {loading ? null : children}
    </AuthContext.Provider>
}