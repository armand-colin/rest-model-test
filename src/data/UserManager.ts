import { EntityManager, Request, Observable, RequestError } from 'rest-model'
import { debug } from '../decorators/debug';
import User from './User';

@debug
export default class UserManager extends EntityManager<User> {

    public static instance = new UserManager()

    private static getAll = new Request<{ result: User[], error: {} }>('get', '/api/users', 200)
    private static create = new Request<{ result: User, body: User }>('post', '/api/users', 200)
    private static delete = new Request<{ result: { id: string }, url: { id: string } }>('delete', '/api/users/:id', 200)

    public getAll() {
        UserManager.getAll.call({})
            .then(([error, users]) => {
                if (error)
                    return error
                this.updateEntities(...users!)
            })
    }   

    public create(user: User) {
        UserManager.create.call({ body: user })
            .then(([error, user]) => {
                if (error)
                    return error
                this.updateEntities(user!)
            })
    }

    public delete(id: string) {
        return UserManager.delete.call({ url: { id } })
            .then(([error, result]) => {
                if (error)
                    return error
                this.deleteEntities(result!.id)
            })
    }
}