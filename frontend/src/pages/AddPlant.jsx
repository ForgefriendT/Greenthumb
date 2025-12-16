import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPlant = ({ showToast }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        wateringFreq: '',
        notes: '',
        lastWatered: '',
        image: '',
    });

    const { name, wateringFreq, notes, lastWatered, image } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token,
                },
            };

            await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/plants', formData, config);
            showToast('Plant added to your garden!', 'success');
            navigate('/');
        } catch (err) {
            console.error(err.response);
            showToast('Error adding plant', 'error');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <div className="plant-card" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>🌱 Add New Plant</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Plant Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="e.g. Monstera"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Watering Frequency (in days)</label>
                        <input
                            type="number"
                            name="wateringFreq"
                            value={wateringFreq}
                            onChange={onChange}
                            placeholder="e.g. 7"
                            min="1"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL (Optional)</label>
                        <input
                            type="text"
                            name="image"
                            value={image}
                            onChange={onChange}
                            placeholder="https://example.com/plant.jpg"
                        />
                        {image && <img src={image} alt="Preview" style={{ marginTop: '10px', height: '100px', borderRadius: '4px' }} onError={(e) => e.target.style.display = 'none'} />}
                    </div>
                    <div className="form-group">
                        <label>Last Watered Date</label>
                        <input
                            type="date"
                            name="lastWatered"
                            value={lastWatered}
                            onChange={onChange}
                        />
                        <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                            Leave blank if you watered it today.
                        </small>
                    </div>
                    <div className="form-group">
                        <label>Notes (Optional)</label>
                        <textarea
                            name="notes"
                            value={notes}
                            onChange={onChange}
                            placeholder="Sunlight preferences, nicknames..."
                            rows="3"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button type="button" onClick={() => navigate('/')} className="btn" style={{ background: '#ccc', color: '#333' }}>
                            Cancel
                        </button>
                        <input type="submit" value="Add Plant" className="btn" style={{ flex: 2 }} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPlant;
