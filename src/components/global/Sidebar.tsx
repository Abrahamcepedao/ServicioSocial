//Next.js
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes';
import Image from 'next/image'
import Link from 'next/link'

//Context
import { useAuth } from '../../context/AuthContext'

//Logo image
import Logo from '../../../public/logo.png'
import LogoW from '../../../public/logo_w.png'

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
import MenuMobile from './MenuMobile'
import MobileHeader from './MobileHeader';
import ThemeToggler from './ThemeToggler'

const SideBar = () => {
    //router
    const router = useRouter()

    //Theme
    const { theme } = useTheme()

    //context
    const { logout } = useAuth()


    return (
        <>
            <div className="bg-light dark:bg-dark w-44 fixed top-0 left-0 h-screen justify-between items-center flex-col hidden lg:flex">

                {/* logo */}
                <div className="w-full p-5">
                    <Image src={theme === "light" ? Logo : LogoW} className="" alt="URent"/>
                </div>

                {/* tabs */}
                <div className='p-5 w-full'>
                    <Link className="flex justify-start items-center p-2 rounded-3xl mb-2" href="/admin/dashboard" style={{background: router.pathname.includes('/dashboard') ? theme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(25,25,25,0.05)' : 'none', opacity: router.pathname.includes('/dashboard') ? 1 : 0.5}}>
                        {router.pathname.includes('/dashboard') ? (
                            <AnalyticsRoundedIcon className="sidebar__icon"/>
                        ) : (
                            <AnalyticsOutlinedIcon className="sidebar__icon"/>
                        )}
                        <p className="">Inicio</p>
                    </Link>
                    <Link className="flex justify-start items-center p-2 rounded-3xl mb-2" href="/admin/users" style={{background: router.pathname.includes('/users') ? theme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(25,25,25,0.05)' : 'none', opacity: router.pathname.includes('/users') ? 1 : 0.5}}>
                        {router.pathname.includes('/users') ? (
                            <PeopleRoundedIcon className="sidebar__icon"/>
                        ) : (
                            <PeopleAltOutlinedIcon className="sidebar__icon"/>
                        )}
                        <p className="">Usuarios</p>
                    </Link>
                </div>


                {/*  */}
                <div>
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