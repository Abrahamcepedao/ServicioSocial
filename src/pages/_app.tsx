import type { AppProps } from 'next/app'

//CSS
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'


//Context
import { AuthContextProvider } from '../context/AuthContext'

//Routers
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/auth/ProtectedRoute'

const noAuthRequired:string[] = ['/', '/login', '/signup', '/register/students', '/register/partners']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <AuthContextProvider>
      <ThemeProvider attribute="class" enableSystem={true}>
        {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps}/>
        ) : (
          <ProtectedRoute>
            <Component {...pageProps}/>
          </ProtectedRoute>
        )}
      </ThemeProvider>
    </AuthContextProvider>
  )
}
