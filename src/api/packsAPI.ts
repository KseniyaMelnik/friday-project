import {instance} from "../dal/API";


export const packsAPI = {
    getPacks() {
        return instance.get("/cards/pack");
    },
};