"use client";
import Textfield from "../_components/textfield";
import Button from "../_components/button";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface IGetTodos {
  created_at: string;
  id: number;
  is_completed: boolean;
  is_public: boolean;
  title: string;
  user: {
    id: string;
    name: string;
  };
  user_id: string;
}

export default function Todo() {
  const [add, setAdd] = useState<string>("");
  const [todos, setTodos] = useState<IGetTodos[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);

  const getUserDetailByFetchAPICall = useCallback(async () => {
    try {
      setIsLoading(true);
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDY1YmZjYTc0MjEyNTdkYzk5YzcyMzc2NCJ9LCJuaWNrbmFtZSI6ImJoYXZ5YWphaW4wNzUiLCJuYW1lIjoiYmhhdnlhamFpbjA3NUBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNTY3YWI2MDQ2ZmU4MjJlNTFjZDZhYjg1NzQxMzg2YjU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZiaC5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyNC0wMi0wNFQxNzozMzo0MS4zODRaIiwiaXNzIjoiaHR0cHM6Ly9ncmFwaHFsLXR1dG9yaWFscy5hdXRoMC5jb20vIiwiYXVkIjoiUDM4cW5GbzFsRkFRSnJ6a3VuLS13RXpxbGpWTkdjV1ciLCJpYXQiOjE3MDcwNjgwMjIsImV4cCI6MTcwNzEwNDAyMiwic3ViIjoiYXV0aDB8NjViZmNhNzQyMTI1N2RjOTljNzIzNzY0IiwiYXRfaGFzaCI6InlPRFVTbkRjNS1TbE5HQnZYWGNhOEEiLCJzaWQiOiJjYV90b2I0VTVtYm5yQVAwZXF2VE9xUGFwZUJ1dlo1aiIsIm5vbmNlIjoiQl9JTklVWnV1aTdfR2tDaENWWDhSQi5SYm53N08yRkYifQ.OkXl6bjFfbr6ji6hAyxGhLxhXcCN_nZu5DclQQz2dir944sglT4vl06tH3Y7D18X7qkrA0ONYw2HqPwErYJ5ZmY9o5M2_y92fJ2fKvzeigUZIQR9_djDdajB2IXDz1pEXwsTcrlc6Hk15pOlS_ouW0QPw3wd0_n_R-7SgViMn6JFcFGuZRtuyKpVteWFqm84WAGNSwehAva1LerQJlWqOaUVfrJY0VW9RZSdjM04q8XKEhhtT6xP8Y1HTxtzds0TUUZh1PFj8VI9HtOXMSlcAScjHfrJzO8UnyX3IveWdUEwkAXDAiO0_gUdn-cPV4IVyOViVpe5Q0QdTljiv6Dkfw`,
      };
      const requestBody = {
        query: `query getTodos{
            todos {
              created_at
              id
              is_completed
              is_public
              title
              user {
                id
                name
              }
              user_id
            }
          }`,
      };

      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      };
      const response = await (
        await fetch("https://hasura.io/learn/graphql", options)
      ).json();

      console.log("RESPONSE FROM FETCH REQUEST", response?.data);
      setTodos(response?.data.todos ?? []);
    } catch (err) {
      console.log("ERROR DURING FETCH REQUEST", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserDetailByFetchAPICall();
  }, [getUserDetailByFetchAPICall]);

  function onChangeAdd(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target) return;
    setAdd(event.target.value);
  }

  return (
    <div className="w-full mt-24 h-full flex justify-center items-center">
      <div className="flex flex-col w-[44vw] max-h-full overflow-auto bg-slate-800 border-0 rounded-xl p-4">
        <div className="flex p-4 justify-evenly items-center">
          <Textfield label="Add Todo" onChange={onChangeAdd} value={add} />
          <Button label="Add" />
        </div>
        <ul className="p-4 w-full h-80 overflow-auto border-gray-100 border-0 shadow-2xl rounded-lg">
          {todos &&
            todos.map((todo: IGetTodos) => {
              return (
                <li
                  key={`${todo.user_id}`}
                  className=" my-2 p-2 border-2 border-gray-400 rounded-md flex justify-evenly items-center"
                >
                  <h1 className="pl-2 w-full max-w-full text-ellipsis">
                    {todo.title}
                  </h1>
                  <Button label="Edit" />
                  <Button label="Delete" />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
