export class PropertyType {
    constructor(id, allowsInplaceEdit, colorClass) {
        this.id = id;
        this.allowsInplaceEdit = allowsInplaceEdit;
        this.colorClass = colorClass;
    }
}

export const UnknownPropertyType = new PropertyType('unknown', false, 'unknown-type');
export const IntegerPropertyType = new PropertyType('integer', true, 'integer-type');
export const FloatPropertyType = new PropertyType('float', true, 'float-type');
export const LatentPropertyType = new PropertyType('latent', false, 'latent-type');
export const ImagePropertyType = new PropertyType('image', true, 'image-type');
export const StringPropertyType = new PropertyType('string', true, 'string-type');
export const ImageMaskPropertyType = new PropertyType('imagemask', true, 'imagemask-type');
export const ModelPropertyType = new PropertyType('model', true, 'model-type');


PropertyType.allTypes = [
    IntegerPropertyType,
    FloatPropertyType,
    LatentPropertyType,
    ImagePropertyType,
    StringPropertyType,
    ModelPropertyType,
    ImageMaskPropertyType,
];

PropertyType.allTypesAsStrings = PropertyType.allTypes.map(type => type.id);

PropertyType.colorClassForType = function(type) {
    return PropertyType.allTypes.find(t => t.id === type).colorClass || UnknownPropertyType.colorClass
}

PropertyType.validate = function(property) {
    return PropertyType.allTypes.some(type => type.id === property.id) || UnknownPropertyType
};