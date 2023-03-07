//Next theme
import { useTheme } from 'next-themes';

//React
import { useState, useEffect } from 'react';

//Material UI
import { IconButton } from '@mui/material';

//Material UI - icons
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

const ThemeToggler = () => {
    //theme    
    const { theme, setTheme } = useTheme();

    //useState - mounted
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

  return (
        <IconButton 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle Dark Mode"
        >
            {theme === "light" ? (
                <ModeNightRoundedIcon className="text-black w-5 h-5" />
            ) : (
                <WbSunnyRoundedIcon className="text-white w-5 h-5" />
            )}
            
        </IconButton>
        
  );
};

export default ThemeToggler;