import { useState, useEffect } from 'react';
import { checkLocalStorage } from '../../../util/checkLocalStorage';
import { useNavigate } from 'react-router';

export function RouteGuard(props: any) {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);

    // useEffect(() => {
    //     // on initial load - run auth check 
    //     authCheck(router.asPath);

    //     // on route change start - hide page content by setting authorized to false  
    //     const hideContent = () => setAuthorized(false);
    //     router.events.on('routeChangeStart', hideContent);

    //     // on route change complete - run auth check 
    //     router.events.on('routeChangeComplete', authCheck)

    //     // unsubscribe from events in useEffect return function
    //     return () => {
    //         router.events.off('routeChangeStart', hideContent);
    //         router.events.off('routeChangeComplete', authCheck);
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    function authCheck(url: string) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/login'];
        const path = url.split('?')[0];
        let token = checkLocalStorage('access_token');
      
                if (!token && !publicPaths.includes(path)) {
                    setAuthorized(false);
                     navigate({
                        pathname: '/login'
                    });
                } else {
                    setAuthorized(true);
                }
            
    }

    return (authorized && props.children);
}