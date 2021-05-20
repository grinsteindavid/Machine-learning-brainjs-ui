import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorResult, SketchPicker } from 'react-color'
import NeuralNetwork from './NNBrain';

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
            <div>
                <SketchPicker
                    color={input}
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
