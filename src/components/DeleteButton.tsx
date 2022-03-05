import './styles/DeleteButton.scss'
import Button from "./Button"
import { trash } from 'ionicons/icons'
import Icon from './Icon'


interface Props {
    onClick: () => void;
    disabled?: boolean;
}

const DeleteButton = (props: Props) => {
    return <Button className="DeleteButton" onClick={props.onClick} disabled={props.disabled}>
        <Icon icon={trash} />
    </Button>
}

export default DeleteButton;