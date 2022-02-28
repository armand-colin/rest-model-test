import './styles/Card.scss'
import { PropsWithChildren } from "react";

const Card = (props: PropsWithChildren<{}>) => {
    return <div className="Card">
        {props.children}
    </div>
}

export default Card;