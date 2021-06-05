import React, {Component} from 'react';
import FieldsList from "./components/FieldsList/FieldsList";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component<any, any> {

    render() {
        return (
            <div className="App container">
                <div className="card">
                    <div className="card-body">
                        <FieldsList />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
