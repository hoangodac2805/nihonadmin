import { IResData, TAxiosRes } from "../../types/common";
import { ICourseRes } from "../../types/courseType";
import { baseApi } from "./baseApi";

class CoursesService extends baseApi {
  constructor() {
    super();
  }
  getAll = () => {
    return this.get(`courses`) as Promise<TAxiosRes<IResData<ICourseRes[]>>>;
  };
  create = (form: FormData) => {
    return this.post("courses/create", form) as Promise<
      TAxiosRes<IResData<ICourseRes>>
    >;
  };
}

export const coursesService = new CoursesService();
