import { create } from 'zustand';
import { ICourseRes } from '../types/courseType';
import { coursesService } from '../services/api/coursesApi';

interface IState {
   courses: ICourseRes[];
}
interface IAction {
    setCourses: (courses:ICourseRes[]) => void;
    fetchCourses : () => void;
}

const useCourses = create<IState & IAction>((set) => ({
    courses: [],
    setCourses: (courses:ICourseRes[]) => set({ courses: [...courses] }),
    fetchCourses : async ()=>{
        let response = await coursesService.getAll();
        if (response.status == 200) {
          set({courses:[...response.data.data]});
        }
    }
}))


export default useCourses;