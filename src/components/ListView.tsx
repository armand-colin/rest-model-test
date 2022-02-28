import './styles/ListView.scss'

type Keys<T> = {
    [K in keyof T]: T[K] extends string ? K : T[K] extends number ? K : never;
}[keyof T]

interface Props<T> {
    elements: T[];
    render: (props: T) => JSX.Element;
    key?: Keys<T>;
    label?: string;
    onClick?: (element: T) => void;
    column?: boolean;
}

export default function ListView<T>(props: Props<T>) {

    const classes = ["ListView"]
    if (props.column)
        classes.push("column")

    return <div className={classes.join(' ')}>
        {
            props.label ?
                <div className="label">
                    <p>{props.label}</p>
                </div> :
                undefined
        }
        <div className="elements">
            {
                props.elements.map((element, i) => {
                    const Type = props.render;
                    const key = (props.key === undefined ? i : element[props.key]) as React.Key;
                    return <div className="element" key={key} onClick={() => props.onClick?.call(undefined, element)}>
                        <Type {...element} />
                    </div>
                })
            }
        </div>
    </div>
}   