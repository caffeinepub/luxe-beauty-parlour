import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface Appointment {
    service: ServiceType;
    customerName: string;
    email: string;
    preferredTimeSlot: string;
    preferredDate: string;
    notes?: string;
    phoneNumber: string;
}
export enum ServiceType {
    bridalPackage = "bridalPackage",
    haircut = "haircut",
    eyebrowThreading = "eyebrowThreading",
    nailCare = "nailCare",
    makeup = "makeup",
    hairColoring = "hairColoring",
    waxing = "waxing",
    facial = "facial"
}
export interface backendInterface {
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    submitAppointment(customerName: string, phoneNumber: string, email: string, service: ServiceType, preferredDate: string, preferredTimeSlot: string, notes: string | null): Promise<void>;
    submitInquiry(name: string, email: string, phone: string, message: string): Promise<void>;
}
