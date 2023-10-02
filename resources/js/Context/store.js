import { create } from "zustand";

const store = (set) => ({
    tasks: [
        { title: "Test Task", status: 'planned' },
        { title: "Test Ongoing", status: 'ongoing' },
        { title: "Jobs Done!", status: 'done' },
    ]
});

export const useStore = create(store);