import React, {useState} from "react";
import FormGroup from "../FormGroup/FormGroup";
import {Alert} from "react-bootstrap";

interface FormListProps {
    title: {
        caption: string,
        additionalClasses?: string
    },
    fields: {
        id: string,
        label: string,
        placeholder: string,
        buttonCaption: string,
    }[]
}

function FieldsList(props: FormListProps) {
    const [fieldsListState, setFieldsListState] = useState(() => {
        let ar: Array<any> = [];
        return ar
    });
    const printStateIcon = () => {

        return fieldsListState.length ?
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg> : '';
    };
    const printListItems = (inputFields: Array<any>) => {
            return inputFields.map(field =>
                <FormGroup key={field.id} {...field} incHandler={() => {
                    setFieldsListState(fieldsListState.concat([field.id]))
                }} decHandler={(id: never) => {
                    let index = fieldsListState.indexOf(id);
                    if (index !== -1) {
                        let tempData: Array<any> = fieldsListState.splice(index);
                        setFieldsListState(fieldsListState.splice(index));
                    }
                }}
                />
            )
        }
    ;
    return (
        <
            section>
            < h1
                className={props.title.additionalClasses}>
                {props.title.caption}
                {
                    printStateIcon()
                }
            </h1>
            {
                printListItems(props.fields)
            }
            <Alert variant="info">
                <p>
                    Проверка урла на валидность отключена, так как с адреса «http://localhost:3000/» все валидные запросы
                    будут завершаться ошибкой CORS.
                </p>
                <p>
                    Для успешного запроса подойдёт любая строка (запрос преобразуется в http://localhost:3000/string), для не успешного - валидный урл вида https://ya.ru/
                </p>
            </Alert>
        </section>
    );
}

export default FieldsList;
