import { create } from 'zustand';

interface IState {
    isLoading: boolean
}
interface IAction {
    setLoadingOn: () => void;
    setLoadingOff: () => void;
}


const useLoading = create<IState & IAction>((set) => ({
    isLoading: false,
    setLoadingOn: () => set({ isLoading: true }),
    setLoadingOff: () => set({ isLoading: false })
}))


export default useLoading;