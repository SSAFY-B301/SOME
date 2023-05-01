import { customBoyAxios } from "@/features/customAxios"
import axios from "axios"
import {useMutation} from "react-query"

interface AlbumCreateType{
    album_name : string | string[] | undefined,
    invite_friend : string[],
} 

export const createAlbum = (requestData : AlbumCreateType) => {
    const queryKey = '/album/create'
    


    const { mutate, isLoading, isError, error, isSuccess } = useMutation((newAlbum: AlbumCreateType)  => {
        return axios.post(queryKey, newAlbum, {
            headers : {
                "access_token" : "hi" 
            }
        });
    }, {
        onMutate: variable => {
            console.log("onMutate ", variable);
        },
        onError: (error, variable, context) => {
            //error
        },
        onSuccess: (data, variables, context) => {
            console.log("success", data, variables, context);
        },
        onSettled: () => {
            console.log("end");
        }
    })

    mutate(requestData);
}