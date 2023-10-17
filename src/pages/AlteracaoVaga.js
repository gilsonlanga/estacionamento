import React, { useState, useEffect} from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import './AlteracaoVaga.css';
import totalVagas from "../components/TotalVagas";

const maximoVagas = totalVagas();

function AlteracaoVaga() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [vaga, setVaga] = useState({
        placa: '',
        proprietario: '',
        apartamento: '',
        bloco: '',
        modeloVeiculo: '',
        corVeiculo: '',
        numeroVaga: ''
    });

    useEffect(() => {
        //Recupera o vaga pelo ID a partir do LocalStorage
        const vagasCadastradas = JSON.parse(localStorage.getItem('vagasOcupadas')) || [];
        const vagaEncontrada = vagasCadastradas.find((vaga, index) => index === Number(id));
        if (vagaEncontrada) {
            setVaga(vagaEncontrada);
        } else {
            alert('Vaga não encontrada!');
            navigate('/lista');
        }
    }, [id, navigate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVaga({ ...vaga, [name]: value });
    };

    const handleVoltar = () => {
        navigate('/lista');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validação dos campos para evitar o envio de dados inválidos

        if(!vaga.placa || !vaga.proprietario || !vaga.apartamento || !vaga.bloco || !vaga.modeloVeiculo || !vaga.corVeiculo || !vaga.numeroVaga) {
            alert('Preencha todos os campos!');
            return;
        }

        // Recupera os vagas já cadastrados no LocalStorage
        const vagasCadastradas = JSON.parse(localStorage.getItem('vagasOcupadas')) || [];

        // Encontra o índice do vaga no array
        const vagaIndex = vagasCadastradas.findIndex((vaga, index) => index === Number(id));

        // Verifica se o vaga foi encontrado
        if (vagaIndex !== -1) {
            // Atualiza se o vaga no array

            if (vaga.numeroVaga < 1 || vaga.numeroVaga > maximoVagas) {
                alert(`Escolha uma vaga de 1 à ${maximoVagas}, que esteja disponível`);
                return;
            }

            /*
            for (const element of vagasCadastradas) {
                if (element.numeroVaga === vaga.numeroVaga) {
                    alert(`Vaga ${vaga.numeroVaga} ocupada!! - Escolha outra Vaga!!!`);
                    return;
                }
            }

            */


            vagasCadastradas[vagaIndex] = vaga;

            // Atualiza o LocalStorage com o array de vagas atualizado
            localStorage.setItem('vagas', JSON.stringify(vagasCadastradas));

            alert(`Vaga ${vaga.numeroVaga} alterada com sucesso!`)
            navigate('/lista');
        } else {
            alert('Vaga não encontrada!');
            navigate('/lista');
        }

    };

    return (
        <div>
            <h1>Alteração de Vaga</h1>
            <form onSubmit={handleSubmit}>
            <label>Placa:</label>
                <input type="text" name="placa" value={vaga.placa} onChange={handleInputChange} />

                <label>Proprietário:</label>
                <input type='text' name="proprietario" value={vaga.proprietario} onChange={handleInputChange} />

                <label>Apartamento:</label>
                <input type="text" name="apartamento" value={vaga.apartamento} onChange={handleInputChange} />

                <label>Bloco:</label>
                <input type="text" name="bloco" value={vaga.bloco} onChange={handleInputChange} />

                <label>Modelo do Veículo:</label>
                <input type="text" name="modeloVeiculo" value={vaga.modeloVeiculo} onChange={handleInputChange} />

                <label>Cor do Veículo:</label>
                <input type="text" name="corVeiculo" value={vaga.corVeiculo} onChange={handleInputChange} />

                
                <button type="submit">Salvar Alterações</button>
                <button onClick={() => handleVoltar()}>Voltar</button>
            </form>
        </div>
    );
}

export default AlteracaoVaga;