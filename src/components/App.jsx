import React from 'react';
import Settings from './Settings';
import Timer from './Timer';

class App extends React.Component {
    render() {
        return (
            <div>
                <Settings />
                <Timer />
            </div>
        );
    }
}

export default App;
