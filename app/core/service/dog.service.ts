import weaviateService from "./weaviate.service";
import {DOGS} from "../../config/collection.config";

class DogService {
    async storeDogImage(title: string, imageB64: string) {
        const weaviateInstance = await weaviateService.getWeaviateClient()
        const dogCollection = weaviateInstance.collections.get(DOGS)
        await dogCollection.data.insert({
            title,
            image: imageB64
        })
        await weaviateInstance.close()
    }

    async getSimilarDogImage(imageB64: string) {
        const weaviateInstance = await weaviateService.getWeaviateClient()
        const dogCollection = weaviateInstance.collections.get(DOGS)
        const results = await dogCollection.query.nearImage(imageB64, {
            returnProperties: ['title', 'image'],
            limit: 5,
        })
        await weaviateInstance.close()
        return results?.objects
    }
}

export default new DogService()
