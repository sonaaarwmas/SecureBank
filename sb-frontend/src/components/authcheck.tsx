"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

interface AuthCheckProps {
    children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
    const { isAuthenticated, refreshAuthState } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            refreshAuthState();
            if (!isAuthenticated) {
                router.push('/login');
            }
        };

        checkAuthentication();
    }, [isAuthenticated, refreshAuthState, router]);

    if (!isAuthenticated) {
        return <p>Checking authentication...</p>;
    }

    return <>{children}</>;
};

export default AuthCheck;