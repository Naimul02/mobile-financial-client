import React from 'react';
import useAdmin from '../../hooks/useAdmin';

const AdminRoute = () => {
    const  [admin] = useAdmin();
    console.log("admin" , admin)
    return (
        <div>
            hello
        </div>
    );
};

export default AdminRoute;