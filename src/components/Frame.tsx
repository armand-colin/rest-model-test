import './styles/Frame.scss'
import { PropsWithChildren } from "react";

const Frame = (props: PropsWithChildren<{}>) => {
    return <div className="Frame">
        {props.children}
    </div>
}

export default Frame;