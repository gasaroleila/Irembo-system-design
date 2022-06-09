
import { useNavigate } from 'react-router';

export function Logout(): JSX.Element {
    const navigate = useNavigate()
    function logout():any{
        localStorage.removeItem('userBasicInfo');
        localStorage.removeItem('access_token');
        localStorage.removeItem('pageInfo');
        localStorage.removeItem('user');
       navigate('/login');
    }
    return(logout())
}