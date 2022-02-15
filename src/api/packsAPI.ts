import {instance} from "../dal/API";

export const packsAPI = {
    getPacks(payload?: any) {
        return instance.get(`/cards/pack`);
    },
};