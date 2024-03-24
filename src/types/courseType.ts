import { IPopulateLesson } from "./lessonsType";

export interface ICourseRes {
    _id:string,
    id:string,
    courseNameEn: string;
    courseNameJp: string;
    courseNameVn: string;
    thumbnailSrc: string;
    description: string;
    lessons:IPopulateLesson[];
    createdAt:Date,
    updatedAt:Date
}