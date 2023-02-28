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

const MobileHeader = () => {
    //router
    const router = useRouter()

    //Theme
    const { theme } = useTheme()

    //context
    const { logout } = useAuth()


    return (
        <>
            <div className="bg-light dark:bg-dark w-full z-10 fixed top-0 left-0 flex justify-between items-center lg:hidden">
                <ThemeToggler/>
            </div>
        </>
    )
}

export default MobileHeader