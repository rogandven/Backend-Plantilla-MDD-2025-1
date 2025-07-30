import { getAsamblea } from "@services/asamblea.service";

export const useGetAsambleaData = () => {
    const fetchAsamblea = async () => {
        try {
            const asambleaData = await getAsamblea();
            return asambleaData;
        } catch (error) {
            console.error("Error consiguiendo la asamblea:", error);
        }
    }
    return { fetchAsamblea };
}

export default useGetAsambleaData;
