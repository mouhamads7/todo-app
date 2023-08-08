import axios from "axios";
import { TodoElementTypeWithId } from "./Type";
import crossIcon from "./ressources/icon-cross.svg";
import checkIcon from "./ressources/icon-check.svg";
import classNames from "classnames";
type props = {
  todoElement: TodoElementTypeWithId;
  rerenderingCount: number;
  setReRenderringCount: (x: number) => void;
};

export const TodoElement = ({
  todoElement,
  rerenderingCount,
  setReRenderringCount,
}: props) => {
  const theme = localStorage.getItem("theme");

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
    <div
      className={classNames(
        "py-4 px-4 border-b border-slate-400 cursor-pointer flex justify-between",
        {
          "text-white": theme === "dark",
          "bg-slate-700": theme === "dark",
        }
      )}
    >
      <div className="flex group" onClick={checkOrUncheckElement}>
        <img
          src={checkIcon}
          className={classNames(
            "mt-1 px-1 py-1 h-5 w-5 border bg-white border-slate-400 rounded-full mr-4 hover-hover:group-hover:border-check-bg2",
            {
              ["bg-gradient-to-b from-check-bg1 to-check-bg2"]:
                todoElement.state === "completed",
            }
          )}
        ></img>
        <div
          className={classNames("hover-hover:group-hover:font-bold", {
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
