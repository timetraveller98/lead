'use client'
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Container } from 'react-bootstrap';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { signOut } from "next-auth/react";

interface NavbarProps {
  email: string | null | undefined;
  name: string | null | undefined;
}

const NavbarData:React.FC<NavbarProps> = ({name,email}) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter()

  const handleLogout = () => {
    const callbackUrl = `${window.location.origin}/login`;
    signOut({ redirect: false, callbackUrl });
    setExpanded(!expanded)
    router.refresh();
  }
  const handleLogin = () => {
    setExpanded(!expanded)
    router.push('/login')
  }

  const closeNavbar = () => setExpanded(false);
  return (
    <Navbar expand="lg" className="bg-body-teritary bg-body sticky-top" expanded={expanded}>
      <Container>
        <Link href="/" onClick={closeNavbar}><Image src='/logo.png' className='m-0 p-2' width={220} height={80} alt='logo' /></Link>
        <Navbar.Toggle className='me-3 text-light' onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className='text-secondary d-flex align-items-center my-4'>
            { email ? 
          <div className='navButton1'>
         <Button variant="contained" color="primary" endIcon={<LogoutIcon/>} onClick={handleLogout}>Logout</Button><div className='text-center m-0 p-0'>Welcome : <span style={{textTransform:"capitalize"}} className='text-primary'> {name}</span></div>
        </div>
        :<div className='navButton1'>
          <Button variant='contained' color="primary" endIcon={<LoginIcon/>} onClick={handleLogin}>login</Button>
        </div>
        }
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>


  )
}
export default NavbarData;