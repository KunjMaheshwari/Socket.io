import React, { useState } from 'react'
import {io, Socket} from "socket.io-client";
import {useEffect} from "react";
import {Container, Typography, TextField, Button} from "@mui/material";

const App = () => {

  const socket = io("http://localhost:3000/");

  useEffect(() =>{
    socket.on("connect", () =>{
      console.log("Connected");
    })

    socket.on("welcome", (s) =>{console.log(s)});

    return () =>{
      socket.disconnect();
    }
  }, []);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  }


  return (
    <Container maxWidth="sm">
    <Typography variant="h6" component="div" gutterBottom>
      {`Welcome to Socket Io ${Socket.io}`}
    </Typography>

    <form onSubmit={handleSubmit}>
      <TextField value={message} onChange = {(e) => setMessage(e.target.value)} id="outline-basic" label="Outlined" variant="outlined" />
      <Button type="submit" variant = "contained" color="primary">Send</Button>
    </form>
    </Container>
  )
}

export default App
