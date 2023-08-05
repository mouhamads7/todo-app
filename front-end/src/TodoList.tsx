import classNames from "classnames";
import { TodoElementTypeWithId } from "./Type";
import { TodoElement } from "./TodoElement";
import { useEffect, useState } from "react";
import axios from "axios";

type props = {
  todoElements: TodoElementTypeWithId[];
  setTodoElements: (list: TodoElementTypeWithId[]) => void;
  rerenderingCount: number;
  setReRenderringCount: (x: number) => void;
};

export const TodoList = ({
  todoElements,
  setTodoElements,
  rerenderingCount,
  setReRenderringCount,
}: props) => {
  const [listType, setListType] = useState<string>("all");
  const [leftItem, setLeftItem] = useState<TodoElementTypeWithId[]>();
  useEffect(() => {
    const list = todoElements.filter((element) =>
      element.state === "active" ? true : false
    );
    setLeftItem(list);
  }, [todoElements]);

  const clearCompleted = () => {
    axios
      .delete("/todoItem")
      .then(() => setReRenderringCount(rerenderingCount + 1))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white rounded drop-shadow-lg">
      <div>
        {todoElements &&
          todoElements.length > 0 &&
          todoElements.map(
            (element, index) =>
              (listType == "all" || listType === element.state) && (
                <TodoElement
                  key={index}
                  todoElement={element}
                  todoElements={todoElements}
                  setTodoElements={setTodoElements}
                  rerenderingCount={rerenderingCount}
                  setReRenderringCount={setReRenderringCount}
                ></TodoElement>
              )
          )}
      </div>
      <div className="py-4 px-2 text-xs font-thin flex justify-between">
        <p>{leftItem?.length} items left</p>
        <div className="flex justify-between">
          <button
            type="button"
            className={`${buttonStyle} pr-3`}
            onClick={() => setListType("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`${buttonStyle} pr-3`}
            onClick={() => setListType("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={buttonStyle}
            onClick={() => setListType("completed")}
          >
            Completed
          </button>
        </div>
        <p
          className="cursor-pointer hover:font-semibold"
          onClick={clearCompleted}
        >
          Clear Completed
        </p>
      </div>
    </div>
  );
};

const buttonStyle = classNames(
  "hover:font-semibold",
  "cursor-pointer",
  "focus:font-semibold",
  "focus:text-sky-500"
);
