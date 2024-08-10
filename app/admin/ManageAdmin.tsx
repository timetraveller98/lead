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

const ManageAdmin = () => {
    const router = useRouter();
    const [leadData, setLeadData] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/api/lead')
            .then((response) => {
                setLeadData(response.data.data);
            })
            .catch((error: any) => {
                const errorMessage = error.response ? error.response.data.message : error.message;
                toast.error(errorMessage);
            });
    }, [leadData]);
//   Show Contact

const updateLead =(id: any)=>{
    router.push(`/admin/lead/${id}`)
}
    // Call Delete API
    const deleteLead = async (id: any) => {
        if (confirm("Do you want to Delete ?") === true) {
            try {
                let response = await fetch(`/api/lead/${id}`, {
                    method: 'DELETE',
                    cache: 'no-cache',
                });
                if (response.ok) {
                    toast.success('Lead deleted successfully');
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
        { field: 'contact', headerName: 'Contact', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'products', headerName: 'Products', width: 200, renderCell: (params: any) => (
                <p>{params.row.productA ? " A, ":null}{params.row.productB? " B, ":null}{params.row.productC? "C ":null}</p>
            )
        },
        {
            field: 'update', headerName: 'Update', width: 130, renderCell: (params: any) => (
              
                <EditIcon style={{cursor:'pointer'}} onClick={() => updateLead(params.id)} color='success' fontSize='large' />
            )
        },
        {
            field: 'delete', headerName: 'Delete', width: 130, renderCell: (params: any) => (
              
                <DeleteForeverIcon style={{cursor:'pointer'}}  onClick={() => deleteLead(params.id)} color='error' fontSize='large' />
            )
        }
    ], [leadData]);

    return (
        <Container>
            <Row>
                <Col md={12} className='my-3'>
                <Box sx={{ height: '400px', width: '100%' }}>
                    <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                        rows={leadData}
                        columns={columns}
                        getRowId={(row) => row._id}
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
