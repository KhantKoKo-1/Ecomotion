import React, { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from '../http';
import SearchIcon from '@mui/icons-material/Search';

function Account() {
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await http.get("/user/accounts");
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const handleDeleteAccount = async (accountId) => {
        try {
            console.log('Deleting account with ID:', accountId);

            const account = accounts.find((account) => account.id === accountId);
            console.log('Account to delete:', account);

            if (!accountId || !account) {
                console.error('Invalid account ID:', accountId);
                return;
            }

            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure you want to delete this account?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            try {
                                const response = await http.delete(`/user/accounts/${accountId}`);

                                console.log('Deleted account:', response.data);

                                if (response.status === 200) {
                                    console.log(response.data.message);
                                    fetchAccounts();
                                    toast.success('Account deleted successfully');
                                } else {
                                    console.error('Failed to delete account:', response.data.message);
                                    toast.error('Failed to delete account');
                                }
                            } catch (error) {
                                console.error('Error deleting account:', error);
                                toast.error('An error occurred while deleting the account');
                            }
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => { }
                    }
                ]
            });
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAccounts = accounts.filter((account) =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    background: 'white',
                    color: 'black',
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: 8,
                }}
            >
                <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                    Account Management
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Grid container alignItems="center" sx={{ mb: 2 }}>
                        <Grid item xs={12}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                                value={searchTerm}
                                onChange={handleSearchChange}
                                sx={{ marginBottom: '8px' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ fontFamily: 'inherit', fontWeight: 'bold' }}>
                                Name
                            </Typography>
                            <hr style={{ borderTop: '1px solid black', width: '100%', marginTop: 4, marginBottom: 8 }} />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ fontFamily: 'inherit', fontWeight: 'bold' }}>
                                Email
                            </Typography>
                            <hr style={{ borderTop: '1px solid black', width: '100%', marginTop: 4, marginBottom: 8 }} />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ fontFamily: 'inherit', fontWeight: 'bold' }}>
                                Edit
                            </Typography>
                            <hr style={{ borderTop: '1px solid black', width: '100%', marginTop: 4, marginBottom: 8 }} />
                        </Grid>
                    </Grid>
                    {filteredAccounts.map((account, index) => (
                        <Box key={`${index}-${account.name}-${account.email}`} sx={{ mb: 4 }}>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography variant="body1" sx={{ fontFamily: 'inherit' }}>
                                        {account.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body2" sx={{ fontFamily: 'inherit' }}>
                                        {account.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        onClick={() => handleDeleteAccount(account.id)}
                                        variant="contained"
                                        color="secondary"
                                        sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'red' } }}
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Box>
            </Box>
            <ToastContainer />
        </Container>
    );
}

export default Account; 