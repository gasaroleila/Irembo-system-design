import { useEffect } from 'react';
import toast , { Toaster }from 'react-hot-toast';
// import { ToastProps } from '../../../types/types';
export function Toast(props: any):JSX.Element{
useEffect(() =>{
  if(props.status === 'success'){
    toast.success(props.message,{
      style: {
        borderRadius: '10px',
        background: '#00c132',
        color: '#fff',
      },
    });
  }

  else toast.error(props.message,{
    style: {
      borderRadius: '10px',
      background: '#E61F1F',
      color: '#fff',
    },
  });
  

},[props.status,props.message])
    
    return(
        <div className="text-sm">
        <Toaster
         position="top-right"
         reverseOrder={false}
        />
      </div>
    )
}