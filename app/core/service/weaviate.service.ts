import weaviate, {WeaviateClient} from 'weaviate-client';

class WeaviateService {
    weaviate: WeaviateClient | null = null

    async getWeaviateClient() {


        this.weaviate = await weaviate.connectToLocal();
        /**
         * DEFAULT CONNECTION PARAMS FOR LOCAL
         */
        //connectionParams: {
        //     http: {
        //         secure: false,
        //             host: options?.host || 'localhost',
        //             port: options?.port || 8080,
        //     },
        //     grpc: {
        //         secure: false,
        //             host: options?.host || 'localhost',
        //             port: options?.grpcPort || 50051,
        //     },
        // },
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
