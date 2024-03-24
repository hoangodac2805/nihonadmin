import { create } from "zustand";
import { ILessonRes } from "../types/lessonsType";
import { lessonsService } from "../services/api/lessonsApi";

interface IState {
  lessons: ILessonRes[];
}
interface IAction {
  setLessons: (courses: ILessonRes[]) => void;
  fetchLessons: () => void;
  searchByJs: (qS: string) => Array<ILessonRes>;
}

const useLessons = create<IState & IAction>((set,get) => ({
  lessons: [],
  setLessons: (lessons: ILessonRes[]) => set({ lessons: [...lessons] }),
  fetchLessons: async () => {
    let response = await lessonsService.getAll();
    if (response.status == 200) {
      set({ lessons: [...response.data.data] });
    }
  },
  searchByJs: (qS: string) => {
    const regex = new RegExp(qS, "i");
    const currentLessons = get().lessons;
    const lessonNameMatchesQuery = (lesson: ILessonRes) => {
      return (
        regex.test(lesson.lessonNameEn) ||
        regex.test(lesson.lessonNameJp) ||
        regex.test(lesson.lessonNameVn)
      );
    };
    return currentLessons.filter(lesson => lessonNameMatchesQuery(lesson));
  },
}));

export default useLessons;
