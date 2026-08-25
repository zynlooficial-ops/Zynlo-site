/* =====================================
   ZYNLO MULTIMARCAS
   JAVASCRIPT PRINCIPAL
===================================== */


/* =====================================
   WHATSAPP
===================================== */

const NUMERO_WHATSAPP = "5582994335034";


function comprarProduto(nome, preco) {

    const mensagem =
        `Olá! Tenho interesse no produto: ${nome}. ` +
        `Preço: R$ ${preco}.`;

    const url =
        `https://wa.me/${NUMERO_WHATSAPP}?text=` +
        encodeURIComponent(mensagem);

    window.open(url, "_blank");
}


/* =====================================
   TAMANHOS
===================================== */

function selecionarTamanho(botao, produto) {

    const card =
        botao.closest(".produto-card");

    const botoes =
        card.querySelectorAll(".tamanhos button");

    botoes.forEach(function(item) {

        item.classList.remove("selecionado");

    });


    botao.classList.add("selecionado");


    const tamanho =
        botao.textContent.trim();


    const texto =
        card.querySelector(".tamanho-escolhido");


    if (texto) {

        texto.textContent =
            `Tamanho selecionado: ${tamanho}`;

    }


    card.dataset.tamanho = tamanho;
}


/* =====================================
   CARRINHO
===================================== */

let carrinho =
    JSON.parse(
        localStorage.getItem("zynloCarrinho")
    ) || [];


function salvarCarrinho() {

    localStorage.setItem(
        "zynloCarrinho",
        JSON.stringify(carrinho)
    );

}


function adicionarCarrinho(
    nome,
    preco,
    imagem
) {

    const produtoExistente =
        carrinho.find(
            item => item.nome === nome
        );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            preco: preco,

            imagem: imagem,

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

}


function removerCarrinho(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    atualizarCarrinho();

}


function atualizarCarrinho() {

    const lista =
        document.getElementById(
            "listaCarrinho"
        );


    const contador =
        document.getElementById(
            "contadorCarrinho"
        );


    const totalElemento =
        document.getElementById(
            "totalCarrinho"
        );


    if (!lista) {
        return;
    }


    if (contador) {

        let quantidadeTotal = 0;

        carrinho.forEach(function(item) {

            quantidadeTotal +=
                item.quantidade;

        });


        contador.textContent =
            quantidadeTotal;

    }


    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p class="carrinho-vazio">
                Seu carrinho está vazio.
            </p>
        `;


        if (totalElemento) {

            totalElemento.textContent =
                "R$ 0,00";

        }

        return;

    }


    let total = 0;


    lista.innerHTML = "";


    carrinho.forEach(function(item, index) {

        total +=
            item.preco *
            item.quantidade;


        const div =
            document.createElement("div");


        div.className =
            "item-carrinho";


        div.innerHTML = `

            <img
                src="${item.imagem}"
                alt="${item.nome}"
            >

            <div class="item-carrinho-info">

                <h4>
                    ${item.nome}
                </h4>

                <p>
                    R$ ${item.preco
                        .toFixed(2)
                        .replace(".", ",")}
                </p>

                <p>
                    Quantidade:
                    ${item.quantidade}
                </p>

            </div>

            <button
                class="remover-item"
                onclick="removerCarrinho(${index})">

                ✕

            </button>

        `;


        lista.appendChild(div);

    });


    if (totalElemento) {

        totalElemento.textContent =
            `R$ ${total
                .toFixed(2)
                .replace(".", ",")}`;

    }

}


/* =====================================
   ABRIR CARRINHO
===================================== */

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById(
            "carrinho"
        );


    const fundo =
        document.getElementById(
            "fundoCarrinho"
        );


    if (carrinhoElemento) {

        carrinhoElemento.classList.add(
            "aberto"
        );

    }


    if (fundo) {

        fundo.classList.add(
            "aberto"
        );

    }


    atualizarCarrinho();

}


/* =====================================
   FECHAR CARRINHO
===================================== */

function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById(
            "carrinho"
        );


    const fundo =
        document.getElementById(
            "fundoCarrinho"
        );


    if (carrinhoElemento) {

        carrinhoElemento.classList.remove(
            "aberto"
        );

    }


    if (fundo) {

        fundo.classList.remove(
            "aberto"
        );

    }

}


/* =====================================
   FINALIZAR PEDIDO
===================================== */

function finalizarCarrinho() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    let mensagem =
        "Olá! Quero fazer um pedido na ZYNLO Multimarcas.%0A%0A";


    let total = 0;


    carrinho.forEach(function(item) {

        const subtotal =
            item.preco *
            item.quantidade;


        total += subtotal;


        mensagem +=
            `Produto: ${item.nome}%0A`;


        mensagem +=
            `Quantidade: ${item.quantidade}%0A`;


        mensagem +=
            `Preço: R$ ${item.preco
                .toFixed(2)
                .replace(".", ",")}%0A%0A`;

    });


    mensagem +=
        `Total: R$ ${total
            .toFixed(2)
            .replace(".", ",")}`;


    const url =
        `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`;


    window.open(url, "_blank");

}

/* =====================================
   TAMANHO INDISPONÍVEL
===================================== */

function tamanhoIndisponivel(botao) {

    alert("Esse tamanho está indisponível no momento.");

           }
/* =====================================
   INICIAR
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarCarrinho();

    }
);
