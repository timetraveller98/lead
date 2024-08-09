import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/style/style.css'
import { Toaster } from 'react-hot-toast';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import 'aos/dist/aos.css';
import { Poppins } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'

const poppins = Poppins({
  subsets: ["latin" ,"latin-ext"],
  weight: "400" as const,
  style: "normal" as const 
});



export const metadata: Metadata = {
  title: 'Job Portal',
  description: "Welcome to Job Portal, your one-stop destination for all your digital needs. From cutting-edge website development to captivating graphic design and expert IT consultancy, we empower businesses to thrive in the digital landscape. With a dedicated team of professionals, we craft tailored solutions to elevate your online presence and drive success. Let's bring your vision to life, together",
  keywords:"digital marketing, website development, website designer, content writing, graphic designing, it support, android development, software engineer,career,find jobs,online jobs,Jobs in India,jobs near me,Job search,job alert,Best jobs in india,Work from home,Career Opportunities,Best career options",
  robots:"index, follow",
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={poppins.className}>
      <Toaster toastOptions={
          {
            style: {
              background: 'rgb(51 65 85)',
              color: '#fff',
            }
          }} />
  
        <Header />
        {children}
        <Toaster />
        <Footer/>
      </body>
       <GoogleAnalytics gaId="G-ZKPY2PB0KF" />
    </html>
  )
}
