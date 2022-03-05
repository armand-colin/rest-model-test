import './styles/Icon.scss'

interface Props {
    icon: string;
}

const Icon = (props: Props) => {
    const parts = props.icon.split(',')
    return <div className="Icon" dangerouslySetInnerHTML={{ __html: parts[1] }}></div>
}

export default Icon;