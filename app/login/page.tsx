'use client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn} from 'next-auth/react'
import EmailIcon from '@mui/icons-material/Email';
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


const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            const signInData = await signIn('credentials',{
               email: email,
               password:password,
               redirect:false
            })
            if (signInData?.error) {
                toast.error("Invalid Credentials")
            } else { 
                
                router.push('/employer')  
                toast.success("Thank You")
                router.refresh();
            }
          }
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
                <FormControl className="my-3" required variant="outlined">
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
          />
        </FormControl>{" "}
                <div className='d-flex justify-content-center my-2 align-items-center'>
                <Button onClick={handleSubmit} variant='contained' color='primary'>Submit</Button>
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
export default Login;