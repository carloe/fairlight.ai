const nodes = [
    {
        id: "2",
        type: "customNode",
        data: {
            title: "Text Updater",
            template: {
                parameters: [
                    {
                        id: "p-text",
                        type: "textfield",
                        label: "Seed",
                        placeholder: "Enter a seed",
                    },
                    {
                        id: "p-text2",
                        type: "textfield",
                        label: "Prompt",
                        placeholder: "Enter a prompt",
                    }
                ],
                targets: [
                    {
                        id: "t-model-a",
                        label: "Model AB",
                        dataType: "model",
                    },
                    {
                        id: "t-model-b",
                        label: "Model B",
                        dataType: "model",
                    }
                ],
                sources: [
                    {
                        id: "s-latent",
                        label: "Latent",
                        dataType: "latent",
                    },
                    {
                        id: "s-image",
                        label: "Image",
                        dataType: "image",
                    },
                    {
                        id: "s-mask",
                        label: "Mask",
                        dataType: "imagemask",
                    }
                ]
            }
        },
        position: { x: 0, y: 50 }
    },
    {
        id: "5",
        type: "customNode",
        data: {
            title: "Out",
            template: {
                parameters: [

                ],
                targets: [
                    {
                        id: "t-latent-c",
                        label: "Latent",
                        dataType: "latent",
                    },
                    {
                        id: "t-image-c",
                        label: "Image",
                        dataType: "image",
                    },
                ],
                sources: []
            }
        },
        position: { x: 350, y: 170 }
    },
    {
        id: "4",
        type: "customNode",
        data: {
            title: "Out",
            template: {
                parameters: [

                ],
                targets: [
                    {
                        id: "t-latent-34514",
                        label: "Latent",
                        dataType: "latent",
                    },
                    {
                        id: "t-mask-3421234",
                        label: "Mask",
                        dataType: "imagemask",
                    },
                ],
                sources: []
            }
        },
        position: { x: 350, y: 0 }
    },
    {
        id: "3546",
        type: "customNode",
        data: {
            title: "Model Loader",
            template: {
                parameters: [

                ],
                targets: [],
                sources: [
                    {
                        id: "t-model-3231412",
                        label: "Model",
                        dataType: "model",
                    },
                ]
            }
        },
        position: { x: 50, y: 0 }
    },
    {
        id: "34256",
        type: "customNode",
        data: {
            title: "Model Loader",
            template: {
                parameters: [],
                targets: [],
                sources: [
                    {
                        id: "t-model-3231412",
                        label: "Model",
                        dataType: "model",
                    },
                ]
            }
        },
        position: { x: 50, y: 0 }
    },
];

export default nodes;