import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Paper,
  Grid,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ContentCopy, Delete } from '@mui/icons-material';
import { ReactSortable } from 'react-sortablejs';
import { motion } from 'framer-motion';
const Input = styled('input')({ display: 'none' });
import axios from 'axios';

const questions = [
  'What lights up your weekends?',
  'If someone really knew you, what would surprise them?',
  'What kind of vibe are you looking for in a match?'
];

const generateId = () =>
  crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 9);

export default function ProfileForm() {
  const [photos, setPhotos] = useState([]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [description, setDescription] = useState('');

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 4 - photos.length);
    const newPhotos = files.map((file) => ({
      id: generateId(),
      file
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
    
    
  };

  const handleDeletePhoto = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const generateDescription = async () => {
    const reqData = {answers:{},photos:[]}
    var i=0;
    answers.map((answer)=>{
      if(answer!=""){
        reqData.answers[questions[i]]=answer
        
      }
      i+=1;
    })
    photos.map((photo)=>{
      reqData.photos.push(photo.file.name)
    })
    
    try {
      
      const finalDesc = await axios({
        url: "http://localhost:3000/generate-profile",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: reqData, 
      }); ;
      
      setDescription(finalDesc.data.profileDescription);
    } catch (error) {
      alert("Error with Auto Generation")
    }
  };

  const handleSubmit = () => {
    
    alert('Your profile draft is ready to charm! 💘');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: 'linear-gradient(to right, #ffe1ea, #ffc6dc)',
        padding: '2rem',
        borderRadius: '20px'
      }}
    >
      <Box
        sx={{
          maxWidth: 650,
          mx: 'auto',
          p: 4,
          bgcolor: 'white',
          borderRadius: 4,
          boxShadow: '0px 8px 30px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight={700}>
          💖 Let’s Create a Catchy Profile
        </Typography>

        <Typography variant="body1" mb={2}>
          Upload your best pics and share a few fun answers. We'll whip up a dating description you'll actually want to use 😄
        </Typography>

        <label htmlFor="upload-button">
          <Input
            accept="image/*"
            id="upload-button"
            multiple
            type="file"
            onChange={handlePhotoUpload}
            disabled={photos.length >= 4}
          />
          <Button
            variant="contained"
            component="span"
            disabled={photos.length >= 4}
            sx={{
              background: 'linear-gradient(135deg, #ff3c68, #ffa7c4)',
              color: 'white',
              mb: 2,
              '&:hover': {
                transform: 'scale(1.05)',
                background: 'linear-gradient(135deg, #ff1e50, #ff7fa4)',
              }
            }}
          >
            📷 Upload Photos
          </Button>
        </label>

        <Box mb={3}>
          <ReactSortable
            list={photos}
            setList={setPhotos}
            animation={200}
            ghostClass="ghost"
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            {photos.map((photo) => {
              const url = URL.createObjectURL(photo.file);
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Box sx={{ position: 'relative', width: 100, height: 100 }}>
                    <Paper
                      elevation={6}
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 3,
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleDeletePhoto(photo.id)}
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: '#fff',
                        '&:hover': {
                          backgroundColor: '#eee',
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </motion.div>
              );
            })}
          </ReactSortable>
        </Box>

        {questions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <TextField
              fullWidth
              multiline
              label={`💬 ${q}`}
              margin="normal"
              value={answers[i]}
              onChange={(e) => handleAnswerChange(i, e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
            />
          </motion.div>
        ))}

        <Box mt={3}>
          <TextField
            fullWidth
            multiline
            label="✨ Auto-Generated Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            InputProps={{
              endAdornment: description && (
                <InputAdornment position="end">
                  <IconButton onClick={copyToClipboard}>
                    <ContentCopy />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3
              }
            }}
          />
        </Box>

        <Grid container spacing={2} mt={3}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={generateDescription}
              disabled={photos.length === 0}
              sx={{
                borderColor: '#ff3c68',
                color: '#ff3c68',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#ffecf2',
                  borderColor: '#ff3c68'
                }
              }}
            >
              ✍️ Write It for Me
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#00cc66',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#00b359'
                }
              }}
            >
              ❤️ Save My Draft
            </Button>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}