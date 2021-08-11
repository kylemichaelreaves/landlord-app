export interface Result {
    id: number;
    propertyLocation: string;
    ownersName: string;
    ownersAddress: string;
    associatedProperties?: AssociatedProperties[];
}

export interface PrivateResidence {
    id: number;
    streetAddress: string;
    ownersName: string;
    ownersAddres: string;
    associatedProperties: AssociatedProperties[];
}

export interface HousingProject {
    id: number;
    projectLocation: string;
    management: string;
    managementAddress: string;
    manager: string;
    associatedProperties?: AssociatedProperties[];
}

export interface AssociatedProperties {
    id: number;
    streetAddress: string;
}