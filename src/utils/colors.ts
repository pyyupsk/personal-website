export const getStatusColor = (status: string) => {
    switch (status) {
        case 'ARCHIVED':
        case 'COMPLETED':
            return 'bg-blue-200 text-blue-800';
        case 'DRAFT':
        case 'NOT_STARTED':
            return 'bg-yellow-200 text-yellow-800';
        case 'IN_PROGRESS':
        case 'PUBLISHED':
            return 'bg-green-200 text-green-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
};
