import { render, screen, queryByAttribute } from '@testing-library/react';
import Card from './Card';
import userEvent from '@testing-library/user-event';


const location = {
   "business": {
        "id": "1",
        "name": "CultFit",
        "address": "Bellandur",
        "contact": "+91 0408532919",
        "email": "cult@cultfit.com"
   }
}

const mockHandleClick = jest.fn();

const getById = queryByAttribute.bind(null, 'id');

test("Check if elements are rendered properly", () => {
    const dom = render(<Card location={location} selected={false} setSelectedLocation={mockHandleClick}/>);

    let linkElements = [];
    linkElements.push(expect(screen.getByText("CultFit")));
    linkElements.push(expect(screen.getByText("Bellandur")));
    linkElements.push(expect(screen.getByText("+91 0408532919")));
    linkElements.push(expect(screen.getByText("cult@cultfit.com")));
    linkElements.push(expect(getById(dom.container, 'card-1')));

    Array.from(linkElements).forEach(e => e.toBeInTheDocument())
})

test("Check if selected is false classname should not contain card-selected", () => {
    render(<Card location={location} selected={false} setSelectedLocation={mockHandleClick}/>);

    expect(screen.getByText("CultFit").parentElement.classList.contains("card-selected")).toBe(false);
})

test("Check if selected is true classname should contain card-selected", () => {
    render(<Card location={location} selected={true} setSelectedLocation={mockHandleClick}/>);

    expect(screen.getByText("CultFit").parentElement.classList.contains("card-selected")).toBe(true);
})

test("Check if mockHandleClick is called", async () => {
    render(<Card location={location} selected={true} setSelectedLocation={mockHandleClick}/>);

    await userEvent.click(screen.getByText("CultFit"));
    expect(mockHandleClick).toHaveBeenCalledWith("1");
})
