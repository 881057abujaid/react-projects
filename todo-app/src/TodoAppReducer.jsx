import { useReducer, useState } from "react";
import './TodoAppReducer.css';

const initialState = { todos: [] };

function reducer(state, action){
    switch(action.type){
        case "ADD_TODO":
            const newTodo = {
                id: Date.now(),
                text: action.payload
            }
            return { todos: [...state.todos, newTodo] };
        case "REMOVE_TODO":
            return { todos: state.todos.filter(todo => todo.id !== action.payload) };
        default:
            return state;
    }
}

function TodoAppReducer(){
    const [inputValue, setInputValue] = useState("");
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <h2>Todo App Reducer</h2>
            <div className="input-container">
                <input type="text" placeholder="Add a new todo..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <button onClick={() =>{ 
                    dispatch({ type: "ADD_TODO", payload: inputValue }) 
                    setInputValue("")}}>Add Todo</button>
            </div>
            <h3>Todo List</h3>
            <ul>
                { state.todos.map(todo =>(
                    <li key={todo.id}>
                        <p>{todo.text}</p>
                        <button 
                        onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}>❌</button>
                    </li>
                ))}
            </ul>
        </>
    );
}
export default TodoAppReducer;