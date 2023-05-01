import { customBoyAxios } from "@/features/customAxios"
import {useMutation} from "react-query"

export const createAlbum = () => {
    const queryKey = '/album/create'

    const { mutate, isLoading, isError, error, isSuccess } = useMutation(newAlbum  => {
        return customBoyAxios.post(queryKey, newAlbum);
    })
}