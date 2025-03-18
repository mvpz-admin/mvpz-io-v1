import React from 'react'

const RadioFeild = ({
    id, 
    label,
    selectedValue,
    onClick
}) => {
  return (
    <div className='flex justify-start items-center gap-2 cursor-pointer' onClick={() => onClick(id)}>
      <div className='w-5 h-5 bg-secondary rounded-full border border-white border-opacity-20 p-[2px]'>
        {selectedValue == id &&<div className='w-full h-full rounded-full bg-primary'></div>}
      </div>
      <span className='font-inter font-bold text-[14px]'>{label}</span>
    </div>
  )
}

export default RadioFeild
