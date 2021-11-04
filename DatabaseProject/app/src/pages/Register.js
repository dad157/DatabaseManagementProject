import React from 'react';
import '../App.css';
import '../Register.css';
import {Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, InputAdornment, IconButton, OutlinedInput} from '@mui/material';
import axios from 'axios';
import { Route } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';

class Register extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        occupation: '',
        address: '',
        phoneNumber: '',
        dateOfBirth: '',
        dateOfHire: '',
        department: '',
        departments: [{"ID": "1234","Name": "test"}],
        showPassword: false
      };
  }

  onDeptChange = (event) => {
    this.setState({department: event.target.value});
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => {return({showPassword: !prevState.showPassword})});
  }

  componentDidMount = () => {
    axios(
      "http://localhost:38621/department",
    {
      method: 'GET',
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          mode: 'no-cors'
        }
      }).then((data) => {
      this.setState({departments: data.data});
    });
  }

  render() {
      return(
        <Route exact path="/register">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={this.handleRegisterSubmit}
          >
            <div className='form-container'>
              <TextField
                required
                id="outlined-email-required"
                label="Email"
                placeholder="Email"
                value={this.state.email}
                onInput={ e => this.setState({email: e.target.value})}
              />
              <FormControl sx={{ m: 1, width: '25ch' }}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onInput={e => this.setState({password: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.togglePasswordVisibility}
                        edge="end"
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <TextField
                required
                id="outlined-firstname-required"
                label="First Name"
                placeholder="First Name"
                value={this.state.firstName}
                onInput={ e => this.setState({firstName: e.target.value}) }
              />
              <TextField
                required
                id="outlined-lastname-required"
                label="Last Name"
                placeholder="Last Name"
                value={this.state.lastName}
                onInput={ e => this.setState({lastName: e.target.value}) }
              />
              <TextField
                required
                id="outlined-occupation-required"
                label="Occupation"
                placeholder="Occupation"
                value={this.state.occupation}
                onInput={ e => this.setState({occupation: e.target.value}) }
              />
              <TextField
                required
                id="outlined-address-required"
                label="Address"
                placeholder="Address"
                value={this.state.address}
                onInput={ e => this.setState({address: e.target.value}) }
              />
              <TextField
                required
                id="outlined-phonenumber-required"
                label="Phone Number"
                placeholder="Phone Number"
                value={this.state.phoneNumber}
                onInput={ e => this.setState({phoneNumber: e.target.value}) }
              />
              <TextField
                required
                id="outlined-dob-required"
                label="Date of Birth"
                placeholder="Date of Birth"
                value={this.state.dateOfBirth}
                onInput={ e => this.setState({dateOfBirth: e.target.value}) }
              />
              <TextField
                required
                id="outlined-doh-required"
                label="Date of Hire"
                placeholder="Date of Hire"
                value={this.state.dateOfHire}
                onInput={ e => this.setState({dateOfHire: e.target.value}) }
              />
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="label">Department *</InputLabel>
                <Select
                  required
                  labelId="label"
                  label="Department *"
                  id="outlined-department-required"
                  value={this.state.department}
                  onChange={this.onDeptChange}
                >
                  {this.state.departments.map((option) => (
                    <MenuItem key={option.ID} value={option.ID}>{option.Name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit">
                Submit
              </Button>
            </div>
          </Box>
        </Route>
      );
  }
}

export default Register;