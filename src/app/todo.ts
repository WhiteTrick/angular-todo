export class Todo {
    id: number;
    createdAt: Date;
    completedAt?: Date;
    name: string;
    description?: string;
    complete: boolean;
}
