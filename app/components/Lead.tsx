"use client";
import { FormControl, Button,InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
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
  const [product, setProduct] = useState("");
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
      body: JSON.stringify({name,contact,email,product}),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      router.refresh();
      toast.success("Thank You");
    } else {
      toast.error("Something went wrong");
    }
  };

  // END

  return (
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center border py-4 shadow bg-light px-5 rounded bg-body my-4 justify-content-center flex-column"
        >
          <TextField
            fullWidth
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            label="Name"
            multiline
            variant="outlined"
            className="m-1 p-1"
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
            className="m-1 p-1"
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
            className="m-1 p-1"
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
          <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Product</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={product}
                    className="m-1"
                    label="Gender"
                    onChange={(e:any)=>setProduct(e.target.value)}
                  >
                    <MenuItem value={"Product A"}>Product A</MenuItem>
                    <MenuItem value={"Product B"}>Product B</MenuItem>
                    <MenuItem value={"Product C"}>Product C</MenuItem>
                  </Select>
                </FormControl>
                <br />
          <div className="d-flex justify-content-center my-2 align-items-center">
            <Button type="submit" variant="contained" color="primary" endIcon={<MdSend/>}>
              Submit
            </Button>
          </div>
        </form>
  );
};
export default Lead;
