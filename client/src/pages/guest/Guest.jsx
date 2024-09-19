import React, { useEffect, useState } from 'react';
import MediaCard from '../../components/MediaCard';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Carasoul } from '../../components/Carasoul';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { apiUrl } from '../../utils/Constants';
import Items from '../store/Items';

export default function Guest() {
    // Generate an array to render MediaCard components multiple times
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
        <Container>
            <div className='mt-4'>
                <Carasoul />
            </div>
            <Divider />

            <Divider />
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#434747' }}>
                Top Selling Products
            </Typography>

            {/* Container for MediaCard components */}
            <div className='gap-5 flex items-stretch justify-start'>
                {/* Render MediaCard components */}
                {
                    items.map((it, index)=>(
                        <MediaCard item={it} key={index}/>
                    ))
                }
            </div>

        </Container>
    );
}
