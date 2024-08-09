'use client'
import { Container, Col, Row, Image } from 'react-bootstrap';
import Link from 'next/link';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Youtube from '@mui/icons-material/YouTube';
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import Twitter from '@mui/icons-material/X';
import LinkedIn from '@mui/icons-material/LinkedIn';


const Footer = () => {
  return (
    <footer className='text-secondary bg-body border-top' id='footer' >
      <Container >
        <Row className='' >
     
        <Col md={4}>
       <div className='mt-4 '>
        <Image src="/logo.png" alt="logo" fluid/>
       </div>

          </Col>
        <Col md={4}>
          <ul className='mt-4'>
              <h5 className='fw-bold mb-4'>Company</h5> 
            <Link href={'/'} className='text-decoration-none text-secondary'><li className='my-2'>About Us</li></Link>
            <Link href={'/'} className='text-decoration-none text-secondary'><li className='my-2'>Career</li></Link>
            <Link href={'/'} className='text-decoration-none text-secondary'><li className='my-2'>Post Job</li></Link>
            <Link href={'/'} className='text-decoration-none text-secondary'><li className='my-2'>Contact Us</li></Link>
            
              </ul>
          </Col>
          <Col md={4}>
            <ul className='mt-4'>
            <h5 className='fw-bold'>Contact</h5>
              <div className='my-4'>
                <h6 className='fw-bold'>Office Address</h6>
                <li className='fw-light my-2'><span  className='me-2'><HomeWorkIcon /></span> Office No. 403, Haware Grand Heritage, Kalewadi Phata, Pune, Maharashtra, 411057</li>
              </div>
             
              <h6 className='fw-bold'>Contact Details</h6>
              <div>
                <li className='fw-light my-2'><span className='me-2'><LocalPhoneIcon /></span> +91 9621851495</li>
                <li className='fw-light my-2'><span  className='me-2'><EmailIcon /></span> vaibhav@etlhive.com</li>
              </div>
              <div className='my-4'>
              <Link href={'/'} target='_blank'><Facebook fontSize='medium' className='m-2 text-primary'  /></Link>
              <Link href={'/'} target='_blank'><Youtube color='error' fontSize='medium' className='m-1' /></Link>
              <Link href={'/'} target='_blank'><Twitter fontSize='medium' className='m-2 text-dark' /></Link>
              <Link href={'/'} target='_blank'><Instagram color='error' fontSize='medium' className='m-1' /></Link>
              <Link href={'/'} target='_blank'><LinkedIn fontSize='medium' className='m-2 text-primary' /></Link>

            </div>
            </ul>
          </Col>
          <Col xs={12}>
            <hr />
            <h6 className='fw-light' style={{ color: 'black', textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>Copyrights ©2000 etlhive.com all rights reserved.</h6>
          </Col>

        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
