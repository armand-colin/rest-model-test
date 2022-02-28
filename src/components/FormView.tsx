import './styles/FormView.scss'
import { Component, FormEvent, ReactNode } from "react";
import Button from "./Button";

type Props = {
    fields: {
        name: string,
        placeholder?: string
    }[]
    onSubmit: (data: { [key: string]: string }) => void;
}

export default class FormView extends Component<Props, {}> {

    private onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const data: { [key: string]: string } = {}
        const form = e.currentTarget as HTMLFormElement
        
        for(var i = 0 ; i < form.elements.length ; i++){
            const item = form.elements.item(i) as HTMLInputElement;
            if (!item)
                continue;
            data[item.name] = item.value;
        }

        this.props.onSubmit(data)
    }

    render(): ReactNode {
        return <form className="FormView" onSubmit={this.onSubmit}>
            {
                this.props.fields.map(field => (
                    <input name={field.name} placeholder={field.placeholder} key={field.name} />
                ))
            }
            <Button>Valider</Button>
        </form>
    }
}