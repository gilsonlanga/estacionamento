import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './DetalhesVaga.css';

function DetalhesVaga() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [vaga, setVaga] = useState(null);

    const handleVoltar = () => {
        navigate('/lista');
    };

    useEffect(() => {
        // Recupera o vaga pelo ID a partir do LocalStorage
        const vagasCadastradas = JSON.parse(localStorage.getItem('vagasOcupadas')) || [];
        const vagaEncontrada = vagasCadastradas.find((vaga, index) => index === Number(id));

        if (vagaEncontrada) {
            setVaga(vagaEncontrada);
        } else {
            alert('Vaga não encontrada!');
            navigate('/lista');
        }


    }, [id, navigate]);

    return (
        <div>
            <h1>Detalhes das Vagas</h1>
            {vaga ? (
                <div>
                    <strong>Placa: {vaga.placa}</strong>
                    <p>Proprietário: {vaga.proprietario}</p>
                    <p>Apartamento: {vaga.apartamento}</p>
                    <p>Bloco: {vaga.bloco}</p>
                    <p>Modelo do Veiculo: {vaga.modeloVeiculo}</p>
                    <p>Cor do Veiculo: {vaga.corVeiculo}</p>
                    <p>Número da Vaga: {vaga.numeroVaga}</p>
                    <button onClick={() => handleVoltar()}>Voltar</button>    
                </div>
            ) : null }

        </div>
    );
}

export default DetalhesVaga;