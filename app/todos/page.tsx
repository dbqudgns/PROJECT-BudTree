"use client";

import { useMutation, useQuery } from "react-query";
import { createTodo, getTodos } from "../actions/todo-actions";
import { useState } from "react";

export default function TodoPage() {
  const [todoInput, setTodoInput] = useState("");

  const TodosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  const createTodoMutation = useMutation({
    mutationFn: async () => {
      if (todoInput === "") throw new Error("Todo cannot be empty");
      return createTodo(todoInput);
    },
    onSuccess: (TODOS) => {
      console.log("TODOS", TODOS);
      console.log("success");
      TodosQuery.refetch();
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  return (
    <div>
      <h1>TODOS</h1>

      {/* TODO를 생성하는 부분 */}
      <input
        type="text"
        value={todoInput}
        placeholder="Enter your todo"
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button onClick={() => createTodoMutation.mutate()}>
        {createTodoMutation.isLoading ? "생성중..." : "투두 생성"}
      </button>

      {/* TODO를 보여주는 부분 */}
      {TodosQuery.isLoading && <div>Loading...</div>}
      {TodosQuery.data &&
        TodosQuery.data.map((todo, index) => <p key={index}>{todo}</p>)}
    </div>
  );
}
