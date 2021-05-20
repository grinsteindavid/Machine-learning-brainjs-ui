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

    const output = useMemo<{
        black: number,
        white: number,
    } | undefined>(() => {
        if (input) {
            return net.run(input)
        } else {
            return undefined
        }
    }, [input])

    if (output === undefined) {
        return null
    }

    return (
        <div>
            <span>
                white: % {output.white.toFixed(2)}
            </span>

            <span>
                black: % {output.black.toFixed(2)}
            </span>
        </div>
    )
}