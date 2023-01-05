import React, { useRef, useState } from 'react';
import Image from 'next/image';

type Props = {
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const TIME = 300 // ms

const SearchInput: React.FC<Props> = ({ setQuery }) => {
    const [text, setText] = useState('');

    const timer = useRef<NodeJS.Timeout>();

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        clearTimeout(timer.current);
        setText(value);

        timer.current = setTimeout(() => {
            setQuery(value);
        }, TIME)
    };

    return (
        <>
            <input
                className='h-10 pr-14 md:w-96 rounded-full p-4 text-lg bg-zinc-700 text-white focus:outline-none focus:border focus:border-solid focus:border-cyan-200'
                type='text'
                placeholder='Search Movie'
                value={text}
                onChange={handleInput}
            />
            <div className='absolute right-4'>
                <Image width={30} height={32} src="/tmdb-logo.svg" alt='tmdb-logo' />
            </div>
        </>
    )
}

export default SearchInput