import { nanoid } from "nanoid";
import Todo from "../src/data/Todo";
import User from "../src/data/User";

const armand: User = {
    id: '1',
    name: 'Armand',
    color: 'blue'
}

const hugo: User = {
    id: '2',
    name: 'Hugo',
    color: 'red'
}

const clement: User = {
    id: '3',
    name: 'Clement',
    color: 'green'
}

export function generateUsers(): User[] {
    return [armand, hugo, clement];
}

export function generateTodos(): Todo[] {

    const todos: Todo[] = []

    todos.push({
        id: nanoid(7),
        finished: false,
        title: 'Nourrir les chats',
        user: armand.id
    })

    todos.push({
        id: nanoid(7),
        finished: true,
        title: 'Manger',
        user: armand.id
    })

    todos.push({
        id: nanoid(7),
        finished: false,
        title: 'Prendre une douche',
        user: armand.id
    })

    todos.push({
        id: nanoid(7),
        finished: true,
        title: 'Aller courrir',
        user: hugo.id
    })

    return todos;
}