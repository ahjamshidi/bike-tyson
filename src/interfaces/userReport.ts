import { Bicycle } from "@/interfaces/bike.ts";

export interface UserReport {
    id?: number;
    user_id: number;
    bike_id?: number;
    bicycle?: Bicycle;
    start_datetime: Date,
    end_datetime: Date,
    gps: string,
    description: string,
    created_at?: Date,
    updated_at?: Date,
    owner?: boolean
}
