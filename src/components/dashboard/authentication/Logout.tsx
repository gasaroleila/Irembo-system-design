
import { useNavigate } from 'react-router';

export function Logout(): JSX.Element {
    const navigate = useNavigate()
    function logout():any{
        localStorage.removeItem('current_user');
        localStorage.removeItem('access_token');
       navigate('/login');
    }
    return(logout())
}