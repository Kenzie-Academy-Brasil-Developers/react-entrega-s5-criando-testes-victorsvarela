import { fireEvent, render, screen } from "@testing-library/react";
import Search from "../../components/Search/index";
import { LocateCepProvider } from "../../providers/CepProvider";


describe("Search component", () => {
    test("quando renderiza o input", () => {
        render(<Search />)

        expect(screen.getByPlaceholderText("Insira o CEP")).toBeInTheDocument()
    })

    test("quando renderiza o button", () => {
        render(<Search />)

        expect(screen.getByRole("button")).toBeInTheDocument();
    })

    test("quando o input estiver vazio, button fica inabilitado", () => {
        render(<Search />)

        expect(screen.getByRole("button")).toBeDisabled()
    })

    test("quando o input não estiver vazio, botão fica habilitado", () => {
        render(<Search />, { wrapper: LocateCepProvider })

        const inputSearch = screen.getByPlaceholderText("Insira o CEP")

        fireEvent.change(inputSearch, { target: { value: "62350000" } })

        expect(screen.getByRole("button")).toBeEnabled()
    })

})

