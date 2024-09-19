import React, { useEffect, useState } from 'react';
import { useAuth } from '../common/AuthContext';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiUrl } from '../../utils/Constants';

export default function ItemPage() {
    const { userRole, addItemToCart } = useAuth();
    const { id } = useParams();
    const [item, setItem] = useState({});

    const getItem = async () => {
        try {
            const data = await axios.get(`${apiUrl}/item/${id}`);
            setItem(data.data);
            return data.data;
        } catch (error) {
            console.log(error);
            toast.error('Error fetching item');
        }
    };

    useEffect(() => {
        getItem();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div x-data="{ image: 1 }" x-cloak>
                        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                            <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                <img src={item?.image || "data:image/jpeg;base64,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"} alt="Product Image" className='h-full' />
                                </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="max-w-md">
                                <h2 className="text-2xl font-bold text-gray-900">{item?.name}</h2>
                                <p className="mt-2 text-lg text-gray-600">
                                    Price: LKR {item?.price}
                                </p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => addItemToCart(item)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Add to Cart
                                    </button>
                                    {userRole === 'admin' && (
                                        <Link to={`/edit-item/${item?.id}`} className="ml-4 text-blue-500">
                                            Edit Item
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
