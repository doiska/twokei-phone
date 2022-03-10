import { useApps } from '@os/hooks/useApp';
import AppWrapper from '@ui/components/AppWrapper';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

    const { apps } = useApps();

    return (
        <AppWrapper style={{ backgroundImage: 'url(https://raw.githubusercontent.com/project-error/npwd/master/phone/public/media/backgrounds/minimal.jpg)' }}>
            <div className="flex flex-col mt-8 px-1 h-full w-full items-center">
                <div className="grid grid-cols-5 text-5xl gap-3">
                    {
                        apps.map(({ path, icon: Icon, disable, color }) => <Link to={path}>{Icon}</Link>)
                    }
                </div>
            </div>
        </AppWrapper>
    )
}

export default Home;