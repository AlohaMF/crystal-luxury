export type ServiceType = "Standard" | "Deep" | "Move-In" | "Valet";
export type BookingStatus = "confirmed" | "pending" | "travel" | "completed";

export type AssetStatus = "Active" | "Maintenance" | "Retired" | "Cleaning";
export type AssetType = "Vehicle" | "Equipment" | "Uniform";

export interface Asset {
    id: string;
    name: string;
    type: AssetType;
    status: AssetStatus;
    assignedTo: string;
    health: number; // 0-100
}


export interface Booking {
    id: string;
    client: string;
    location: string;
    startHour: number; // 0-24
    duration: number; // in hours
    type: ServiceType;
    status: BookingStatus;
    notes?: string;
    date: string; // ISO Date string YYYY-MM-DD
    teamId: string;
    price: string;
}

export interface Team {
    id: string;
    name: string;
    color: string;
    skills: string[];
}
