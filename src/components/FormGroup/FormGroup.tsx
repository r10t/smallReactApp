import React, {useState} from "react";
import styles from './FormGroup.module.css';
import {Spinner} from "react-bootstrap";
import classNames from "classnames";

export type FormGroupProps = {
    id: string,
    label: string,
    placeholder: string,
    buttonCaption: string,
    incHandler: Function,
    decHandler: Function,
};

function FormGroup(props: FormGroupProps) {
    const [fieldInputValue, setFieldInputValue] = useState('');
    const [buttonEnabledState, setButtonEnabledState] = useState(false);
    const [requestLoadingState, setRequestLoadingState] = useState(false);
    const [isHaveSuccessResponseState, setHaveSuccessResponseState] = useState(false);
    const [isRequestSend, setRequestState] = useState(false);

    const cx = classNames.bind(styles);

    const isValidURL = function (str: string): boolean {
        //pseudo check, to get valid requests (ya.ru=>304, bcs request===localhost/ya.ru. https://ya.ru=>CORS error)
        return str.length > 1;
    };

    const getSpinner = (isNeedSpiner: boolean = false) => {
        return isNeedSpiner ?
            <Spinner animation="border" role="status" variant="primary" className={styles['form-group-spinner']}>
                <span className="sr-only">Loading...</span>
            </Spinner> : '';
    };

    const getStateIcon = (isHaveSuccessResponse: boolean = false) => {
        return isHaveSuccessResponse ?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
    }

    const onUpdateInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldInputValue(event.target.value);
        setButtonEnabledState(isValidURL(fieldInputValue));
        clearRequestState();
        props.decHandler(props.id);
    };

    const onFormSubmit = (value: string) => {
        sendRequest(value);
        setRequestLoadingState(true);
    }

    const clearRequestState = function () {
        setRequestState(false);
    }

    const sendRequest = (url: string) => {
        fetch(url).then(res => res.ok ? res : Promise.reject(res))
            .then(data => {
                setRequestLoadingState(false);
                setHaveSuccessResponseState(true);
                setRequestState(true);
                props.incHandler(props.id);
            })
            .catch(() => {
                setRequestLoadingState(false);
                setHaveSuccessResponseState(false);
                setRequestState(true);
                props.decHandler(props.id);
            });
    }

    let btnClass = cx({
        'form-group': true,
        'form-group-loading': requestLoadingState,
    });

    return (
        <form action="#" onSubmit={event => {event.preventDefault();onFormSubmit(fieldInputValue)}}>
            <fieldset className={btnClass}>
                {getSpinner(requestLoadingState)}
                <label className={styles['form-group__label']} htmlFor="t">
                    {props.label}
                    {isRequestSend ? getStateIcon(isHaveSuccessResponseState) : ''}
                </label>
                <div className="input-group">
                    <input value={fieldInputValue} onInputCapture={onUpdateInputValue} onBlur={onUpdateInputValue} onChange={onUpdateInputValue} className={'form-control'} type="text" name="t" id={props.id} placeholder={props.placeholder}/>
                    <button className={'btn btn-primary ' + styles['form-group-btn']} disabled={!buttonEnabledState}>{props.buttonCaption}</button>
                </div>
            </fieldset>
        </form>
    )
}

export default FormGroup;
