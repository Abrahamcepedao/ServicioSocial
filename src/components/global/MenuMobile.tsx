//Next.js
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes';
import Image from 'next/image'
import Link from 'next/link'

//Context
import { useAuth } from '../../context/AuthContext'

//Logo image
import Logo from '../../../public/logo.png'

//CSS

//Material UI
import { IconButton, Tooltip } from '@mui/material'

//Material UI - icons
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';

//components
import ThemeToggler from './ThemeToggler'

const MenuMobile = () => {
    //router
    const router = useRouter()

    //Theme
    const { theme } = useTheme()

    //context
    const { logout } = useAuth()


    return (
        <>
            <div className="bg-light dark:bg-dark w-full z-10 fixed bottom-0 left-0 flex justify-between items-center lg:hidden">
                <Link className="flex justify-start items-center flex-1 flex-col p-2 rounded-3xl mb-2" href="/admin/dashboard" style={{background: router.pathname.includes('/dashboard') ? theme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(25,25,25,0.05)' : 'none', opacity: router.pathname.includes('/dashboard') ? 1 : 0.5}}>
                    {router.pathname.includes('/dashboard') ? (
                        <AnalyticsRoundedIcon className="sidebar__icon"/>
                    ) : (
                        <AnalyticsOutlinedIcon className="sidebar__icon"/>
                    )}
                    <p className="">Inicio</p>
                </Link>
                <Link className="flex justify-start items-center z-10 flex-1 flex-col p-2 rounded-3xl mb-2" href="/admin/users" style={{background: router.pathname.includes('/users') ? theme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(25,25,25,0.05)' : 'none', opacity: router.pathname.includes('/users') ? 1 : 0.5}}>
                    {router.pathname.includes('/users') ? (
                        <PeopleRoundedIcon className="sidebar__icon"/>
                    ) : (
                        <PeopleAltOutlinedIcon className="sidebar__icon"/>
                    )}
                    <p className="">Usuarios</p>
                </Link>
            </div>
        </>
    )
}

export default MenuMobile