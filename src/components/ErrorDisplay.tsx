import { nanoid } from "nanoid";
import { Component, ReactNode } from "react";
import { RequestError } from "rest-model";
import ErrorView from "./ErrorView";

interface Props {

}

interface State {
    errors: (RequestError & { id: string })[]
}

class ErrorDisplay extends Component<Props, State> {

    public static instance: ErrorDisplay

    constructor(props: Props) {
        super(props)
        ErrorDisplay.instance = this;
        this.state = {
            errors: []
        }
    }

    public add(error: RequestError) {
        const id = nanoid()
        const errors = [...this.state.errors, { ...error, id }]
        this.setState({ errors })
    }

    render(): ReactNode {
        return <div className="ErrorDisplay">
            {
                this.state.errors.map(error => <ErrorView {...error} key={error.id} />)
            }
        </div>
    }
}

export default ErrorDisplay