import { RequestError } from "rest-model";

const ErrorView = (props: RequestError) => {
    return <div className="ErrorView">
        <p><span className="code">{props.code}</span>: {props.body}</p>
    </div>
}

export default ErrorView;