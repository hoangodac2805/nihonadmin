export interface ILessonRes {
    _id: string,
    id:string,
    lessonNumber: string;
    lessonNameEn: string;
    lessonNameJp: string;
    lessonNameVn: string;
    thumbnailSrc: string;
    description: string;
    tags?:any;
    vocabularies?:any;
    grammars?:any
}

export type IPopulateLesson = Omit<ILessonRes,"tags" | "vocabularies" | "grammars">