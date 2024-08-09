'use client'
import toast from 'react-hot-toast'
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import AdminHeading from '@/app/components/AdminHeading';
import { FormControl, Button,InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { MdSend } from "react-icons/md";

const Display = ({id}:any) => {
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
    // Call Single API Data

    const params = useParams();
    useEffect(() => {
        const pullData = async () => {
            let singleData = await axios.get(`/api/lead/${params.id}`).then((res) => (res.data.data)).
                catch((err) => console.log(err, +'Error Found Fetch API'))
            setName(singleData.name)
            setEmail(singleData.email)
            setContact(singleData.contact)
            setProduct(singleData.product)
        }

        pullData();
    }, [])
    // Data

    // Update User Data

    const handleSubmit = async () => {

        const pushData = await fetch(`/api/lead/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name,email,product,contact }),
            headers: { "Content-Type": "application/json" }
        })
        await pushData.json();
        router.push('/admin');
        toast.success("Lead Update")
    }



    return (
        <Container>
            <Row className='p-3 my-3 border'>
            <Col md={12}>
                    <div>
                        <AdminHeading title='Update Lead' center />
                    </div>
               </Col>
               <hr />
               <Row className='d-flex align-items-center justify-content-center'>
               <Col md={4}>
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
          <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Product</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={product}
                    className=""
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
               </Col>
               </Row>
                    
            </Row>
        </Container>
    );
}

export default Display;