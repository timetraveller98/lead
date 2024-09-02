'use client'
import toast from 'react-hot-toast'
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import AdminHeading from '@/app/components/AdminHeading';
import { Button,InputAdornment, FormControlLabel, Checkbox } from '@mui/material';
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import { MdSend } from "react-icons/md";
import Price from '@mui/icons-material/CurrencyRupee';

const Display = ({id}:any) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0)

    // Call Single API Data

    const params = useParams();
    useEffect(() => {
        const pullData = async () => {
            let singleData = await axios.get(`/api/product/${params.id}`).then((res) => (res.data.products)).
                catch((err) => console.log(err, +'Error Found Fetch API'))
            setName(singleData.name)
            setPrice(singleData.price)
        }

        pullData();
    }, [params.id])
    // Data

    // Update Product Data

    const handleSubmit = async (e:any) => {
      e.preventDefault();
      try {
        const response = await axios.put(`/api/product/${params.id}`, {
          name,
          price
        });
        if (response.status !== 200) {
          toast.error('Failed to update product');
          return;
        }
        router.push('/admin');
        toast.success("Product Updated");
      } catch (error) {
        toast.error("Failed to update");
      }
    };



    return (
        <Container className='my-3'>
            <Row className='my-3 border'>
            <Col md={12}>
                    <div>
                        <AdminHeading title='Update Product' center />
                    </div>
               </Col>
               <hr />
               <Row className='d-flex align-items-center justify-content-center'>
               <Col md={4} className="d-flex align-items-center my-4 mx-2 p-5 shadow bg-light rounded bg-body justify-content-center">
               <form

          
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
            value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                label="Price"
            multiline
            variant="outlined"
            className="m-1 p-1"
            autoComplete="off"
            type='number'
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"> 
                <Price /> </InputAdornment>
              ),
            }}
          />
          <br />
          <div className="d-flex justify-content-center my-3 align-items-center">
            <Button onClick={handleSubmit} variant="contained" color="primary" endIcon={<MdSend/>}>
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