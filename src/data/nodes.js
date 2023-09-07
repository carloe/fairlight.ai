const nodes = [
    {
        id: "2",
        type: "customNode",
        data: {
            title: "Text Updater",
            template: {
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
];

export default nodes;