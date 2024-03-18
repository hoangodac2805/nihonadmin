import { IconType } from "react-icons";

export interface ISidebarList extends ISidebarListItem {
    children?: ISidebarListItem[];
}

export interface ISidebarListItem {
    label: string,
    link: string,
    icon: IconType
} 