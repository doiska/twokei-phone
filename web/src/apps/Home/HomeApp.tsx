import AppWrapper from '@ui/components/AppWrapper';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <AppWrapper style={{ backgroundImage: 'url(https://raw.githubusercontent.com/project-error/npwd/master/phone/public/media/backgrounds/minimal.jpg)' }}>
            <div className="box-content mt-6 px-1">
                <div className="grid grid-cols-4">
                    <Link to={"whatsapp"}><FaWhatsapp fontSize={"large"} className='text-green-500' /></Link>
                </div>
            </div>
        </AppWrapper>
    )
}

export default Home;