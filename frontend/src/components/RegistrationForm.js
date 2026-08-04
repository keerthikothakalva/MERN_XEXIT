import React, {
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';

import api from '../api';


function RegistrationForm() {

  const [
    username,
    setUsername
  ] = useState('');

  const [
    email,
    setEmail
  ] = useState('');

  const [
    password,
    setPassword
  ] = useState('');


  const navigate =
    useNavigate();

  const handleSubmit = async (e) => {

  e.preventDefault();

  console.log(
    'REGISTER DATA:',
    {
      username,
      email,
      password
    }
  );

  try {

    await api.post(
      '/api/auth/register',
      {
        username,
        email,
        password
      }
    );

    navigate('/login');

  } catch (err) {

  console.error(
    'REGISTRATION STATUS:',
    err.response?.status
  );

  console.error(
    'REGISTRATION MESSAGE:',
    err.response?.data?.message
  );

  console.error(
    'FULL ERROR DATA:',
    JSON.stringify(
      err.response?.data,
      null,
      2
    )
  );

}

};


  return (

    <Box

      sx={{
        height:'90vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5f5f5'
      }}>
      <Paper

        elevation={4}

        sx={{
          padding:4,
          width:'100%',
          maxWidth:400,
          borderRadius:3
        }}>

        <Typography

          variant="h5"

          fontWeight="bold"

          gutterBottom>

          Register

        </Typography>
        <form
          onSubmit={
            handleSubmit
          }>

          <TextField

            label="Username"

            fullWidth

            margin="normal"

            value={
              username
            }
            onChange={
              (e) =>
                setUsername(
                  e.target.value
                )
            }
            required/>

          <TextField

            label="Email"

            type="email"

            fullWidth

            margin="normal"

            value={
              email
            }

            onChange={
              (e) =>
                setEmail(
                  e.target.value
                )
            }
            required/>

          <TextField

            label="Password"

            type="password"

            fullWidth

            margin="normal"

            value={
              password
            }
            onChange={
              (e) =>
                setPassword(
                  e.target.value
                )
            }
            required/>


          <Button

            type="submit"

            variant="contained"

            fullWidth

            sx={{
              mt:2,
              py:1.2,
              fontWeight:
                'bold'

            }}>

            Register

          </Button>

        </form>

      </Paper>

    </Box>

  );

}


export default RegistrationForm;