import { type $Enums } from '@prisma/client';
import { create, type StateCreator } from 'zustand';

type StatusFilter = $Enums.PostStatus | 'ALL';

type FilterSlice = {
    searchTerm: string;
    // eslint-disable-next-line no-unused-vars
    setSearchTerm: (searchTerm: string) => void;
    // eslint-disable-next-line no-unused-vars
    setStatusFilter: (statusFilter: StatusFilter) => void;
    statusFilter: StatusFilter;
};

const filterSlice: StateCreator<FilterSlice> = (set) => ({
    searchTerm: '',
    setSearchTerm: (searchTerm: string) => set({ searchTerm }),
    setStatusFilter: (statusFilter: StatusFilter) => set({ statusFilter }),
    statusFilter: 'ALL',
});

export const useFilter = create<FilterSlice>(filterSlice);
