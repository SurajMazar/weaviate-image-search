import WeaviateService from "../core/service/weaviate.service";
import {DOGS} from "../config/collection.config";

const handler = async () => {
    // OPENING WEAVIATE INSTANCE
    const weaviateInstance = await WeaviateService.getWeaviateClient();

    await weaviateInstance.collections.createFromSchema({
        class: DOGS,
        vectorizer: 'img2vec-neural',
        vectorIndexType: 'hnsw',
        "moduleConfig": {
            "img2vec-neural": {
                "imageFields": [
                    "image"
                ]
            }
        },
        properties: [
            {
                "dataType": ["blob"],
                "description": "Images of the dog",
                "name": "image"
            },
            {
                "dataType": ["string"],
                "description": "Title of the image",
                "name": "title"
            },
        ]
    })

    // CLOSING THE WEAVIATE INSTANCE
    await weaviateInstance.close()
}

handler().then(() => {
    console.log('Weaviate collection creation done.')
})
