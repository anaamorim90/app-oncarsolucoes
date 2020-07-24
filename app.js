'use strict'

//  "https://api-oncarsolucoes.herokuapp.com/veiculos"

document.addEventListener("DOMContentLoaded", function (event) {
    atualizarListaVeiculos();
})

function atualizarListaVeiculos() {

    document.getElementById("veiculos").innerHTML = "";
    document.getElementById("detalhesVeiculo").innerHTML = "";

    var veiculos = [];

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://api-oncarsolucoes.herokuapp.com/veiculos");

    var buttonload = document.getElementById("buttonloadLista").innerHTML;
    buttonload = '<i class="fa fa-spinner fa-spin">';
    document.getElementById("buttonloadLista").innerHTML = buttonload;

    xhr.addEventListener("load", function () {
        var response = xhr.responseText;
        veiculos = JSON.parse(response);

        veiculos.forEach(function (veiculos) {
            console.log(veiculos);
            adicionar(veiculos);
        });
    });
    xhr.onload = function () {
        buttonload = "";
        document.getElementById("buttonloadLista").innerHTML = buttonload;
    };
    xhr.send()
}

function adicionar(veiculo) {
    var veiculos = document.getElementById("veiculos").innerHTML;
    veiculos = veiculos + '<li onClick="detalhes(' + veiculo.id + ', 0)" class="list-group-item" id="' + veiculo.id + '">' +
        '<h6 class="card-title">' + veiculo.marca + '</h6>' +
        '<table style="width: 100%">' +
        '<thead><tr>' +
        '<td><h5 class="card-text"><b>' + veiculo.veiculo + '</b></h5></td>' +
        '<td align=right>' + '<svg data-toggle="modal" data-target="#modalEditar" onClick="detalhes(' + veiculo.id + ', 1)" width="2em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>' +
        '</td>' +
        '</tr></thead></table>' +
        '<h6 class="card-title">' + veiculo.ano + '</h6>' + '</li>';

    document.getElementById("veiculos").innerHTML = veiculos;
}


function detalhes(id, origem) {

    var veiculoDet;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://api-oncarsolucoes.herokuapp.com/veiculos/" + id);

    var buttonload = document.getElementById("buttonloadEdt").innerHTML;
    buttonload = '<i class="fa fa-spinner fa-spin">';
    document.getElementById("buttonloadEdt").innerHTML = buttonload;

    if (origem == 1) {
        var buttonload = document.getElementById("buttonloadEditar").innerHTML;
        buttonload = '<i class="fa fa-spinner fa-spin">';
        document.getElementById("buttonloadEditar").innerHTML = buttonload;
    }

    xhr.addEventListener("load", function () {
        var response = xhr.responseText;
        var veiculo = JSON.parse(response);
        console.log(veiculo);

        var detalhesVeiculo = document.getElementById("detalhesVeiculo").innerHTML;

        var vendido = "";
        if (veiculo[0].vendido == 0) {
            vendido = '<p class="card-text" id="vendido">Disponível</p>'
        } else {
            vendido = '<p class="card-text" id="vendido">Vendido</p>'
        }

        detalhesVeiculo =
            '<div id="veiculoDetalhado" aria-labelledby="' + veiculo[0].id + '">' +
            '<h6 class="card-title">Referência: <b id="idVeiculo">' + veiculo[0].id + '</b></h6>' +
            '<h4 class="card-title"><b id="veiculo">' + veiculo[0].veiculo + '</b></h4>' +
            '<br>' +
            '<table style="width:100%">' +
            '<thead><tr>' +
            '<td><h6 class="card-text"><b>MARCA</b></h6></td>' +
            '<td><h6 class="card-text"><b>ANO</b></h6></td>' +
            '</tr></thead>' +
            '<tbody><tr>' +
            '<td><h5 class="card-text" id="marca">' + veiculo[0].marca + '</h5></td>' +
            '<td><h5 class="card-text" id="ano">' + veiculo[0].ano + '</h5></td>' +
            '</tr></tbody>' +
            '</table>' +
            '<br>' +
            '<p class="card-text" id="descricao">' + veiculo[0].descricao + '</p>' +
            '<br>' +
            vendido +
            '</div>';

        document.getElementById("detalhesVeiculo").innerHTML = detalhesVeiculo;


    });

    xhr.onload = function () {
        buttonload = "";
        document.getElementById("buttonloadEdt").innerHTML = buttonload;

        if (origem == 1) {
            buttonload = "";
            document.getElementById("buttonloadEditar").innerHTML = buttonload;
            setaDadosModal();
        }

    };

    xhr.send();
    if (origem == 1) {
        setaDadosModal();
    }

}


function setaDadosModal() {

    var veiculo = document.getElementById("veiculo").innerHTML;
    var marca = document.getElementById("marca").innerHTML;
    var ano = document.getElementById("ano").innerHTML;
    var descricao = document.getElementById("descricao").innerHTML;
    var vendido = document.getElementById("vendido").innerHTML;

    document.getElementById('veiculoEdt').value = veiculo;
    document.getElementById('marcaEdt').value = marca;
    document.getElementById('anoEdt').value = ano;
    document.getElementById('descricaoEdt').value = descricao;
    document.getElementById("vendidoTextEdt").innerHTML = vendido;

}

$(document).ready(function () {

    $("#salvarDadosEditados").on("click", function () {

        var buttonload = document.getElementById("buttonloadEditar").innerHTML;
        buttonload = '<i class="fa fa-spinner fa-spin">';
        document.getElementById("buttonloadEditar").innerHTML = buttonload;

        var id = document.getElementById("idVeiculo").innerHTML;
        var veiculo = $("#modalEditar").find("#veiculoEdt").val();
        var marca = $("#modalEditar").find("#marcaEdt").val();
        var ano = $("#modalEditar").find("#anoEdt").val();
        var descricao = $("#modalEditar").find("#descricaoEdt").val();
        var vendido = document.getElementById("vendidoTextEdt").innerHTML;

        console.log("id: " + id)
        console.log(vendido)

        $.ajax({
            method: "PATCH",
            url: "https://cors-anywhere.herokuapp.com/https://api-oncarsolucoes.herokuapp.com/veiculos/" + id,
            data: {
                veiculo: veiculo,
                marca: marca,
                ano: ano,
                descricao: descricao,
                vendido: vendido,
            },
            success: function (response, textStatus, jqXhr) {
                console.log("Editado com sucesso!");
                $(function () {
                    $("#modalEditar").removeClass("in");
                    $(".modal-backdrop").remove();
                    $('body').removeClass('modal-open');
                    $('#modalEditar').hide();

                    $(function () {
                        buttonload = "";
                        document.getElementById("buttonloadEditar").innerHTML = buttonload;
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Erro: " + textStatus, errorThrown);
            },
            complete: function () {
                console.log("Atualizar lista");
                atualizarListaVeiculos();
            }
        });

    });

    $("#salvarDadosCadastrados").on("click", function () {

        var buttonload = document.getElementById("buttonloadCadastrar").innerHTML;
        buttonload = '<i class="fa fa-spinner fa-spin">';
        document.getElementById("buttonloadCadastrar").innerHTML = buttonload;

        var veiculo = $("#modalCadastrar").find("#veiculoCdt").val();
        var marca = $("#modalCadastrar").find("#marcaCdt").val();
        var ano = $("#modalCadastrar").find("#anoCdt").val();
        var descricao = $("#modalCadastrar").find("#descricaoCdt").val();

        $.ajax({
            method: "POST",
            url: "https://cors-anywhere.herokuapp.com/https://api-oncarsolucoes.herokuapp.com/veiculos/",
            data: {
                veiculo: veiculo,
                marca: marca,
                ano: ano,
                descricao: descricao,
                vendido: false,
            },
            success: function (response, textStatus, jqXhr) {
                console.log("Cadastrado com sucesso!");
                $(function () {
                    $("#modalCadastrar").removeClass("in");
                    $(".modal-backdrop").remove();
                    $('body').removeClass('modal-open');
                    $('#modalCadastrar').hide();

                    $(function () {
                        buttonload = "";
                        document.getElementById("buttonloadCadastrar").innerHTML = buttonload;
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Erro: " + textStatus, errorThrown);
            },
            complete: function () {
                console.log("Atualizar lista");
                atualizarListaVeiculos();
            }
        });

    });

    $("#buscar").on("click", function () {
        var termo = document.getElementById('termoBusca');
        buscarVeiculo(termo.value);
    });
});

function buscarVeiculo(termo) {
    var veiculos = [];
    document.getElementById("veiculos").innerHTML = "";
    document.getElementById("detalhesVeiculo").innerHTML = "";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://api-oncarsolucoes.herokuapp.com/veiculos/veiculo/"+termo);

    var buttonload = document.getElementById("buttonloadLista").innerHTML;
    buttonload = '<i class="fa fa-spinner fa-spin">';
    document.getElementById("buttonloadLista").innerHTML = buttonload;

    xhr.addEventListener("load", function () {
        var response = xhr.responseText;
        veiculos = JSON.parse(response);

        veiculos.forEach(function (veiculos) {
            console.log(veiculos);
            adicionar(veiculos);
        });
    });
    xhr.onload = function () {
        buttonload = "";
        document.getElementById("buttonloadLista").innerHTML = buttonload;
    };
    xhr.send()
}


function remover() {

    var id = document.getElementById("idVeiculo").innerHTML;

    var buttonload = document.getElementById("buttonloadEdt").innerHTML;
    buttonload = '<i class="fa fa-spinner fa-spin">';
    document.getElementById("buttonloadEdt").innerHTML = buttonload;

    $.ajax({
        method: "DELETE",
        url: "https://cors-anywhere.herokuapp.com/https://api-oncarsolucoes.herokuapp.com/veiculos/" + id,
        success: function () {
            console.log("Removido com sucesso!");
            $(function () {
                buttonload = "";
                document.getElementById("buttonloadEdt").innerHTML = buttonload;
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Erro: " + textStatus, errorThrown);
        },
        complete: function () {
            console.log("Atualizar lista");
            atualizarListaVeiculos();
        }
    });

}







