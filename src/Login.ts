import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthService, OpenAPI } from './openapi-request';
import type { User } from './pages/admin/Users';
import { useAuth } from './context/AuthContext';
import { useLoading } from "@context/LoadingContext";
export interface LoginFormData {
    //   name: string;
    username: string;
    password: string;
}

export const useContactForm = () => {
    const { setIsLoading } = useLoading();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        username: 'admin-user-1',
        password: 'admin1234',
    });
    const location = useLocation();
    const from = (location.state as any)?.from?.pathname || "/dashboard";
    const { setUser, user } = useAuth();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await AuthService.login({ requestBody: formData })
        localStorage.setItem("_token", response.token);
        setUser(response.user)
        OpenAPI.TOKEN = response.token;
        navigate(from, { replace: true });
        setFormData({ username: '', password: '' });
        setIsLoading(false)

    };
    useEffect(() => {
        if (user) {
            navigate("/dashboard", { replace: true });
        }
    }, [user, navigate]);
    return {
        formData,
        handleChange,
        handleSubmit,
    };
};
