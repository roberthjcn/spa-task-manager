
export interface ITaskResponse {
    id: string;
    title: string;
    description: string;
    creationDate: { _seconds: number; _nanoseconds: number };
    status: boolean;
    emailUser: string;
}