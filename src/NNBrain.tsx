import { useMemo } from 'react';
import datasource from './datasource.json';
import { NeuralNetwork } from 'brain.js/src/index';

const net = new NeuralNetwork();
net.train(datasource);

export interface Props {
    input?: {
        r: number,
        g: number,
        b: number,
    }
}

export default function Brain({
    input
}: Props) {

    function getRangeName(value: number): 'low' | 'middle' | 'high' | undefined {
        if (value >= 0 && value <= 0.3) {
            return 'high'
        } else if (value > 0.3 && value <= 0.7) {
            return 'middle'
        } else if (value > 0.7 && value <= 1) {
            return 'low'
        }

        return undefined
    }

    const output = useMemo<{
        black: number,
        white: number,
    } | undefined>(() => {
        if (input) {
            const result = net.run(input) as {
                black: number,
                white: number,
            }
            return result
        } else {
            return undefined
        }
    }, [input])

    if (output === undefined) {
        return null
    }

    return (
        <div>
            <span style={{ padding: 5 }}>
                white: <strong>{getRangeName(Number(output.white.toFixed(2)))} ({output.white.toFixed(2)}) certainty</strong>
            </span>

            <span style={{ padding: 5 }}>
                black: <strong>{getRangeName(Number(output.black.toFixed(2)))} ({output.black.toFixed(2)}) certainty</strong>
            </span>
        </div>
    )
}