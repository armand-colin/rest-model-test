import { EntityManager, Request } from "rest-model";
import { debug } from "../decorators/debug";
import Todo from "./Todo";

@debug
export default class TodoManager extends EntityManager<Todo> {
    
    public static instance = new TodoManager()

    private static getAll = new Request<{ result: Todo[] }>('get', '/api/todos', 200)
    private static setFinished = new Request<{ result: Todo, body: { finished: boolean }, url: { id: string } }>('put', '/api/todos/:id', 200)

    public getAll() {
        TodoManager.getAll.call({})
            .then(([error, todos]) => {
                if (error)
                    return
                this.update(...todos!)
            })
    }

    public setFinished(id: string, finished: boolean) {
        TodoManager.setFinished.call({
            url: { id },
            body: { finished }
        }).then(([error, todo]) => {
            if (error)
                return;
            this.update(todo!)
        })
    }
}