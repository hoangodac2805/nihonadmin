import React, { useState } from "react";
import { useDebounce } from "../customHooks/useDebounce";
import { FcCheckmark } from "react-icons/fc";

interface IC_Autocomplete extends React.HTMLProps<HTMLDivElement> {
  fieldToShow: string;
  dataArray: Array<any>;
  onSelect: (listSeleted: any) => void;
  onSearch: (value: string) => void;
}
const C_Autocomplete: React.FC<IC_Autocomplete> = ({
  dataArray,
  fieldToShow,
  onSelect,
  onSearch,
  ...res
}) => {
  const [selectedItem, setSelectedItem] = useState<Array<any>>([]);
  const [qS, setQs] = useState<string>("");
  const [autoCompleteShow, setAutoCompleteShow] = useState<boolean>(false);

  const handleSearchLessons = (query: string) => {
    onSearch(query);
  };
  const debouncedSearchLessons = useDebounce(handleSearchLessons, 300);
  return (
    <div
      {...res}
      className="w-full overflow-visible relative flex items-center px-4 flex-wrap bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    >
      {selectedItem.map((item) => (
        <div
          className="border border-black px-3 py-2 mr-2 rounded-lg"
          key={item[fieldToShow]}
        >
          {item[fieldToShow]}
        </div>
      ))}
      <input
        className="appearance-none block w-auto min-w-14 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 leading-tight focus:outline-none"
        type="text"
        id="lessons"
        placeholder="Search"
        value={qS}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
          debouncedSearchLessons(e.target.value);
          setQs(e.target.value);
        }
        }
        onFocus={() => {
          setAutoCompleteShow(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setAutoCompleteShow(false);
          }, 300);
        }}
      />
      <ul
        className={`transition absolute w-full py-3 top-[100%] bg-white rounded-md left-0 max-h-40 overflow-y-auto border border-gray-200 ${
          autoCompleteShow ? "block" : "hidden"
        } `}
      >
        {dataArray.length > 0 ? (
          dataArray.map((item) => {
            const isSelected = selectedItem.findIndex((selectedItem) => selectedItem.id === item.id) !== -1;
            return (
              <li
                onFocus={() => {
                  setAutoCompleteShow(true);
                }}
                className="flex justify-between cursor-pointer transition rounded-md  my-2 px-3 py-2 hover:bg-gray-200"
                key={item.id}
                onClick={() => {
                  const updatedSelectedItems = isSelected
                  ? selectedItem.filter((selectedItem) => selectedItem.id !== item.id)
                  : [...selectedItem, item];
      
                  setSelectedItem(updatedSelectedItems);
                  onSelect(updatedSelectedItems);
                  
                  onSearch("");
                  setQs("");
                }}
              >
                {item[fieldToShow]}
                {isSelected && <FcCheckmark />}
              </li>
            );
          })
        ) : (
          <li className="px-3 py-2 text-red-500">No data match</li>
        )}
      </ul>
    </div>
  );
};

export default C_Autocomplete;
