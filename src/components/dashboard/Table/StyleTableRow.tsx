import React from 'react'

export default function StyleTableRow(props:{data:string}) {

    const badges = {
        green:'bg-green-500 text-white py-1 px-3 text-xs rounded-lg text-center',
        yellow:'bg-yellow-500 text-white py-1 px-3 text-xs rounded-lg text-center',
        red:'bg-red-500 text-white py-1 px-3 text-xs rounded-lg text-center'
    }

  return (
    <div className="flex">
        {
                    <div className={`${
                        props.data === 'CONFIRMED'? badges.green:
                        props.data === 'PENDING'?badges.yellow:
                        props.data === 'ACTIVE'? badges.green:
                        props.data === 'INACTIVE'? badges.red:''
                    }`}>
                        {props.data}
                    </div>
        }

    </div>
  )
}
