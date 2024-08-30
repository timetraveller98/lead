"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {  useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/Person';
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

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const validatePassword = (value: string) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const lengthValid = value.length === 7;

    if (
      uppercaseRegex.test(value) &&
      lowercaseRegex.test(value) &&
      numberRegex.test(value) &&
      specialCharRegex.test(value) &&
      lengthValid
    ) {
      setError('');
    } else {
      setError(
        "Password Total 7 Letters, Example : 'Ac@1234'"
      );
    }
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorEmail(!validateEmail(event.target.value));
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setErrorName(event.target.value.trim() === "");
  };

  // Password Start
  const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
      };
  // Password End

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorName(name.trim() === "");
    setErrorEmail(email.trim() === "");
    if (
      name.trim() === "" ||
      email.trim() === ""
    ) {
      return;
    }
    let response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({name,email,password}),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      toast.success("Thank you! Please log in.");
      router.push("/login");
    } else if (
      response.status === 400 ||
      response.status === 409 ||
      response.status === 404
    ) {
      toast.error(responseData.message);
    } else {
      toast.error("Something went wrong");
    }
    
  };

  // END

  return (
    <div className="d-flex justify-content-center  my-4 align-items-center flex-column">
        <div className="border py-3 px-5 shadow bg-white">
   
        <TextField
          label="Name"
          variant="outlined"
          className="my-4"
          type="text"
          error={errorName}
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
      required
      fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">< PeopleIcon /></InputAdornment>
            ),
          }}
        />
      <br />
      
        <TextField
          label="Email"
          variant="outlined"
          error={errorEmail}
          className=""
          type="email"
          value={email}
          onChange={handleEmail}
          helperText={errorEmail ? "Invalid email address" : ""}
          autoComplete="off"
      required
      fullWidth
        
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">< EmailIcon /></InputAdornment>
            ),
          }}
        /> 
        <br />
   
        <FormControl className="my-4" variant="outlined" fullWidth>
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
                  {showPassword ? <VisibilityOff  /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
      required
      fullWidth
          />
          {error && <p className="mb-0 pb-0" style={{ color: 'blue',fontSize:'11px' }}>{error}</p>}
        </FormControl>
      <br />
      <div className="d-flex justify-content-center mb-3 align-items-center">
      
        <Button onClick={handleSubmit} disabled={!!error || !isValidEmail} variant="contained" color="primary">
          Submit
        </Button>
      </div>
      <div>
        <p
          className="my-3 text-center"
          style={{ fontSize: "14px", cursor: "pointer" }}
        >
          Already Have Account ?{" "}
          <span
         
            onClick={() => router.push("/login")}
            className="text-primary"
          >
            Login
          </span>
        </p>
      </div>
      </div>
    </div>
  );
};
export default Signup;
