import { Input, Typography, Box, Container, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import logo from './logo.svg';
import Table from './Table'
import {ToastError,ToastSuccess} from './utility'
import './App.css';
import keys from './config';

const App = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inputKey, setInputKey] = useState(Date.now())
  const [newData, setNewData] = useState(false)

  const uploadVideo = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("video", file);
      var requestOptions = {
        method: 'POST',
        headers: {},
        body: formData,
        redirect: 'follow'
      };
      setLoading(true)
      const response = await fetch(keys.BASE_URL + 'addData', requestOptions)
      let result = await response.json();
      console.log(result);
      setLoading(false)
      if (response.status === 200) {
        setNewData(!newData)
        setInputKey(Date.now())
        setFile(null)
        ToastSuccess("Video uploaded successfully")
      } else {
        ToastError(result.msg)
      }
    } else {
      ToastError('Please provide a video file')
    }
    
  }

  
  return (
    <div className="App">
      <Box sx={{ width: '100%', marginTop: '50px'}}>
      <Typography textAlign='center' variant="h4" component="div" gutterBottom>
        Upload Video
      </Typography>
    </Box>
     <Container minWidth="sm">
        <Stack spacing={2} direction="row" justifyContent='center'>
          <Input type="file" name="upload" key={inputKey} onChange={(e) => {
            console.log(e.target.files[0])
            setFile(e.target.files[0])
          }} required/>
          <Button variant="contained" disabled={loading} onClick={uploadVideo}>Upload</Button>
        </Stack>
        <BeatLoader color={"#F2B711"} loading={loading} css={css`
        display: block;
        margin: 4;
        `} size={15} />
        <div style={{marginTop: '50px'}}>
          <Table newData={newData} />
        </div>
      </Container>
    </div>
  );
}

export default App;
