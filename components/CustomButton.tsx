'use client'

import Image from 'next/image'
import type { CustomBtnProps } from '@/types'

const CustomButton = (props: CustomBtnProps) => {
  return (
    <button
        disabled={false}
        type={props.btnType || "button"}
        className={`custom-btn ${props.containerStyles}`}
        onClick={props.handleClick}>
        <span className={`flex-1 ${props.textStyles}`}>
            {props.title}
        </span>
        {props.rightIcon && (
          <div className='relative w-6 h-6 '>
            <Image src={props.rightIcon}
              alt={props.rightIcon}
              fill
              className='object-contain'/>
          </div>
        )}
    </button>
  )
}

export default CustomButton