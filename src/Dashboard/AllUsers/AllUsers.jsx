import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../useAxiosPublic/useAxiosPublic';
import { toast } from 'react-toastify';

const AllUsers = () => {
        const axiosPublic = useAxiosPublic();
    const {data : users , refetch} = useQuery({
            queryKey : ['allUsers'],
            queryFn : async() => {
                const res = await axiosPublic('/users')
                return res.data

            }
    })
    

    const handleUpdated = (id) => {
                axiosPublic.patch(`/user/${id}`)
               .then(res => {
                        if(res.data){
                            toast.success('Approved Successful')
                            refetch();
                        }
               })
               .catch(error => {
                console.error(error.message)
               })

    }
    return (
        <div>
            <h1 className="text-xl font-semibold">All Users</h1>

            <div className="overflow-x-auto">
            <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Number</th>
                          <th>Status</th>
                          <th>Approve</th>
                        </tr>
                      </thead>
                      <tbody>
            {
                users?.map((user , idx) => 
                    
                        
                        <tr key={user?._id}>
                          <th>{idx+1}</th>
                          <td>{user?.name}</td>
                          <td>{user?.email}</td>
                          <td>{user?.number}</td>
                          <td>{user?.status}</td>
                          <td>
                                {
                                    user?.status === 'approved' ? <button disabled className="btn btn-sm bg-green-600 text-white hover:text-green-700">Approve</button> 
                                    : 
                                    <button className="btn btn-sm bg-green-600 text-white hover:text-green-700 "onClick={() => handleUpdated(user?._id)}>Approve</button>
                                }
                          </td>
                        </tr>
                        
                  )
            }
            
            </tbody>
                    </table>
                    </div>
        </div>
    );
};

export default AllUsers;