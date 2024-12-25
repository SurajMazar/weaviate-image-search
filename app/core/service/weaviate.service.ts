import weaviate, {WeaviateClient} from 'weaviate-client';

class WeaviateService {
    weaviate: WeaviateClient|null = null

    async getWeaviateClient() {
        this.weaviate = await weaviate.connectToLocal();
        const clientReadiness = await this.weaviate.isReady();
        if (clientReadiness) {
            return this.weaviate
        }
        throw new Error('Failed to connect to weaviate')
    }

    async closeConnection() {
        await this.weaviate?.close()
    }

}


export default new WeaviateService()
