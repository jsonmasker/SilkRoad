export interface UserLoginInfoModel {
    userId: number;
    userName: string;
    provider: string;
    email: string;
    roles: string[];
    avatarUrl?: string;
}