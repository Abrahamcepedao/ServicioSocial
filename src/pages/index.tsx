//next
import type { NextPage } from 'next'
import Head from "next/head";

//react
import { useEffect, useState } from "react";

//CSS
import { useTheme } from "next-themes";
import 'tailwindcss/tailwind.css'

//Theme toggler
import ThemeToggler from '../components/global/ThemeToggler';

const Home: NextPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();


    useEffect(() => {
        setIsMounted(true);
      }, []);

    const switchTheme = () => {
        if (isMounted) {
          setTheme(theme === "light" ? "dark" : "light");
        }
    };

    return (
      <div className="pt-6 mt-28">
        <div className="flex justify-center items-center flex-col ">
          <ThemeToggler />
          
        </div>
      </div>
    )
}

export default Home