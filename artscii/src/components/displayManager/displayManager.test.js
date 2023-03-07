import { validateDisplayManagerProps } from './validateDisplayManagerProps';
import { validModes } from './validateDisplayManagerProps';
import { DisplayManager } from './DisplayManager';
import { expect, jest } from '@jest/globals';
const fs = require('fs');
const path = require("path");

const testImg = fs.readFileSync(path.resolve(__dirname, '../../assets/fry.png'));
let testProps;

beforeEach(() => {
    testProps = {displayMode: 'ascii', src: testImg}
})

// Testing the validateDisplayManagerProps function
it('should accept valid mode and src props', () => {
    validModes.forEach(mode => {
        testProps.displayMode = mode;
        expect(() => {
            validateDisplayManagerProps(testProps)
        }).not.toThrowError();
    });
});

it('should throw errors for invalid mode props', () => {
    testProps.displayMode = 'drama-bomb';
    expect(() => {
        validateDisplayManagerProps(testProps)
    }).toThrowError('Invalid Display Type');
})

it('should throw errors for empty src props', () => {
    testProps.src = '';
    expect(() => {
        validateDisplayManagerProps(testProps)
    }).toThrowError('No src sent to component!');
})
