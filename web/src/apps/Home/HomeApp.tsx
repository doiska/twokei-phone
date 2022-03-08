import AppWrapper from '@ui/components/AppWrapper';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Home: React.FC = () => {
    return (
        <AppWrapper>
            <div className="box-content mt-6 px-1">
                <div className="grid grid-cols-4">
                    <FaWhatsapp fontSize={"large"} className='text-green-500' />
                </div>
            </div>
        </AppWrapper>
    )
}

export default Home;