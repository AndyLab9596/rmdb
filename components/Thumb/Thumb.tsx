import React from 'react';
import Image from 'next/image';

type Props = {
    imgUrl: string;
}

const Thumb = ({ imgUrl }: Props) => {
    return (
        <Image
            src={imgUrl}
            placeholder='blur'
            blurDataURL='/placeholder.jpg'
            className='rounded-lg'
            layout='fill'
            objectFit='cover'
            alt="thumb"
        />
    )
}

export default Thumb