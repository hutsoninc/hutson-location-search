import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Index from './components/index';
import './index.css';

const App = () => {
    return (
        <div className="app">
            <Header />
            <Index />
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);