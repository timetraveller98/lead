'use client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn} from 'next-auth/react'
import EmailIcon from '@mui/icons-material/Email';
import ReCAPTCHA from "react-google-recaptcha";
import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
  } from "@mui/material";
  import Visibility from "@mui/icons-material/Visibility";
  import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from 'react'


const AdminLogin = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
      };
    
        const handleSubmit = async() => {
          try{
            const signInData = await signIn('credentials',{
               email: email,
               password:password,
               redirect:false
            })
            if (signInData?.error) {
                toast.error("Invalid Credentials")
            } else { 
                
                router.push('/admin')  
                toast.success("Thank You")
                router.refresh();
            }
           } catch (error) {
              toast.error("An error occurred. Please try again.");
              console.error("Sign-in error:", error);
            }
          };
    // END
    return (
        <div className='d-flex justify-content-center my-5 align-items-center'>
            <div className='border rounded shadow p-5'>
                <TextField label="Email" fullWidth variant="outlined" className='my-3' 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">< EmailIcon color='primary'/></InputAdornment>
                  ),
                }}
                type="email" name='email' value={email} autoComplete='off' onChange={(e:any)=>setEmail(e.target.value)} required/><br />
                <FormControl className="my-3" fullWidth required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
           Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={password}
            onChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff color='primary' /> : <Visibility color='primary' />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
            required
            fullWidth
          />
        </FormControl>
        <br />

        <ReCAPTCHA
        sitekey="6LcukCMqAAAAAI9an8cFv9yBi65yU3ED3fI63_UM"
        onChange={(token)=>setRecaptchaToken(token)}
        size="normal"
        
      />
                <div className='d-flex justify-content-center my-3 align-items-center'>
                <Button onClick={handleSubmit} disabled={!recaptchaToken} variant='contained' color='primary'>Submit</Button>
                </div>
                <div>
                    <p className='my-3 text-center' style={{ fontSize: '14px', cursor: 'pointer' }}>Don't' Have Account ? <span className="text-primary" onClick={() => router.push('/signup')}>Sign up</span></p>
                </div>
                <div>
                    <p className='my-3 text-center' style={{ fontSize: '14px', cursor: 'pointer' }}><span className="text-primary" onClick={() => router.push('/forget')}>Forget Password</span></p>
                </div>
            </div>
        </div>
    )

}
export default AdminLogin;