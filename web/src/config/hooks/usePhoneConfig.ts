import Default from '@config/default.json';
import { atom, useRecoilState } from 'recoil';

const configState = atom({
    key: 'config',
    default: Default
})

export const usePhoneConfig = (state: any = configState) => {
    const [config, _setConfig] = useRecoilState(state);

    const setConfig = (key: any, value: any): any => {
        _setConfig((oldConfig: any) => ({
            ...oldConfig,
            [key]: value
        }))
    }

    return [config, setConfig];
}