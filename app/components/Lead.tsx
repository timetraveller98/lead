"use client";

import { FormControl, Button, InputAdornment, TextField } from '@mui/material';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PersonIcon from "@mui/icons-material/Person";
import Price from '@mui/icons-material/CurrencyRupee';
import { MdSend } from "react-icons/md";
import { useEffect, useState } from "react";

interface ProductProps {
  userId : string | undefined
}

const Product:React.FC<ProductProps> = ({userId}) => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({ name, price,userId }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      toast.success("Product added");
      router.push('/');
    } else if (response.status === 400 ||
      response.status === 404 ||
      response.status === 500) {
      toast.error(responseData.message);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex align-items-center border p-5 shadow bg-light rounded bg-body my-4 justify-content-center flex-column"
    >
      <FormControl fullWidth variant="outlined" margin="normal">
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          variant="outlined"
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
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <TextField
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          label="Price"
          variant="outlined"
          type="number"
          autoComplete="off"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Price />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <div className="d-flex justify-content-center my-3 align-items-center">
        <Button type="submit" variant="contained" color="primary" endIcon={<MdSend />}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Product;
