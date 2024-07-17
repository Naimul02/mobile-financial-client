import { useQuery } from '@tanstack/react-query';

const useUserName = () => {
    const {data : name ,  refetch} =useQuery({
        queryKey : ['user'],
        queryFn : () => {
            
            const userStringify = localStorage.getItem('user');
            const userParse = JSON.parse(userStringify);
            const nam = userParse?.name;
            console.log("vai tumi koi : " , nam)
            if(!nam){
                localStorage.removeItem('access-token');
                return null;

            }
            return nam
        }
})
  return [name , refetch]
};

export default useUserName;