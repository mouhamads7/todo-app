import { Field, Form, Formik } from "formik";
import logo from "./ressources/bg-desktop-light.jpg";
import moonLogo from "./ressources/icon-moon.svg";
import sunLogo from "./ressources/icon-sun.svg";
import { TodoList } from "./TodoList";
import { TodoElementType, TodoElementTypeWithId } from "./Type";
import axios from "axios";
import { useEffect, useState } from "react";
import classNames from "classnames";

export const App = () => {
  const [todoElements, setTodoElements] = useState<TodoElementTypeWithId[]>([]);
  const [reRenderringCount, setReRenderringCount] = useState<number>(0);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("theme", "light");
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    axios
      .get("/todoItem")
      .then((res) => setTodoElements(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [reRenderringCount]);

  const addTodoElement = (element: TodoElementType) => {
    console.log(element);
    axios
      .post("/todoItem", element)
      .then((res) => {
        const newList = todoElements;
        newList.push(res.data);
        setReRenderringCount(reRenderringCount + 1);
        setTodoElements(newList);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={classNames("flex justify-center min-w-36 h-screen", {
        "bg-slate-800": theme === "dark",
      })}
    >
      <img
        src={logo}
        className="image w-full object-cover relative h-52 lg:h-56"
      ></img>
      <div className="absolute top-16 w-full max-w-[42rem] px-8 md:w-[42rem]">
        <div className="text-white flex justify-between">
          <div className="flex font-bold text-3xl">
            <p className="pr-2">T</p>
            <p className="pr-2">O</p>
            <p className="pr-2">D</p>
            <p className="pr-2">O</p>
          </div>
          {theme === "light" ? (
            <img
              src={moonLogo}
              onClick={() => changeTheme("dark")}
              className="w-5 h-5 mt-3 cursor-pointer"
            ></img>
          ) : (
            <img
              src={sunLogo}
              onClick={() => changeTheme("light")}
              className="w-5 h-5 mt-3 cursor-pointer"
            ></img>
          )}
        </div>
        <Formik
          initialValues={{ text: "", state: "active" }}
          onSubmit={(values, { resetForm }) => {
            addTodoElement(values);
            resetForm();
          }}
        >
          <Form>
            <Field
              name="text"
              type="text"
              className={classNames(
                "w-full mt-4 h-12 rounded px-8 focus:outline-none mb-4",
                {
                  "bg-slate-700 text-white": theme === "dark",
                }
              )}
              placeholder="Create a new todo..."
            ></Field>
            <TodoList
              todoElements={todoElements}
              rerenderingCount={reRenderringCount}
              setReRenderringCount={setReRenderringCount}
            ></TodoList>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
