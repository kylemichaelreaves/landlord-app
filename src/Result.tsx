export interface Result {
    id: number;
    propertyLocation: string;
    ownersName: string;
    ownersAddress: string;
    associatedProperties?: {
        id: number;
        propertyLocation: string;
    }
}