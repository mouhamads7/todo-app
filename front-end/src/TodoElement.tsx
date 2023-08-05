import axios from "axios";
import { TodoElementTypeWithId } from "./Type";
import crossIcon from "./ressources/icon-cross.svg";
import checkIcon from "./ressources/icon-check.svg";
import classNames from "classnames";
// import { useState } from "react";

type props = {
  todoElement: TodoElementTypeWithId;
  todoElements: TodoElementTypeWithId[];
  setTodoElements: (list: TodoElementTypeWithId[]) => void;
  rerenderingCount: number;
  setReRenderringCount: (x: number) => void;
};

export const TodoElement = ({
  todoElement,
  //   todoElements,
  //   setTodoElements,
  rerenderingCount,
  setReRenderringCount,
}: props) => {
  const deleteElement = () => {
    axios
      .delete(`/todoItem/${todoElement.id}`)
      .then(() => setReRenderringCount(rerenderingCount + 1))
      .catch((err) => console.log(err));
  };

  const checkOrUncheckElement = () => {
    const newElement = todoElement;
    newElement.state = todoElement.state === "active" ? "completed" : "active";
    axios
      .put(`/todoItem/${todoElement.id}`, newElement)
      .then(() => setReRenderringCount(rerenderingCount + 1))
      .catch((err) => console.log(err));
  };

  return (
    <div className="py-4 px-4 border-b border-slate-400 cursor-pointer flex justify-between">
      <div className="flex group" onClick={checkOrUncheckElement}>
        <img
          src={checkIcon}
          className={classNames(
            "mt-1 px-1 py-1 h-5 w-5 border border-slate-400 rounded-full mr-4 group-hover:border-check-bg2",
            {
              ["bg-gradient-to-b from-check-bg1 to-check-bg2"]:
                todoElement.state === "completed",
            }
          )}
        ></img>
        <div
          className={classNames("group-hover:font-bold", {
            "line-through text-slate-400": todoElement.state === "completed",
          })}
        >
          {todoElement.text}
        </div>
      </div>
      <img src={crossIcon} className="mt-1 h-4 w-4" onClick={deleteElement} />
    </div>
  );
};
