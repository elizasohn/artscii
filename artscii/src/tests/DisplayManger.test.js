import { render } from "@testing-library/react";
import DisplayManager from '../components/displayManager/DisplayManager'
import { validateDisplayManagerProps } from '../components/displayManager/validateDisplayManagerProps';

// Mocking validateDisplayManagerProps as that is not the SUT
jest.mock('../components/displayManager/validateDisplayManagerProps', () => ({ validateDisplayManagerProps: jest.fn() }))
let testDisplayManager;


beforeEach(() => {
    testDisplayManager = <DisplayManager src='abc' displayMode='image'/>
})


// Tests begin
test("renders DisplayManager component", () => {
    render(
        testDisplayManager
    );
    const appElement = document.querySelector(".display-window");
    expect(appElement).toBeInTheDocument();
});

test("renders ImageDisplay component", () => {
    render(
        testDisplayManager
    );
    const appElement = document.querySelector("#image-display-window");
    expect(appElement).toBeInTheDocument();
});

test("renders AsciiDisplay component", () => {
    testDisplayManager = <DisplayManager src='abc' displayMode='ascii'/>
    render(
        testDisplayManager
    );
    const appElement = document.querySelector("#ascii-display-window");
    expect(appElement).toBeInTheDocument();
});

test("renders ErrorDisplay component", () => {
    testDisplayManager = <DisplayManager/>
    render(
        testDisplayManager
    );
    const appElement = document.querySelector("#error-display-window");
    expect(appElement).toBeInTheDocument();
});