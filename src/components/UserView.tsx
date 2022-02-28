import './styles/UserView.scss'
import User from "../data/User";
import Card from "./Card";

const UserView = (props: User) => {
    return <div className="UserView">
        <Card>
            <p className="small">{props.id}</p>
            <p>{props.name}</p>
            <p>Color: <span className="color" style={{ background: props.color }}></span></p>
        </Card>
    </div>
}

export default UserView