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
    projectName: string;
    streetAddress: string;
    managementCompany: string;
    managementAddress: string;
    manager: string;
    // this is ambiguous…associated with the manager? or the managementCompany?
    associatedProperties?: AssociatedProperties[];
}

export interface AssociatedProperties {
    id: number;
    streetAddress: string;
}