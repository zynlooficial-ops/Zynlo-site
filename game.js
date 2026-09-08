/* =====================================
   ZYNLO MULTIMARCAS
   JAVASCRIPT PRINCIPAL
===================================== */


/* =====================================
   WHATSAPP
===================================== */

const NUMERO_WHATSAPP = "5582994335034";


function comprarProduto(nome, preco, tamanho = "") {

    let mensagem =
        `Olá! Tenho interesse no produto: ${nome}.`;

    if (tamanho) {
        mensagem +=
            ` Tamanho: ${tamanho}.`;
    }

    mensagem +=
        ` Preço: R$ ${preco}.`;

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

    if (!card) {
        return;
    }


    const botoes =
        card.querySelectorAll(
            ".tamanhos button:not(.tamanho-indisponivel)"
        );


    botoes.forEach(function(item) {

        item.classList.remove(
            "selecionado"
        );

    });


    botao.classList.add(
        "selecionado"
    );


    const tamanho =
        botao.textContent.trim();


    const texto =
        card.querySelector(
            ".tamanho-escolhido"
        );


    if (texto) {

        texto.textContent =
            `Tamanho selecionado: ${tamanho}`;

    }


    card.dataset.tamanho =
        tamanho;

}



/* =====================================
   TAMANHO INDISPONÍVEL
===================================== */

function tamanhoIndisponivel(botao) {

    alert(
        "Esse tamanho está indisponível no momento."
    );

}



/* =====================================
   CARRINHO
===================================== */

let carrinho =
    JSON.parse(
        localStorage.getItem(
            "zynloCarrinho"
        )
    ) || [];



/* =====================================
   SALVAR CARRINHO
===================================== */

function salvarCarrinho() {

    localStorage.setItem(
        "zynloCarrinho",
        JSON.stringify(carrinho)
    );

}



/* =====================================
   ADICIONAR AO CARRINHO
===================================== */

function adicionarCarrinho(
    nome,
    preco,
    imagem,
    tamanho = ""
) {

    const card =
        document.querySelector(
            `.produto-card`
        );


    /*
       Se o produto possui tamanho,
       exige que o cliente escolha.
    */

    let tamanhoFinal =
        tamanho;


    if (!tamanhoFinal) {

        const cards =
            document.querySelectorAll(
                ".produto-card"
            );


        cards.forEach(function(item) {

            const titulo =
                item.querySelector(
                    "h3"
                );


            if (
                titulo &&
                titulo.textContent.trim() === nome
            ) {

                if (
                    item.dataset.tamanho
                ) {

                    tamanhoFinal =
                        item.dataset.tamanho;

                }

            }

        });

    }


    /*
       Para produtos que possuem
       tamanho disponível, exigir seleção.
    */

    if (!tamanhoFinal) {

        const cards =
            document.querySelectorAll(
                ".produto-card"
            );


        let produtoEncontrado =
            false;


        cards.forEach(function(item) {

            const titulo =
                item.querySelector(
                    "h3"
                );


            if (
                titulo &&
                titulo.textContent.trim() === nome
            ) {

                produtoEncontrado =
                    true;

            }

        });


        if (produtoEncontrado) {

            alert(
                "Selecione um tamanho antes de adicionar ao carrinho."
            );

            return;

        }

    }



    /*
       Permite o mesmo produto
       em tamanhos diferentes.
    */

    const produtoExistente =
        carrinho.find(function(item) {

            return (
                item.nome === nome &&
                item.tamanho === tamanhoFinal
            );

        });



    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome:
                nome,

            preco:
                Number(preco),

            imagem:
                imagem,

            tamanho:
                tamanhoFinal,

            quantidade:
                1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

}



/* =====================================
   REMOVER ITEM DO CARRINHO
===================================== */

function removerCarrinho(index) {

    carrinho.splice(
        index,
        1
    );


    salvarCarrinho();

    atualizarCarrinho();

}



/* =====================================
   ATUALIZAR CARRINHO
===================================== */

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



    /* CONTADOR */

    if (contador) {

        let quantidadeTotal =
            0;


        carrinho.forEach(function(item) {

            quantidadeTotal +=
                item.quantidade;

        });


        contador.textContent =
            quantidadeTotal;

    }



    /* CARRINHO VAZIO */

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



    let total =
        0;


    lista.innerHTML =
        "";



    carrinho.forEach(
        function(item, index) {

            total +=
                item.preco *
                item.quantidade;



            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "item-carrinho";



            const precoFormatado =
                item.preco
                    .toFixed(2)
                    .replace(
                        ".",
                        ","
                    );



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
                        R$ ${precoFormatado}
                    </p>


                    ${
                        item.tamanho
                        ?
                        `
                        <p>
                            Tamanho:
                            ${item.tamanho}
                        </p>
                        `
                        :
                        ""
                    }


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


            lista.appendChild(
                div
            );

        }
    );



    if (totalElemento) {

        totalElemento.textContent =
            `R$ ${total
                .toFixed(2)
                .replace(
                    ".",
                    ","
                )}`;

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

    if (
        carrinho.length === 0
    ) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }



    let mensagem =
        "Olá! Quero fazer um pedido na ZYNLO Multimarcas.\n\n";


    let total =
        0;



    carrinho.forEach(
        function(item) {

            const subtotal =
                item.preco *
                item.quantidade;


            total +=
                subtotal;



            mensagem +=
                `Produto: ${item.nome}\n`;


            if (item.tamanho) {

                mensagem +=
                    `Tamanho: ${item.tamanho}\n`;

            }


            mensagem +=
                `Quantidade: ${item.quantidade}\n`;


            mensagem +=
                `Preço: R$ ${item.preco
                    .toFixed(2)
                    .replace(
                        ".",
                        ","
                    )}\n\n`;

        }
    );



    mensagem +=
        `Total: R$ ${total
            .toFixed(2)
            .replace(
                ".",
                ","
            )}`;



    const url =
        `https://wa.me/${NUMERO_WHATSAPP}?text=` +
        encodeURIComponent(
            mensagem
        );


    window.open(
        url,
        "_blank"
    );

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
