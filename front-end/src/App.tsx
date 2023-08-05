import { Field, Form, Formik } from "formik";
import logo from "./ressources/bg-desktop-light.jpg";
import moonLogo from "./ressources/icon-moon.svg";
import { TodoList } from "./TodoList";
import { TodoElementType, TodoElementTypeWithId } from "./Type";
import axios from "axios";
import { useEffect, useState } from "react";

export const App = () => {
  const [todoElements, setTodoElements] = useState<TodoElementTypeWithId[]>([]);
  const [reRenderringCount, setReRenderringCount] = useState<number>(0);

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
    <div className="flex items-center justify-center">
      <img src={logo} className="image w-full object-cover relative "></img>
      <div className="absolute top-16 w-1/3">
        <div className="text-white flex justify-between ">
          <div className="flex font-bold text-3xl">
            <p className="pr-2">T</p>
            <p className="pr-2">O</p>
            <p className="pr-2">D</p>
            <p className="pr-2">O</p>
          </div>
          <img src={moonLogo} className="w-5 h-5 mt-3"></img>
        </div>
        <Formik
          initialValues={{ text: "", state: "active" }}
          onSubmit={(values) => {
            addTodoElement(values);
          }}
        >
          <Form>
            <Field
              name="text"
              type="text"
              className="w-full mt-4 h-12 rounded px-8 focus:outline-none mb-4"
              placeholder="Create a new todo..."
            ></Field>
            <TodoList
              todoElements={todoElements}
              setTodoElements={setTodoElements}
              rerenderingCount={reRenderringCount}
              setReRenderringCount={setReRenderringCount}
            ></TodoList>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
