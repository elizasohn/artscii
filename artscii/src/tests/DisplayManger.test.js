// // import { validModes } from '../components/displayManager/validateDisplayManagerProps';
// // import { DisplayManager } from '../components/displayManager/DisplayManager'
// // import { expect, jest } from '@jest/globals';
// // const fs = require('fs');
// // const path = require("path");

// // const testImg = fs.readFileSync(path.resolve(__dirname, '../assets/fry.png'));
// // const testUrl = 'http://a-fake-test-url.com/test-image';
// // let testProps;

// // beforeEach(() => {
// //     testProps = {displayMode: 'ascii', src: testImg}
// // })

// // // const validateDisplayManagerProps = jest.fs();

// // // Tests
// // // it('should accept valid mode and src props', () => {
// // //     validModes.forEach(mode => {
// // //         testProps.displayMode = mode;
// // //         expect(() => {
// // //             validateDisplayManagerProps(testProps)
// // //         }).not.toThrowError();
// // //     });
// // // });


// import { render } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { validModes } from '../components/displayManager/validateDisplayManagerProps';
// import { DisplayManager } from '../components/displayManager/DisplayManager'

// test("renders DisplayManager component", () => {
//   render(
//     <MemoryRouter>
//       <DisplayManager />
//     </MemoryRouter>
//   );
//   const appElement = document.querySelector(".DisplayManager");
//   expect(appElement).toBeInTheDocument();
// });
