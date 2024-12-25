import { Avatar, Button, Form, FormInstance, Upload, UploadFile } from 'antd'
import React, { useEffect, useState } from 'react'
import { CameraOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/es/upload'

const ImagePicker: React.FC<{
    label: string
    name: string
    onChangeHandler?: (event: UploadChangeParam<UploadFile<any>>) => void
    defaultValue?: string | null | string[]
    shape: 'circle' | 'square' | undefined
    rules?: Array<any>
    previewSize?: number
    buttonText: string
    multiple?: boolean
    form: FormInstance<any>
}> = (props) => {
    /**
     * COMPONENT PROPS
     */
    const {
        label,
        name,
        onChangeHandler,
        defaultValue,
        shape,
        rules,
        previewSize,
        buttonText,
        form,
        multiple
    } = props

    /**
     * COMPONENT STATE
     */
    const [preview, setPreview] = useState<string | Array<string> | null>(null)

    /**
     * DEFAULT VALUE
     */
    useEffect(() => {
        if (defaultValue) {
            setPreview(defaultValue)
        } else {
            setPreview(null)
        }
    }, [defaultValue])

    /**
     * REMOVE IMAGE
     */
    const removeImage = () => {
        setPreview(null)
        resetForm()
    }

    /**
     * REST FORM
     */
    const resetForm = () => {
        const updated: any = {}
        updated[name] = null
        form.setFieldsValue(updated)
    }

    /** Dummy request for antd */
    const dummyRequest = (data: any) => {
        const { file, onSuccess } = data //eslint-disable-line
        setTimeout(() => {
            onSuccess('ok')
        }, 0)
    }

    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            getValueFromEvent={(event) => {
                return event?.target?.files[0]
            }}
        >
            <div
                className="flex flex-wrap flex-col
                bg-white space-y-8
                rounded-md"
            >
                {preview && !Array.isArray(preview) ? (
                    <Avatar
                        size={previewSize || 100}
                        shape={shape}
                        src={preview}
                    />
                ) : preview && Array.isArray(preview) ? (
                    <>
                        <div className="flex flex-wrap">
                            {preview.map((item) => (
                                <Avatar
                                    key={item}
                                    size={previewSize || 100}
                                    shape={shape}
                                    src={item}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <Avatar
                        size={previewSize || 100}
                        shape={shape}
                        className="border-primary border-2 border-dotted bg-white"
                        icon={
                            <CameraOutlined
                                className={'text-primary text-2xl'}
                            />
                        }
                    />
                )}
                <div className="flex flex-wrap gap-4 items-center">
                    <Upload
                        accept={'.png,.jpg,.jpeg,.webp'}
                        customRequest={dummyRequest}
                        showUploadList={false}
                        multiple={multiple || false}
                        onChange={async (event) => {
                            if (multiple) {
                                const files: Array<string> = []
                                event.fileList.map((file) => {
                                    if (file?.originFileObj) {
                                        files.push(
                                            URL.createObjectURL(
                                                file?.originFileObj
                                            )
                                        )
                                    }
                                })
                                setPreview(files)
                            } else {
                                if (event?.file?.originFileObj) {
                                    setPreview(
                                        URL.createObjectURL(
                                            event?.file?.originFileObj
                                        )
                                    )
                                }
                            }

                            if (onChangeHandler) {
                                onChangeHandler(event)
                            }
                        }}
                    >
                        <Button type="primary" htmlType="button">
                            {buttonText}
                        </Button>
                    </Upload>

                    {preview ? (
                        <Button
                            onClick={removeImage}
                            type="default"
                            htmlType="button"
                            className="text-red-400 border-red-400"
                        >
                            Remove
                        </Button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </Form.Item>
    )
}

export default ImagePicker
