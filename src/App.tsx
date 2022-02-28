import React, { Component } from 'react';
import { Observable, Request } from 'rest-model'
import User from './data/User';
import UserManager from './data/UserManager';
import ListView from './components/ListView';
import UserView from './components/UserView';
import FormView from './components/FormView';
import { nanoid } from 'nanoid';
import Todo from './data/Todo';
import TodoManager from './data/TodoManager';
import TodoView from './components/TodoView';
import Frame from './components/Frame';
import { debug } from './decorators/debug';

Request.urlPrefix = "http://localhost:3002"

interface State {
    users: User[];
    ownTodos: Todo[];
    todos: Todo[];
    user: string | null
}

@debug
class App extends Component<{}, State> {

    public static instance: App;

    private _usersObservable?: Observable<User[]>
    private _user: User | null;
    private _ownTodosObservable?: Observable<Todo[]>
    private _todosObservable?: Observable<Todo[]>

    constructor(props: {}) {
        super(props)
        App.instance = this;

        this.state = {
            users: [],
            ownTodos: [],
            user: null,
            todos: []
        }
        this._user = null

        UserManager.instance.getAll()
        TodoManager.instance.getAll()
    }

    componentDidMount() {
        this._usersObservable = UserManager.instance.observe(users => this.setState({ users }), true)
        this._todosObservable = TodoManager.instance.observe(todos => this.setState({ todos }), true)
    }

    componentWillUnmount() {
        this._usersObservable?.dispose()
        this._ownTodosObservable?.dispose()
    }

    private setUser(user: User) {
        this._ownTodosObservable?.dispose()

        this.setState({ user: user.id })

        this._ownTodosObservable = TodoManager.instance.view({ user: user.id })
        this._ownTodosObservable.bind(todos => this.setState({ ownTodos: todos }), true)
    }

    private createUser = (data: any) => {
        const user: User = {
            id: nanoid(7),
            color: data.color,
            name: data.name
        }
        UserManager.instance.create(user)
    }

    private onUserClicked = (user: User) => {
        this.setUser(user)
    }

    render(): React.ReactNode {
        return <div className="App">
            <div className="left">
                <FormView
                    fields={[
                        { name: "name", placeholder: "Nom" },
                        { name: "color", placeholder: "Couleur" }
                    ]}
                    onSubmit={this.createUser}
                />
                <ListView
                    label="Users"
                    elements={this.state.users}
                    onClick={this.onUserClicked}
                    render={user => {
                        const view = <UserView {...user} />

                        if (user.id === this.state.user)
                            return <Frame>{view}</Frame>

                        return view;
                    }}
                />
                <ListView
                    column
                    label="All todos"
                    elements={this.state.todos}
                    render={TodoView}
                />
            </div>
            <div className="center">
                <ListView
                    column
                    label="Mes todos"
                    elements={this.state.ownTodos}
                    render={TodoView}
                />
            </div>
            <div className="right">

            </div>
        </div>
    }
}

export default App;
