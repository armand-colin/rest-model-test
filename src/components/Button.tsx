import './styles/Button.scss'
import { PropsWithChildren } from "react"

interface _Props {
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

type Props = PropsWithChildren<_Props>

const Button = (props: Props) => {
    return <button
        className={["Button", props.className ?? ""].join(' ')}
        onClick={props.onClick}
        disabled={props.disabled}
    >
        {props.children}
    </button>
}

export default Button;