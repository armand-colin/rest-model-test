import './styles/Button.scss'
import { PropsWithChildren } from "react"

interface _Props {
    onClick?: () => void;
    disabled?: boolean;
}

type Props = PropsWithChildren<_Props>

const Button = (props: Props) => {
    return <button className="Button" onClick={props.onClick} disabled={props.disabled}>
        {props.children}
    </button>
}

export default Button;