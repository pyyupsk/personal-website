import { create, type StateCreator } from 'zustand';

type SelectedSlice = {
    selected: null | string;
    // eslint-disable-next-line no-unused-vars
    setSelected: (selected: null | string) => void;
};

const selectedSlice: StateCreator<SelectedSlice> = (set) => ({
    selected: '',
    setSelected: (selected: null | string) => set({ selected }),
});

export const useSelected = create<SelectedSlice>(selectedSlice);
