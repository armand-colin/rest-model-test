import { ChangeEvent } from "react";
import Todo from "../data/Todo";
import TodoManager from "../data/TodoManager";
import Card from "./Card";

const TodoView = (props: Todo) => {
    function onChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.checked !== props.finished)
            TodoManager.instance.setFinished(props.id, e.target.checked)
    }

    return <div className="TodoView">
        <Card>
            <p className="small">{props.id}, {props.user}</p>
            <p><input type="checkbox" checked={props.finished} onChange={onChange} />{props.title}</p>
        </Card>
    </div>
}

export default TodoView;