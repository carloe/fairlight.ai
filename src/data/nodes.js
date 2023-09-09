const nodes = [
    {
        id: "2",
        type: "customNode",
        data: {
            title: "Text Updater",
            parameters: [
                {
                    id: "p-text",
                    type: "inline-input",
                    dataType: "string",
                    label: "Seed",
                    placeholder: "Enter a seed",
                },
                {
                    id: "p-text2",
                    type: "inline-input",
                    dataType: "string",
                    label: "Prompt",
                    placeholder: "Enter a prompt",
                },
                {
                    id: "t-model-a",
                    label: "Model AB",
                    type: "input",
                    dataType: "model",
                    placeholder: "Select a Model",
                },
                {
                    id: "t-model-b",
                    label: "Model B",
                    type: "input",
                    dataType: "model",
                    placeholder: "Select a Model",
                }
            ],
            outputs: [
                {
                    id: "s-latent",
                    label: "Latent",
                    type: "output",
                    dataType: "latent",
                },
                {
                    id: "s-image",
                    label: "Image",
                    type: "output",
                    dataType: "image",
                },
                {
                    id: "s-mask",
                    label: "Mask",
                    type: "output",
                    dataType: "imagemask",
                },
            ],
        },
        position: { x: 0, y: 50 }
    },
    {
        id: "5",
        type: "customNode",
        data: {
            title: "Out",
            parameters: [
                {
                    id: "t-latent-c",
                    label: "Latent",
                    type: "input",
                    dataType: "latent",
                },
                {
                    id: "t-image-c",
                    label: "Image",
                    type: "input",
                    dataType: "image",
                },
            ],
            outputs: [],
        },
        position: { x: 350, y: 170 }
    },
    {
        id: "4",
        type: "customNode",
        data: {
            title: "Out",
            parameters: [
                {
                    id: "t-latent-34514",
                    label: "Latent",
                    type: "input",
                    dataType: "latent",
                },
                {
                    id: "t-mask-3421234",
                    label: "Mask",
                    type: "input",
                    dataType: "imagemask",
                },
            ],
            outputs: [],
        },
        position: { x: 350, y: 0 }
    },
    {
        id: "3546",
        type: "customNode",
        data: {
            title: "Model Loader",
            parameters: [],
            outputs: [
                {
                    id: "t-model-3231412",
                    label: "Model",
                    type: "output",
                    dataType: "model",
                },
            ],
        },
        position: { x: -150, y: 0 }
    },
    {
        id: "34256",
        type: "customNode",
        data: {
            title: "Model Loader",
            parameters: [],
            outputs: [
                {
                    id: "t-model-3231412",
                    label: "Model",
                    type: "output",
                    dataType: "model",
                },
            ],
        },
        position: { x: -150, y: 0 }
    },
];

export default nodes;