import { RowDataPacket } from "mysql2"

export interface IPayment extends RowDataPacket {
    payment_id?: number;
    movie_id?: number;
    theater_id?: string;
    date?: Date;
    showing?: string;
    concessions?: number;
    tickets?: number;
    email?: string;
    fname?: string;
    lname?: string;
    cardnum?: string;
    seccode?: string;
    cardexp?: string;
    bstreet?: string;
    bunit?: string;
    bstate?: string;
    bcountry?: string;
    zip?: string;
}

export type PaymentRequest = {
    payment_id?: number;
    movie_id?: number;
    theater_id?: string;
    date?: Date;
    showing?: string;
    concessions?: number;
    tickets?: number;
    email?: string;
    fname?: string;
    lname?: string;
    cardnum?: string;
    seccode?: string;
    cardexp?: string;
    bstreet?: string;
    bunit?: string;
    bstate?: string;
    bcountry?: string;
    zip?: string;
}