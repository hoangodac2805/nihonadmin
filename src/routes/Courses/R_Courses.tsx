import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import SearchForm, {
  ISearchFormField,
} from "../../components/course/C_SearchForm";
import { HiFolderAdd } from "react-icons/hi";
import AddLinkButton from "../../components/C_AddLinkButton";
import useCourses from "../../customHooks/useCourses";
interface ICourses {}

const R_Courses: React.FC<ICourses> = ({}: ICourses) => {
  const onSearch: SubmitHandler<ISearchFormField> = (data) => {
    console.log(data);
  };

  const coursesState = useCourses();

  const renderList = () => {
    return coursesState.courses.map((course, idx) => (
      <tr key={course._id}>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
          {idx + 1}
        </td>
        
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
          {course.courseNameVn}
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
          {course.courseNameJp}
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
          {course.courseNameEn}
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
          <div className="flex gap-2">
            <div className="transition cursor-pointer border border-yellow-500 py-1 px-3 rounded-md hover:text-white hover:bg-yellow-500">EDIT</div>
            <div className="transition cursor-pointer border border-red-500 py-1 px-3 rounded-md hover:text-white hover:bg-red-500">DELETE</div>
          </div>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    coursesState.fetchCourses()
  }, []);
  return (
    <div className="min-h-screen">
      <SearchForm onSearch={onSearch} />
      <AddLinkButton
        label="Add course"
        link="/courses/add"
        ICON={HiFolderAdd}
      />
      <div className="mt-20 mb-3">
        <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
          <div
            style={{ backgroundPosition: "10px 10px" }}
            className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
          />
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-hidden my-8">
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      STT
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      VietNamese Name
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      Japanese Name
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      English Name
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                  {renderList()}
                </tbody>
              </table>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5" />
        </div>
      </div>
    </div>
  );
};

export default R_Courses;
