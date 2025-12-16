import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forum = ({ showToast }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', description: '', image: '' });
    const [commentText, setCommentText] = useState({});
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('username');

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const config = { headers: { 'x-auth-token': token } };
                const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/posts', config);
                setPosts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, [navigate]);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const res = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/posts', newPost, config);
            setPosts([res.data, ...posts]);
            setNewPost({ title: '', description: '', image: '' });
            showToast('Post created!', 'success');
        } catch (err) {
            console.error(err);
            showToast('Error creating post', 'error');
        }
    };

    const handleCommentSubmit = async (e, postId) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const text = commentText[postId];
            if (!text) return;

            const res = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + `/api/posts/comment/${postId}`, { text }, config);

            const updatedPosts = posts.map(post => {
                if (post._id === postId) {
                    return { ...post, comments: res.data };
                }
                return post;
            });
            setPosts(updatedPosts);
            setCommentText({ ...commentText, [postId]: '' });
            showToast('Comment added', 'success');
        } catch (err) {
            console.error(err);
            showToast('Error commenting', 'error');
        }
    };

    const getAvatar = (name) => `https://api.dicebear.com/7.x/notionists/svg?seed=${name || 'User'}`;

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>Community Feed 🌿</h2>

            {/* Create Post Glass Panel */}
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <img src={getAvatar(currentUser)} alt="Me" className="avatar avatar-md" />
                    <h3 style={{ margin: 0, alignSelf: 'center' }}>What's on your mind?</h3>
                </div>
                <form onSubmit={handlePostSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Give it a catchy title..."
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            required
                            style={{ background: 'rgba(255,255,255,0.8)' }}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="Share your plant tips or questions..."
                            value={newPost.description}
                            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                            required
                            rows="2"
                            style={{ background: 'rgba(255,255,255,0.8)' }}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Image URL (Optional) - https://..."
                            value={newPost.image}
                            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                            style={{ background: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}
                        />
                    </div>
                    {newPost.image && <img src={newPost.image} alt="Preview" style={{ height: '80px', borderRadius: '4px', marginBottom: '10px' }} onError={(e) => e.target.style.display = 'none'} />}

                    <button type="submit" className="btn" style={{ width: 'auto', padding: '8px 25px' }}>Post Update</button>
                </form>
            </div>

            {/* Feed */}
            {posts.map(post => (
                <div key={post._id} className="glass-panel" style={{ padding: '20px', marginBottom: '25px', background: 'rgba(255,255,255,0.9)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                        <img src={getAvatar(post.user?.username)} alt={post.user?.username} className="avatar avatar-md" />
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{post.title}</h3>
                            <small style={{ color: '#666' }}>@{post.user?.username || 'Unknown'} • {new Date(post.date).toLocaleDateString()}</small>
                        </div>
                    </div>

                    <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', paddingLeft: '60px' }}>
                        {post.description}
                    </p>

                    {post.image && (
                        <div style={{ paddingLeft: '60px', marginBottom: '20px' }}>
                            <img
                                src={post.image}
                                alt="Post Attachment"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=Image+Unavailable'; }}
                                style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                        </div>
                    )}

                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px' }}>
                        <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>Comments ({post.comments.length})</h4>

                        {post.comments.map((comment, index) => (
                            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <img src={getAvatar(comment.username)} alt={comment.username} className="avatar avatar-sm" />
                                <div style={{ background: '#f0f2f5', padding: '8px 12px', borderRadius: '15px', fontSize: '0.9rem' }}>
                                    <strong>{comment.username}</strong> {comment.text}
                                </div>
                            </div>
                        ))}

                        <form onSubmit={(e) => handleCommentSubmit(e, post._id)} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                            <img src={getAvatar(currentUser)} className="avatar avatar-sm" alt="Me" />
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={commentText[post._id] || ''}
                                onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                                required
                                style={{ borderRadius: '20px', padding: '8px 15px', fontSize: '0.9rem' }}
                            />
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Forum;
