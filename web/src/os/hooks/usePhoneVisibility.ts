
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSettings } from '../../apps/Settings/hooks/useSettings';
import phoneState  from './phoneState';

export const usePhoneVisibility = () => {

    const [visibility, setVisibility] = useRecoilState(phoneState.visibility);
    const [notificationVisibility, setNotificationVisibility] = useState(false);
    const [{ zoom }] = useSettings();

    useEffect(() => {
        if(visibility) {
            setNotificationVisibility(false); 
        }
    }, [visibility]);

    useEffect(() => {
        if(!visibility) {
            //TODO: currentAlert
        }
    })

    const bottom = useMemo(() => {
        // if(!visibility) {
        //     return `${-728 * zoom}px`;
        // }
        return '0px';
    }, [visibility, zoom]);

    return {
        bottom
    }
}