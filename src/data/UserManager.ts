import { EntityManager, Request, Observable } from 'rest-model'
import { debug } from '../decorators/debug';
import User from './User';

@debug
export default class UserManager extends EntityManager<User> {

    public static instance = new UserManager()

    private static getAll = new Request<{ result: User[] }>('get', '/api/users', 200)
    private static create = new Request<{ result: User, body: User }>('post', '/api/users', 200)

    public getAll() {
        UserManager.getAll.call({})
            .then(([error, users]) => {
                if (error !== null)
                    return
                this.update(...users!)
            })
    }   

    public create(user: User) {
        UserManager.create.call({ body: user })
            .then(([error, user]) => {
                if (error !== null)
                    return;
                this.update(user!)
            })
    }
}