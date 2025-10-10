'use client'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock'
import GitHubIcon from '@mui/icons-material/Github'
import GoogleIcon from '@mui/icons-material/Google'

import { useState } from "react";

const AuthSignIn = (props: any) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isErrorUserName, setIsErrorUserName] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

    const [errorUserName, setErrorUserName] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');

    const handleSubmit = () => {
        setIsErrorUserName(false);
        setIsErrorPassword(false);
        setErrorUserName('');
        setErrorPassword('');

        if (!userName) {
            setIsErrorUserName(true);
            setErrorUserName('User Name is required!');
            return;
        }

        if (!password) {
            setIsErrorPassword(true);
            setErrorPassword('Password is required!');
            return;
        }

        console.log('Submit form', { userName, password });
    }

    return (
        <Box
        // sx={{
        //     backgroundImage: "linear-gradient(to bottom, #ff9aef, #fedac1, #d5e1cf, #b7e6d9)",
        //     backgroundColor: "#b7e6d9",
        //     backgroundRepeat: "no-repeat"
        // }}
        >
            <Grid container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    lg={4}
                    sx={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                >
                    <div style={{ margin: "20px" }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                            <Avatar>
                                <LockIcon />
                            </Avatar>
                            <Typography component="h1">
                                Sign In
                            </Typography>
                        </Box>

                        <TextField
                            onChange={(e) => setUserName(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="UserName"
                            name="username"
                            autoFocus
                            error={isErrorUserName}
                            helperText={errorUserName}
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            error={isErrorPassword}
                            helperText={errorPassword}

                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                        <Button
                            sx={{
                                my: 3
                            }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Divider>Or using</Divider>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: "25px",
                                mt: 3
                            }}
                        >
                            <Avatar
                                sx={{
                                    cursor: 'pointer',
                                    bgcolor: "orange"
                                }}
                            >
                                <GitHubIcon titleAccess="Login with Github" />
                            </Avatar>
                            <Avatar
                                sx={{
                                    cursor: 'pointer',
                                    bgcolor: "orange"
                                }}
                            >
                                <GoogleIcon titleAccess="Login with Google" />
                            </Avatar>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AuthSignIn;