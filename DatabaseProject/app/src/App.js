import React, { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfHire, setDateOfHire] = useState('');

  function handleLogInSubmit(event) {
    event.preventDefault();
    console.log( 'Email:', email, 'Password: ', password);
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();
    console.log( 'Email:', email, 'Password: ', password, 'First Name: ', firstName); 
  }

  return (
      <div className="App">
        <header className="header">
          <p>
            Time Management System
          </p>
        </header>
        <Router>
          <Button><Link to="/sign-in">Sign-In</Link></Button>
          <Button><Link to="/register">Register</Link></Button>
          <Route exact path="/sign-in">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleLogInSubmit}
            >
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Required Email"
                  placeholder="Email"
                  value={email}
                  onInput={ e=>setEmail(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Password"
                  placeholder="Password"
                  value={password}
                  onInput={ e=>setPassword(e.target.value)}
                />
              </div>
              <Button>
                <Link to="/information">
                  Submit
                </Link>
              </Button>
            </Box>
          </Route>
          <Route exact path="/register">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleRegisterSubmit}
            >
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Required Email"
                  placeholder="Email"
                  value={registerEmail}
                  onInput={ e=>setRegisterEmail(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Password"
                  placeholder="Password"
                  value={registerPassword}
                  onInput={ e=>setRegisterPassword(e.target.value)}
                /><br />
                <TextField
                  required
                  id="outlined-required"
                  label="Required First Name"
                  placeholder="First Name"
                  value={firstName}
                  onInput={ e=>setFirstName(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Last Name"
                  placeholder="Last Name"
                  value={lastName}
                  onInput={ e=>setLastName(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Occupation"
                  placeholder="Occupation"
                  value={occupation}
                  onInput={ e=>setOccupation(e.target.value)}
                /><br />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Address"
                  placeholder="Address"
                  value={address}
                  onInput={ e=>setAddress(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Phone Number"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onInput={ e=>setPhoneNumber(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Date of Birth"
                  placeholder="Date of Birth"
                  value={dateOfBirth}
                  onInput={ e=>setDateOfBirth(e.target.value)}
                /><br />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Date of Hire"
                  placeholder="Date of Hire"
                  value={dateOfHire}
                  onInput={ e=>setDateOfHire(e.target.value)}
                />
              </div>
              <Button>
                <Link to="/sign-in">
                  Submit
                </Link>
              </Button>
            </Box>
          </Route>
          <Route exact path="/information">
            Hello
          </Route>
        </Router>
      </div>
  );
}

export default App;