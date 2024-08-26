import { create, type StateCreator } from 'zustand';

type SelectedSlice = {
    selected: string | null;
    // eslint-disable-next-line no-unused-vars
    setSelected: (selected: string | null) => void;
};

const selectedSlice: StateCreator<SelectedSlice> = (set) => ({
    selected: '',
    setSelected: (selected: string | null) => set({ selected }),
});

export const useSelected = create<SelectedSlice>(selectedSlice);
