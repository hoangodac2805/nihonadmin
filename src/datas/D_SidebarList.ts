import { ISidebarList } from "../types/SidebarListType";
import { HiFolder } from "react-icons/hi";
import { HiDocumentAdd } from "react-icons/hi";
import { HiFolderAdd } from "react-icons/hi";
import { HiDocument } from "react-icons/hi";



export const SidebarList: ISidebarList[] = [
    {
        label:"Courses",
        link:"/courses",
        icon: HiFolder,
        children:[
            {
                label:"Add",
                link:"/courses/add",
                icon:HiFolderAdd
            }
        ]
    },
    {
        label:"Lessons",
        link:"/lessons",
        icon: HiDocument,
        children:[
            {
                label:"Add",
                link:"/lessons/add",
                icon:HiDocumentAdd
            }
        ]
    }
]