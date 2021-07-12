import React from 'react';
import FieldsList from "./components/FieldsList/FieldsList";
import 'bootstrap/dist/css/bootstrap.min.css';
import {title, fields} from './data/data';

function App(props: any) {
    return (
        <div className="App container">
            <div className="card">
                <div className="card-body">
                    <FieldsList title={{...title}} fields={fields}/>
                </div>
            </div>
        </div>
    );
}

export default App;
