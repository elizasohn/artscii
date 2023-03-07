import { validModes } from '../components/displayManager/validateDisplayManagerProps';
import { DisplayManager } from '../components/displayManager/DisplayManager'
import { expect, jest } from '@jest/globals';
const fs = require('fs');
const path = require("path");

const testImg = fs.readFileSync(path.resolve(__dirname, '../../assets/fry.png'));
let testProps;

beforeEach(() => {
    testProps = {displayMode: 'ascii', src: testImg}
})

const validateDisplayManagerProps = jest.fs();

// Tests
// it('should accept valid mode and src props', () => {
//     validModes.forEach(mode => {
//         testProps.displayMode = mode;
//         expect(() => {
//             validateDisplayManagerProps(testProps)
//         }).not.toThrowError();
//     });
// });