export interface Camera {
    id: number;
    code: string;
    sector: string;
    battery_level: number;
    status: string;
}

export interface Detection {
    id: number;
    camera_id: number;
    species_id: number;
    confidence: number;
    media_url: string;
    detection_type: string;
    detected_at: Date;
}