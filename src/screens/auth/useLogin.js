import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useLogin = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await login(email.trim(), password);
        } catch (e) {
            setError(e.message || 'Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        loading,
        error,
        handleLogin,
    };
};

export default useLogin;
