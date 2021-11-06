import React from "react"
import { fireEvent, render, screen, waitFor, } from "@testing-library/react"
import App from '../../App'
import { LocateCepProvider } from "../../providers/CepProvider"
import api from "../../services"
import MockAdapter from "axios-mock-adapter"

const apiMock = new MockAdapter(api)

describe("teste página inicial App", () => {
    test("quando faz a consulta do cep na api", async () => {
        apiMock.onGet("62350000").replyOnce(200, {
            bairro: "",
            cep: "62350000",
            cidade: "Ubajara",
            cidade_info: {
                area_km2: "421,033",
                codigo_ibge: "2313609"
            },
            estado: "CE",
            estado_info: {
                area_km2: "148.887,632",
                codigo_ibge: "23",
                nome: "Ceará",
            }
        })

        render(<App />, { wrapper: LocateCepProvider })

        const inputSearchApp = screen.getByPlaceholderText("Insira o CEP")
        const buttonSearchApp = screen.getByRole("button")

        fireEvent.change(inputSearchApp, { target: { value: 62350000 } })
        fireEvent.click(buttonSearchApp)

        await waitFor(() => {
            expect(screen.getByDisplayValue("Ubajara")).toBeInTheDocument()
        })
    })
})