//Next.js
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes';
import Image from 'next/image'
import Link from 'next/link'

//Context
import { useAuth } from '../../context/AuthContext'
import { useProjects } from '@/context/ProjectsContext';

//Logo image
import Logo from '../../../public/logo.png'
import LogoW from '../../../public/logo_w.png'

//Material UI
import { IconButton, Tooltip } from '@mui/material'

//Material UI - icons
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

//components
import MenuMobile from './MenuMobile'
import MobileHeader from './MobileHeader';
import ThemeToggler from './ThemeToggler'

const SideBar = () => {
    //router
    const router = useRouter()

    //Theme
    const { theme } = useTheme()

    //context
    const { logout, user } = useAuth()
    const { logoutUser } = useProjects()


    /* handle logout */
    const handleLogout = () => {
        //clear local storage and context
        logout()
        logoutUser()    
    }

    return (
        <>
            <div className="bg-lightAlt dark:bg-darkAlt w-44 fixed top-0 left-0 h-screen justify-between items-center flex-col hidden lg:flex">

                {/* logo */}
                <div className="w-full p-5">
                    <Image src={theme === "light" ? Logo : LogoW} className="" alt="URent"/>
                </div>

                {/* tabs */}
                <div className='p-5 w-full'>
                    <Link className="flex justify-start items-center p-2 rounded-3xl mb-2" href={`/${user.type}/dashboard`} style={{background: router.pathname.includes('/dashboard') ? theme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(25,25,25,0.05)' : 'none', opacity: router.pathname.includes('/dashboard') ? 1 : 0.5}}>
                        {router.pathname.includes('/dashboard') ? (
                            <AnalyticsRoundedIcon className="sidebar__icon text-black dark:text-white"/>
                        ) : (
                            <AnalyticsOutlinedIcon className="sidebar__icon text-black dark:text-whitetext-black dark:text-white"/>
                        )}
                        <p className="">Inicio</p>
                    </Link>
                    {user.type === "admin" && (
                        <Link className="flex justify-start items-center p-2 rounded-3xl mb-2" href="/admin/users" style={{background: router.pathname.includes('/users') ? theme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(25,25,25,0.05)' : 'none', opacity: router.pathname.includes('/users') ? 1 : 0.5}}>
                            {router.pathname.includes('/users') ? (
                                <PeopleRoundedIcon className="sidebar__icon text-black dark:text-white"/>
                            ) : (
                                <PeopleAltOutlinedIcon className="sidebar__icon text-black dark:text-white"/>
                            )}
                            <p className="">Usuarios</p>
                        </Link>
                    )}

                    {user.type !== "partner" && (
                        <Link className="flex justify-start items-center p-2 rounded-3xl mb-2" href="/student/oferta" style={{background: router.pathname.includes('/oferta') ? theme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(25,25,25,0.05)' : 'none', opacity: router.pathname.includes('/oferta') ? 1 : 0.5}}>
                            {router.pathname.includes('/oferta') ? (
                                <AccountTreeRoundedIcon className="sidebar__icon text-black dark:text-white"/>
                            ) : (
                                <AccountTreeOutlinedIcon className="sidebar__icon text-black dark:text-white"/>
                            )}
                            <p className="">Oferta</p>
                        </Link>
                    )}

                    {user.type === "student" && (
                        <Link className="flex justify-start items-center p-2 rounded-3xl mb-2" href="/student/favorites" style={{background: router.pathname.includes('/favorites') ? theme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(25,25,25,0.05)' : 'none', opacity: router.pathname.includes('/favorites') ? 1 : 0.5}}>
                            {router.pathname.includes('/favorites') ? (
                                <FavoriteRoundedIcon className="sidebar__icon text-black dark:text-white"/>
                            ) : (
                                <FavoriteBorderRoundedIcon className="sidebar__icon text-black dark:text-white"/>
                            )}
                            <p className="">Favoritos</p>
                        </Link>
                    )}

                    {user.type === "partner" && (
                        <Link className="flex justify-start items-center p-2 rounded-3xl mb-2" href="/partner/projects" style={{background: router.pathname.includes('/projects') ? theme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(25,25,25,0.05)' : 'none', opacity: router.pathname.includes('/projects') ? 1 : 0.5}}>
                            {router.pathname.includes('/projects') ? (
                                <DashboardRoundedIcon className="sidebar__icon text-black dark:text-white"/>
                            ) : (
                                <DashboardOutlinedIcon className="sidebar__icon text-black dark:text-whitetext-black dark:text-white"/>
                            )}
                            <p className="">Proyectos</p>
                        </Link>
                    )}
                    
                </div>


                {/*  */}
                <div className='pb-5'>
                    {/* <Link href={"/settings"}>
                        <Tooltip title="Ajustes" placement='top'>
                            <IconButton>
                                <SettingsRoundedIcon className="sidebar__icon text-black dark:text-white"/>
                            </IconButton>
                        </Tooltip>
                    </Link> */}
                    <Tooltip title="Cerrar sesión" placement='top'>
                        <IconButton onClick={handleLogout}>
                            <LogoutRoundedIcon className="sidebar__icon text-black dark:text-white"/>
                        </IconButton>
                    </Tooltip>
                    <ThemeToggler/>
                </div>

            </div>

            {/* mobile header */}
            <MobileHeader/>

            {/* mobile menu */}
            <MenuMobile/>
        </>
    )
}

export default SideBar