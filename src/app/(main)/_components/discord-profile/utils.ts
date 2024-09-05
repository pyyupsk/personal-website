export function getStatusColor(status: string): string {
    switch (status) {
        case 'dnd':
            return 'border-red-500';
        case 'idle':
            return 'border-yellow-500';
        case 'online':
            return 'border-green-500';
        default:
            return 'border-border';
    }
}
