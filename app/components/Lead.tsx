"use client";
import { FormControl, Button,InputAdornment, InputLabel, MenuItem, Select, FormControlLabel, Checkbox } from '@mui/material';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { MdSend } from "react-icons/md";
import { useState } from "react";

const Lead = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [productA, setProductA] = useState<boolean>(false);
  const [productB, setProductB] = useState<boolean>(false);
  const [productC, setProductC] = useState<boolean>(false);
  const [isValid, setIsValid] = useState(false);
  const [isValidContact, setIsValidContact] = useState(false);

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
    setIsValid(validateEmail(event.target.value));
  };

  const handleContact = (event: any) => {
    const input = event.target.value;
    setContact(input);
    setIsValidContact(validateMobile(input));
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateMobile = (number: string): boolean => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response = await fetch("/api/lead", {
      method: "POST",
      body: JSON.stringify({name,contact,email,productA,productB,productC}),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      toast.success("Thank You");
      router.refresh();
    } else {
      toast.error("Email Already Added");
    }
  };

  // END

  return (
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center border p-5 shadow bg-light rounded bg-body my-4 justify-content-center flex-column"
        >
          <TextField
            fullWidth
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            label="Name"
            multiline
            variant="outlined"
            className=""
            type="text"
            autoComplete="off"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <TextField
            fullWidth
            value={contact}
            onChange={handleContact}
            label="Contact"
            helperText={!isValid && contact !== "" && ""}
            multiline
            variant="outlined"
            className=""
            type="tel"
            autoComplete="off"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"> +91 </InputAdornment>
              ),
            }}
          />
          <br />
          <TextField
            fullWidth
            value={email}
            onChange={handleEmail}
            label="Email"
            helperText={!isValid && email !== "" && ""}
            multiline
            variant="outlined"
            className=""
            type="email"
            autoComplete="off"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <br />
         
          <div className='d-flex'>
          <p className='mt-3 me-2'>Product : </p>
          <FormControlLabel
                control={<Checkbox />}
                label="A"
                checked={productA}
                onChange={(e: any) => setProductA(e.target.checked)}
              />
          <FormControlLabel
                control={<Checkbox />}
                label="B"
                checked={productB}
                onChange={(e: any) => setProductB(e.target.checked)}
              />
          <FormControlLabel
                control={<Checkbox />}
                label="C"
                checked={productC}
                onChange={(e: any) => setProductC(e.target.checked)}
              />
              </div>
                <br />
          <div className="d-flex justify-content-center mb-2 align-items-center">
            <Button type="submit" variant="contained" color="primary" endIcon={<MdSend/>}>
              Submit
            </Button>
          </div>
        </form>
  );
};
export default Lead;
