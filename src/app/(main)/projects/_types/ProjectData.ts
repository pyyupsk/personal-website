export type ProjectData = {
    description: null | string;
    id: number;
    link: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'ON_HOLD';
    title: string;
};
