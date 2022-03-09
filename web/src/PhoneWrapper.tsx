import React from 'react';

const PhoneWrapper: React.FC = ({ children }) => {
    return (
        <div className="w-screen h-screen relative">
            <div className="absolute right-0 w-phone h-phone" style={{ position: 'fixed' }}>
                <div className="absolute z-[999] w-phone h-phone" style={{ backgroundImage: 'url("https://github.com/project-error/npwd/blob/master/phone/public/media/frames/default.png?raw=true")' }}>
                    <div id="phone" className="absolute flex flex-col bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden bottom-[100px] left-[50px] right-[50px] top-[100px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhoneWrapper;