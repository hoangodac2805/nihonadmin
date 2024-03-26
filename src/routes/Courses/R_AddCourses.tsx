import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import { useForm, SubmitHandler } from "react-hook-form";
import { coursesService } from "../../services/api/coursesApi";
import { ILessonRes } from "../../types/lessonsType";
import { useDebounce } from "../../customHooks/useDebounce";
import { FcCheckmark } from "react-icons/fc";
import useLoading from "../../customHooks/useLoading";
import toast from "react-hot-toast";
import axios from "axios";
import useLessonProvider from "../../customHooks/swr/useLessonProvider";

interface IR_AddCourses { }

interface IAddCourseField {
  courseNameEn?: string;
  courseNameJp: string;
  courseNameVn: string;
  thumbnailSrc?: FileList;
}



const R_AddCourses: React.FC<IR_AddCourses> = ({ }: IR_AddCourses) => {

  const loadingState = useLoading();
  const [desc, setDesc] = useState("");
  const [qS, setQs] = useState<string>('');

  const [selectedLesson, setSelectedLesson] = useState<Array<ILessonRes>>([]);
  const [autoCompleteBlock, setAutoCompleteBlock] = useState<boolean>(false);

  const { data } = useLessonProvider();
  const lessonData = useMemo(() => {
    if (!data) {
      return []
    };

    const regex = new RegExp(qS, "i");
    let returnData: ILessonRes[] = [];
    data.data.forEach((lesson) => {
      if (regex.test(lesson.lessonNameEn) ||
        regex.test(lesson.lessonNameJp) ||
        regex.test(lesson.lessonNameVn)) {
        returnData.push(lesson);
      }
    })
    return returnData;
  }, [qS])


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddCourseField>();

  const submitForm: SubmitHandler<IAddCourseField> = async (formData) => {
    try {
      loadingState.setLoadingOn();
      let form = new FormData();
      let listLessonId = selectedLesson.map((lesson) => lesson._id);

      form.append("lessons", JSON.stringify(listLessonId));
      form.append("description", desc);

      for (const key in formData) {
        const value = formData[key as keyof IAddCourseField];
        if (typeof value == "string") {
          form.append(key, value);
        } else {
          if (value && value.length > 0) {
            form.append("thumbnailSrc", value[0], value[0].name);
          }
        }
      }
      let res = await coursesService.create(form);
      if (res.status == 200) {
        toast.success(res.data.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Create course failure!!!");
      }
    } finally {
      setTimeout(() => {
        loadingState.setLoadingOff();
      }, 1000)
    }
  };
  const handleSearchLessons = (query: string) => {
    console.log(query);

    setQs(query);
  }

  const debouncedSearchLessons = useDebounce(handleSearchLessons, 300);

  return (
    <div className="min-h-screen w-full ">
      <h2 className="text-center text-2xl text-blue-800 mb-16">ADD COURSE</h2>

      <form
        className="w-full overflow-visible"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="englishname"
            >
              English Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="englishname"
              type="text"
              placeholder="Elementary"
              {...register("courseNameEn")}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="japanesename"
            >
              Japanese Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="japanesename"
              type="text"
              placeholder="初級"
              {...register("courseNameJp", { required: true })}
            />
            {errors.courseNameJp && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="vietnamese"
            >
              Vietnamese Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="vietnamese"
              type="text"
              placeholder="Sơ cấp"
              {...register("courseNameVn", { required: true })}
            />
            {errors.courseNameVn && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={desc}
              onChange={setDesc}
            ></ReactQuill>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2 overflow-visible">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="thumbnail"
            >
              Thumbnail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="thumbnail"
              type="file"
              {...register("thumbnailSrc")}
            />
          </div>
          <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0 overflow-visible">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="lessons"
            >
              Lessons
            </label>
            <div className="w-full overflow-visible relative flex items-center px-4 flex-wrap bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              {selectedLesson.map((item) => (
                <div
                  className="border border-black px-3 py-2 mr-2 rounded-lg"
                  key={item._id}
                >
                  {item.lessonNameVn}
                </div>
              ))}
              <input
                className="appearance-none block w-auto min-w-14 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 leading-tight focus:outline-none"
                type="text"
                id="lessons"
                placeholder="Search"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  debouncedSearchLessons(e.target.value)
                }
                onFocus={() => {
                  setAutoCompleteBlock(true);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setAutoCompleteBlock(false);
                  }, 300);
                }}
              />
              <ul
                className={`transition absolute w-full py-3 top-[100%] bg-white rounded-md left-0 max-h-40 overflow-y-auto border border-gray-200 ${autoCompleteBlock ? "block" : "hidden"
                  } `}
              >
                {lessonData.length > 0 ? (
                  lessonData.map((lesson) => {
                    let seleted = false;
                    let idx = selectedLesson.findIndex(
                      (item) => item._id == lesson._id
                    );
                    if (idx !== -1) {
                      seleted = true;
                    }
                    return (
                      <li
                        onFocus={() => {
                          setAutoCompleteBlock(true);
                        }}
                        className="flex justify-between cursor-pointer transition rounded-md  my-2 px-3 py-2 hover:bg-gray-200"
                        key={lesson._id}
                        onClick={() => {
                          if (seleted) {
                            setSelectedLesson((state) => state.splice(idx, 1));
                            return;
                          }
                          setSelectedLesson([...selectedLesson, lesson]);
                        }}
                      >
                        {lesson.lessonNameJp}
                        {seleted && <FcCheckmark />}
                      </li>
                    );
                  })
                ) : (
                  <li className="px-3 py-2 text-red-500">No lesson match</li>
                )}
              </ul>
            </div>
            <div></div>
          </div>
        </div>

        <div className="flex justify-center mt-32">
          <button
            disabled={loadingState.isLoading}
            type="submit"
            className="border px-6 py-2 rounded-lg cursor-pointer border-black transition hover:text-white hover:bg-black"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default R_AddCourses;
