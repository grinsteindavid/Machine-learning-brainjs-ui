import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorResult, SketchPicker } from 'react-color'
import NeuralNetwork from './neural-network';

function App() {
    const [input, setInput] = useState<{
        r: number,
        g: number,
        b: number,
    } | undefined>(undefined)

    function colorHandler(color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
        const { r, g, b } = color.rgb
        setInput({
            b,
            g,
            r
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
        </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
        </a>
            </header>


            <div>
                <SketchPicker
                    onChange={colorHandler}
                />

                <NeuralNetwork
                    input={input}
                />
            </div>
        </div>
    );
}

export default App;
