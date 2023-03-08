import { validateDisplayManagerProps, validModes } from '../components/displayManager/validateDisplayManagerProps';
import { expect } from '@jest/globals';
const fs = require('fs');

let testProps;

beforeEach(() => {
    testProps = {displayMode: 'ascii', src: 'abcdefg'}
})


// Tests
it('should accept valid mode and src props', () => {
    validModes.forEach(mode => {
        testProps.displayMode = mode;
        expect(() => {
            validateDisplayManagerProps(testProps)
        }).not.toThrowError();
    });
});

it('should throw error for invalid props.displayMode', () => {
    testProps.displayMode = 'drama-bomb';
    expect(() => {
        validateDisplayManagerProps(testProps)
    }).toThrowError('Invalid Display Type');
})

it('should throw error for empty props.src value', () => {
    testProps.src = '';
    expect(() => {
        validateDisplayManagerProps(testProps)
    }).toThrowError('No src sent to component!');
})