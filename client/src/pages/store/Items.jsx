import React, { useEffect, useState } from 'react';
import MediaCard from '../../components/MediaCard';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { apiUrl } from '../../utils/Constants';
import axios from 'axios';

export default function Items() {
  const [items, setItems] = useState([]);


  const getItems = async () => {
    try {
      const data = await axios.get(`${apiUrl}/item`)
      console.log(data.data);
      setItems(data.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getItems()
  }, [])

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
        Latest Items
      </Typography>

      {/* Container for MediaCard components */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Render MediaCard components */}
        {
          items.map((it, index) => (
            <MediaCard item={it} key={index} />
          ))
        }
      </div>

      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
        Electronic
      </Typography>

      {/* Container for MediaCard components */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Render MediaCard components */}
        {
          items.map((it, index) => (
            <MediaCard item={it} key={index} />
          ))
        }
      </div>

      {/* <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
        Fashion
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {
          items.map((it) => (
            <MediaCard item={it} />
          ))
        }
      </div> */}
{/* 
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
        Sports
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
   
        {
          items.map((it) => (
            <MediaCard item={it} />
          ))
        }
      </div> */}
    </div>
  )
}
