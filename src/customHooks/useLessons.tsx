import { create } from "zustand";
import { ILessonRes } from "../types/lessonsType";

interface IState {
  lessons: ILessonRes[];
}
interface IAction {
  setLessons: (courses: ILessonRes[]) => void;
}

const useLessons = create<IState & IAction>((set,get) => ({
  lessons: [],
  setLessons: (lessons: ILessonRes[]) => set({ lessons: [...lessons] }),
  
  // searchByJs: (qS: string) => {
  //   const regex = new RegExp(qS, "i");
  //   const currentLessons = get().lessons;
  //   const lessonNameMatchesQuery = (lesson: ILessonRes) => {
  //     return (
  //       regex.test(lesson.lessonNameEn) ||
  //       regex.test(lesson.lessonNameJp) ||
  //       regex.test(lesson.lessonNameVn)
  //     );
  //   };
  //   return currentLessons.filter(lesson => lessonNameMatchesQuery(lesson));
  // },
}));

export default useLessons;
