import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ showToast }) => {
    const [plants, setPlants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlants = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const config = {
                    headers: { 'x-auth-token': token },
                };
                const res = await axios.get('http://localhost:5000/api/plants', config);
                setPlants(res.data);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlants();
    }, [navigate]);

    const waterPlant = async (id) => {
        try {
            const token = localStorage.getItem('token');
            // Optimistic Update
            const updatedPlants = plants.map(p => {
                if (p._id === id) {
                    const nextDate = new Date();
                    nextDate.setDate(nextDate.getDate() + p.wateringFreq);
                    return { ...p, lastWatered: new Date().toISOString(), nextWateringDate: nextDate.toISOString() };
                }
                return p;
            });
            setPlants(updatedPlants);
            showToast('Plant watered successfully!', 'success'); // Toast

            await axios.put(`http://localhost:5000/api/plants/${id}/water`, {}, {
                headers: { 'x-auth-token': token }
            });
        } catch (err) {
            console.error(err);
            // console.error(err); // Removed debug log
            showToast('Failed to water plant', 'error');
        }
    };

    const deletePlant = async (id) => {
        // Student-level: Confirmation removed to simplify interaction
        try {
            const token = localStorage.getItem('token');
            // Optimistic Update
            setPlants(plants.filter(p => p._id !== id));
            showToast('Plant removed from garden', 'success');

            await axios.delete(`http://localhost:5000/api/plants/${id}`, {
                headers: { 'x-auth-token': token }
            });
        } catch (err) {
            console.error(err);
            showToast('Failed to delete plant', 'error');
        }
    };

    const getNextWateringDate = (plant) => {
        if (plant.nextWateringDate) return new Date(plant.nextWateringDate);
        return new Date(); // Fallback
    };

    const isOverdue = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(date);
        target.setHours(0, 0, 0, 0);
        return today > target;
    };

    const isToday = (date) => {
        const today = new Date();
        const target = new Date(date);
        return today.getDate() === target.getDate() &&
            today.getMonth() === target.getMonth() &&
            today.getFullYear() === target.getFullYear();
    };

    if (isLoading) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>Loading your garden...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>My Garden</h2>
                {plants.length > 0 && (
                    <button onClick={() => navigate('/add-plant')} className="btn" style={{ width: 'auto' }}>
                        + Add Plant
                    </button>
                )}
            </div>

            {plants.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3>Your garden is empty 🌱</h3>
                    <p style={{ margin: '15px 0', color: '#666' }}>Start your journey by adding your first plant!</p>
                    <button onClick={() => navigate('/add-plant')} className="btn" style={{ maxWidth: '200px', margin: '0 auto' }}>
                        Add Plant
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {plants.map(plant => {
                        const nextDate = getNextWateringDate(plant);
                        const overdue = isOverdue(nextDate);
                        const dueToday = isToday(nextDate);

                        let statusColor = 'inherit';
                        let statusText = '';

                        if (overdue) {
                            statusColor = '#d32f2f'; // Red
                            statusText = '(Overdue!)';
                        } else if (dueToday) {
                            statusColor = '#f57c00'; // Orange
                            statusText = '(Due Today)';
                        }

                        return (
                            <div key={plant._id} className="plant-card" style={{ overflow: 'hidden' }}>
                                {plant.image && (
                                    <img
                                        src={plant.image}
                                        alt={plant.name}
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image'; }}
                                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
                                    />
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <h3>{plant.name}</h3>
                                    {(overdue || dueToday) && (
                                        <span style={{
                                            background: statusColor,
                                            color: 'white',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {overdue ? 'Thirsty!' : 'Water Me'}
                                        </span>
                                    )}
                                </div>

                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
                                    {plant.notes || 'No notes added.'}
                                </p>

                                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>
                                    <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                                        <strong>Frequency:</strong> Every {plant.wateringFreq} days
                                    </p>
                                    <p style={{ margin: '5px 0', fontSize: '0.9rem', color: statusColor, fontWeight: overdue || dueToday ? 'bold' : 'normal' }}>
                                        <strong>Next Water:</strong> {nextDate.toDateString()} {statusText}
                                    </p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <button onClick={() => waterPlant(plant._id)} className="btn">
                                        💧 Water
                                    </button>
                                    <button
                                        onClick={() => deletePlant(plant._id)}
                                        className="btn"
                                        style={{ backgroundColor: 'white', color: '#d32f2f', border: '1px solid #d32f2f' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
