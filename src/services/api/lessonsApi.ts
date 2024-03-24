import { IResData, TAxiosRes } from "../../types/common";
import { ILessonRes } from "../../types/lessonsType";
import { baseApi } from "./baseApi";

class LessonsService extends baseApi {
  constructor() {
    super();
  }
  getAll = () => {
    return this.get(`lessons`) as Promise<TAxiosRes<IResData<ILessonRes[]>>>;
  };
  // create = (form: FormData) => {
  //   return this.post("courses/create", form) as Promise<
  //     TAxiosRes<IResData<ICourseRes>>
  //   >;
  // };
}

export const lessonsService = new LessonsService();
