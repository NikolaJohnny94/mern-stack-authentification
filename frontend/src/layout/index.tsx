import { Outlet } from 'react-router-dom'

import { Navbar, Footer } from '../components'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='h-[100vh]'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
