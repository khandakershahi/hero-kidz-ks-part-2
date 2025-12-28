import { fontBangla } from '@/app/layout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Banner = () => {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex-1 space-y-5'>
                <h2 className={`${fontBangla.className} text-6xl font-semibold leading-22`}>আপনার শিশুকে দিন একটি <span className='text-primary'><br></br>সুন্দর ভবিষ্যত</span></h2>
                <p className=''>Buy Every toy with up to 15% Discound</p>
                <Link href="/products" className='btn btn-primary btn-outline'>Explore Products</Link>
            </div>
            <div className='flex-1'>
                <Image alt='Hero image' src={"/assets/hero.png"} width={500} height={400}></Image>
            </div>

        </div>
    );
};

export default Banner;