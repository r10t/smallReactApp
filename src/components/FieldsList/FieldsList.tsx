import React, {Component} from "react";
import FormGroup from "../FormGroup/FormGroup";
import {title, fields} from "../../data";

interface FieldsListState {
    childRequests: string[],
}

class FieldsList extends Component<any, FieldsListState> {

    constructor(props: any) {
        super(props);
        this.incChildRequest = this.incChildRequest.bind(this);
        this.decChildRequest = this.decChildRequest.bind(this);
        this.state = {
            childRequests: []
        };
    }

    arFields = fields;

    incChildRequest(id: string) {
        this.setState(prevState => {
            let childRequests = prevState.childRequests;
            const index = childRequests.indexOf(id);
            if (index === -1) {
                childRequests.push(id);
            }
            return {childRequests}
        });
    }

    decChildRequest(id: string) {
        this.setState(prevState => {
            let childRequests = prevState.childRequests;
            const index = childRequests.indexOf(id);
            console.log(childRequests, index, childRequests.length)
            if (index > -1) {
                if (childRequests.length === 1) {
                    childRequests = [];
                } else {
                    childRequests = childRequests.splice(index, 1);
                }
            } else {
                childRequests = [];
            }
            return {childRequests}
        });
    }

    get stateIcon() {
        if (this.state.childRequests.length > 1) {
            return <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 16 16">
                <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
            </svg>
        } else if (this.state.childRequests.length === 1) {
            return <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg>
        }
        return '';
    }

    render() {
        return (
            <section>
                <h1 className={title.additionalClasses}>
                    {title.text}
                    {this.stateIcon}
                </h1>
                {this.body}
            </section>
        )
    }

    get body() {
        return this.arFields.map(field =>
            <FormGroup key={field.id} {...field} incHandler={this.incChildRequest} decHandler={this.decChildRequest}/>
        )
    }
}

export default FieldsList;
