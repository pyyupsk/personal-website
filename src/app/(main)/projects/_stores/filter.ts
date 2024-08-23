import { create, StateCreator } from "zustand";

type StatusFilter = "ALL" | "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD";

type FilterSlice = {
    searchTerm: string;
    statusFilter: StatusFilter;
    // eslint-disable-next-line no-unused-vars
    setSearchTerm: (searchTerm: string) => void;
    // eslint-disable-next-line no-unused-vars
    setStatusFilter: (statusFilter: StatusFilter) => void;
};

const filterSlice: StateCreator<FilterSlice> = (set) => ({
    searchTerm: "",
    statusFilter: "ALL",
    setSearchTerm: (searchTerm: string) => set({ searchTerm }),
    setStatusFilter: (statusFilter: StatusFilter) => set({ statusFilter }),
});

export const useFilter = create<FilterSlice>(filterSlice);