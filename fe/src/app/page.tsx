'use client'
import {useState} from "react";
import {Button, Col, Form, Row} from "antd";
import ImagePicker from "@/components/image-picker";
import {useMutation} from "react-query";
import DogService from "@/services/dog.service";

export default function Home() {

    const [form] = Form.useForm<{ image: File }>()
    const [images, setImages] = useState<Array<{ uuid: string, properties: { image: string, title: string } }>>([])

    const searchMutation = useMutation(async (values: { image: File }) => {
        return await DogService.fetchSimilarImages(values)
    }, {
        onSuccess(data) {
            setImages(data ?? [])
        }
    })

    return (
        <div className={'h-screen'}>
            <Form layout={'vertical'} form={form} onFinish={searchMutation.mutate}>
                <ImagePicker
                    label={'Image to search'}
                    buttonText={'Upload'}
                    shape={'square'}
                    name={'image'}
                    form={form}/>

                <Button type={'primary'} htmlType={'submit'}>
                    Search
                </Button>
            </Form>
            <Row gutter={10}>
                {images?.length ? images?.map((image) => (
                    <Col xs={6} key={image?.uuid}>
                        <img src={`data:image/png;base64,${image?.properties?.image}`} alt={image?.properties?.title}
                             className={'h-full w-full object-cover'}/>
                    </Col>
                )) : "Search for images"}
            </Row>
        </div>

    );
}
