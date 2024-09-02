'use client'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState, useMemo } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from "@mui/icons-material/Edit";

interface Props {
    email:string | null | undefined;
}
const ManageAdmin:React.FC<Props>= ({email}) => {
    const router = useRouter();
    const [productData, setProductData] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/api/product')
            .then((response) => {
                const filteredProducts = response.data.products.filter((product: any) => product.user.email === email);
                setProductData(filteredProducts);
            })
            .catch((error: any) => {
                const errorMessage = error.response ? error.response.data.message : error.message;
                toast.error(errorMessage);
            });
    }, [productData]);
//   Show Contact

const updateProduct =(id: any)=>{
    router.push(`/admin/product/${id}`)
}
    // Call Delete API
    const deleteProduct = async (id: any) => {
        if (confirm("Do you want to Delete ?") === true) {
            try {
                let response = await fetch(`/api/product/${id}`, {
                    method: 'DELETE',
                    cache: 'no-cache',
                });
                if (response.ok) {
                    toast.success('Product deleted successfully');
                    router.refresh()
                } else {
                    toast.error('Failed to delete Lead');
                }
            } catch (error) {
                toast.error('An error occurred while deleting the Lead');
            }
        }
    }
    const columns = useMemo(() => [
        { field: 'name', headerName: 'Name', width: 150 },
        {
            field: 'price', headerName: 'Price', width: 200,
        },
        {
            field: 'update', headerName: 'Update', width: 130, renderCell: (params: any) => (
              
                <EditIcon style={{cursor:'pointer'}} onClick={() => updateProduct(params.id)} color='success' fontSize='large' />
            )
        },
        {
            field: 'delete', headerName: 'Delete', width: 130, renderCell: (params: any) => (
              
                <DeleteForeverIcon style={{cursor:'pointer'}}  onClick={() => deleteProduct(params.id)} color='error' fontSize='large' />
            )
        }
    ], [productData]);

    return (
        <Container>
            <Row>
                <Col md={12} className='my-3'>
                <Box sx={{ height: '400px', width: '100%' }}>
                    <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                        rows={productData}
                        columns={columns}
                        getRowId={(row) => row.id}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                </Box>
                </Col>
            </Row>
        </Container>
    );
}

export default ManageAdmin;
