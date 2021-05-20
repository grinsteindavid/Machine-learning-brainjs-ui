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

    function getRangeName(first: number, second: number): 'low' | 'high' | 'unknown' {
        if (first > second) {
            return 'high'
        } else if (first < second) {
            return 'low'
        }

        return 'unknown'
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
                white: <strong>{getRangeName(Number(output.white.toFixed(2)), Number(output.black.toFixed(2)))} ({output.white.toFixed(2)}) certainty</strong>
            </span>

            <span style={{ padding: 5 }}>
                black: <strong>{getRangeName(Number(output.black.toFixed(2)), Number(output.white.toFixed(2)))} ({output.black.toFixed(2)}) certainty</strong>
            </span>
        </div>
    )
}