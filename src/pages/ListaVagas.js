import React from "react";
import { useNavigate } from "react-router-dom";
import './ListaVagas.css';
import totalVagas from "../components/TotalVagas";

const maximoVagas = totalVagas();





function OrdenarVagas(vagasOrdenar) {
    let vagasParaOrdenar = vagasOrdenar;
    let sorted = false;

    while(!sorted) {
    sorted = true;
    for(var i=0; i < (vagasParaOrdenar.length); i++) {
        if (i === 0) {
            if(vagasParaOrdenar[i].numeroVaga > vagasParaOrdenar[i+1].numeroVaga) {
                let temp = vagasParaOrdenar[i];
                vagasParaOrdenar[i] = vagasParaOrdenar[i+1];
                vagasParaOrdenar[i+1] = temp;
                sorted = false;
                }
        } else if (i === vagasParaOrdenar.length) {
                sorted = false;
        } else {
            if(vagasParaOrdenar[i].numeroVaga < vagasParaOrdenar[i-1].numeroVaga) {
                let temp = vagasParaOrdenar[i];
                vagasParaOrdenar[i] = vagasParaOrdenar[i-1];
                vagasParaOrdenar[i-1] = temp;
                sorted = false;
                }
        }
    }
    }
    return (vagasParaOrdenar);
    }


function ListaVagas() {
    const navigate = useNavigate();
    // Recupera os vagas do LocalStorage
    const vagas = JSON.parse(localStorage.getItem('vagas')) || [];

    let mostrarVagasOcupadas = new Array();
    let mostrarVagasLivres = new Array();

    for (let i=0; i<vagas.length; i++) {
        if (vagas[i].vagaIndisponivel === true) {
            mostrarVagasOcupadas.push(vagas[i]);
        }
    }

    for (let i=0; i<vagas.length; i++) {
        if (vagas[i].vagaIndisponivel === false) {
            mostrarVagasLivres.push(vagas[i]);
        }
    }

    const handleDetalhes = (id) => {
        navigate(`/detalhes/${id}`);
    };

    const handleAlteracao = (id) => {
        navigate(`/alteracao/${id}`);
    };

    const handleExclusao = (id) => {
        
        const liberarVaga = ({
            placa: '',
            proprietario: '',
            apartamento: '',
            bloco: '',
            modeloVeiculo: '',
            corVeiculo: '',
            numeroVaga: `${(id+1)}`,
            vagaIndisponivel: false
        });

        
        vagas.push(liberarVaga);        


        //localStorage.setItem('vagasLivres', JSON.stringify(mostrarVagasLivres));

        // Filtra os vagas para excluir o vaga com o ID informado
        const vagasAtualizadas = vagas.filter((vaga, index) => index !== id);



        //alert("Vagas desordenadas!");
        OrdenarVagas(vagasAtualizadas);
        //alert("Vagas Ordenadas");



        // Atualiza o LocalStorage com a lista de vagas atualizada
        localStorage.setItem('vagas', JSON.stringify(vagasAtualizadas));



        alert(`Vaga ${(id+1)} excluída com sucesso!`);
        // Recarrega a página para exibir a lista atualizada
        //window.location.reload();
        navigate(`/lista`);
        
    };


    // <strong>Vaga #: {vaga.numeroVaga} </strong>

    return (
        <div>
            <h1>Listagem de Vagas Ocupadas</h1>
            <ul>
                {
                    mostrarVagasOcupadas.map((mostrarVagasOcupadas) => (
                        <li>
                            <strong>Vaga #: {mostrarVagasOcupadas.numeroVaga} </strong>
                            <button onClick={() => handleDetalhes((mostrarVagasOcupadas.numeroVaga-1))}>Detalhes</button>
                            <button onClick={() => handleAlteracao((mostrarVagasOcupadas.numeroVaga-1))}>Alterar</button>
                            <button onClick={() => handleExclusao((mostrarVagasOcupadas.numeroVaga-1))}>Excluir</button>
                        </li>
                    ))}
            </ul>

            <h1>Listagem de Vagas Disponíveis</h1>
            <ul>
                {
                    mostrarVagasLivres.map((mostrarVagasLivres) => (
                        <li>
                            <strong>Vaga #: {mostrarVagasLivres.numeroVaga} </strong>
                        </li>
                    ))}
            </ul>

        </div>

        
        
    );
}

export default ListaVagas;