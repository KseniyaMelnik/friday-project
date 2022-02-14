import {instance} from "../dal/API";

export const packsAPI = {
    getPacks(page?: number, pageCount?: number, searchPack?: string, sortByUpdated?: number) {
        return instance.get(`/cards/pack`
            + (page? `?page=${page}` : '?page=1')
            + (pageCount? `&pageCount=${pageCount}` : '')
            + (searchPack? `&packName=${searchPack}`: '')
            + (sortByUpdated? `&sortPacks=${sortByUpdated}updated`: '')
        );
    },
};