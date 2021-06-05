import React, {Component} from "react";
import styles from './FormGroup.module.css';
import {Spinner} from "react-bootstrap";
import classNames from "classnames";

let cx = classNames.bind(styles);

interface FormGroupState {
    isHaveLoadingState: boolean,
    fieldValue: string,
    isEnabled: boolean,
    isHaveSuccessResponse: boolean,
    isRequestSend: boolean,
}

export type FormGroupProps = {
    id: string,
    label: string,
    placeholder: string,
    buttonCaption: string,
    incHandler: any,
    decHandler: any,
};

class FormGroup extends Component<FormGroupProps, FormGroupState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isHaveLoadingState: false,
            fieldValue: '',
            isEnabled: false,
            isHaveSuccessResponse: false,
            isRequestSend: false,
        };
    }

    render() {
        let btnClass = cx({
            'form-group': true,
            'form-group-loading': this.state.isHaveLoadingState,
        });
        return (
            <fieldset className={btnClass}>
                {this.state.isHaveLoadingState ?
                    <Spinner animation="border" role="status" variant="primary" className={styles['form-group-spinner']}>
                        <span className="sr-only">Loading...</span>
                    </Spinner> : ''}
                <label className={styles['form-group__label']} htmlFor="t">
                    {this.props.label}
                    {this.state.isRequestSend ? this.stateIcon : ''}
                </label>
                <div className="input-group">
                    <input value={this.state.fieldValue} onInput={this.onInput} className={'form-control'} type="text" name="t" id="t" placeholder={this.props.placeholder}/>
                    <button onClick={this.onButtonClick} className={'btn btn-primary ' + styles['form-group-btn']} disabled={!this.state.isEnabled}>{this.props.buttonCaption}</button>
                </div>
            </fieldset>
        )
    }

    onButtonClick = () => {
        this.sendRequest(this.state.fieldValue);
        this.setLoadingState();
    }

    onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({fieldValue: event.target.value});
        this.clearRequestState();
        this.setState({isEnabled: this.isValidURL(this.state.fieldValue)});
    }

    clearRequestState() {
        if (this.state.isRequestSend) {
            this.setState({isRequestSend: false});
            this.props.decHandler(this.props.id);
        }
    }

    setRequestState() {
        if (!this.state.isRequestSend) {
            this.setState({isRequestSend: true});
        }
    }

    sendRequest = (url: string) => {
        fetch(url).then(res => res.ok ? res : Promise.reject(res))
            .then(data => {
                this.unsetLoadingState();
                this.setState({isHaveSuccessResponse: true});
                this.props.incHandler(this.props.id);
            })
            .catch(() => {
                this.unsetLoadingState();
                this.setState({isHaveSuccessResponse: false});
                this.props.decHandler(this.props.id);
            });
    }

    setLoadingState = () => {
        this.setState({isHaveLoadingState: true});
    }

    unsetLoadingState = () => {
        setTimeout(() => {
            this.setState({isHaveLoadingState: false});
            this.setRequestState();
        }, 650);//Slow down, because the request is too fast
    }

    isValidURL(str: string): boolean {
        //pseudo check, to get valid requests (ya.ru=>304, bcs request===localhost/ya.ru. https://ya.ru=>CORS error)
        return str.length > 1;
    }

    get stateIcon() {
        return this.state.isHaveSuccessResponse ?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
    }
}

export default FormGroup;
