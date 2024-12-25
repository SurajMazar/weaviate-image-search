import httpUtils from "@/settings/utils/http.utils";

class DogService {

    static async fetchSimilarImages(data: { image: File }) {
        const response = await httpUtils.post('/api/get-similar-dog-image', data, true)
        return response?.data?.data as Array<{ uuid: string, properties: { image: string, title: string } }>;
    }
}


export default DogService
