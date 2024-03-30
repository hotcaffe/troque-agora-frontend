import { IUserProfile } from "./profile";

export interface IChat extends IUserProfile {
    conversations: {
        _id: string;
        user_id: number;
        recipient_id: number;
        message: string;
        read: boolean;
        timestamp: string;
    }[];
}