const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criarElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const verificarItem = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (verificarItem) {
        itemAtual.id = verificarItem.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === verificarItem.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0

        criarElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criarElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDelete(item.id))

    lista.appendChild(novoItem)

}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}

function botaoDelete(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function () {
        deletar(this.parentNode, id)
    })

    return elementoBotao
}

function deletar(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))


}
