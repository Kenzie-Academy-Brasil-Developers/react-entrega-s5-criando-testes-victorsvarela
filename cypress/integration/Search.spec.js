context("Input CEP Search", () => {

    it("Entra na página de busca de CEP", () => {
        cy.visit('http://localhost:3000')
        cy.viewport(1440, 900)
    })

    it("Preencher o CEP e buscar as informações", () => {
        cy.viewport(1440, 900)

        cy.intercept("GET", "62350000", {
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
            },
        }).as("getCEP");

        cy.get("input[type=number]").type("62350000");
        cy.get("button").click();

        cy.contains("Cidade")
    })

})