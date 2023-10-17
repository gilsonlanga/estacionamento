import React, {useState} from 'react';
import './CadastroVagas.css';
import totalVagas from '../components/TotalVagas';

const maximoVagas = totalVagas();

let vagasIndisponiveis = new Array(maximoVagas);
let vagasDisponiveis = new Array(maximoVagas);
let inicializar = true;

//alert("Inicializando...");


function CadastroVagas() {

    if (inicializar) {
        for (let i=0; i<maximoVagas; i++) {
            vagasIndisponiveis[i] = {vagaIndisponivel: false, numeroVaga: (i+1)};
        }
        vagasDisponiveis =
        inicializar = false;
    }

    const [vaga, setVaga] = useState({
        placa: '',
        proprietario: '',
        apartamento: '',
        bloco: '',
        modeloVeiculo: '',
        corVeiculo: '',
        numeroVaga: '',
        //vagaIndisponivel: false
    });

    //alert("Vaga Criada");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVaga({ ...vaga, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //alert("Formulário enviado");
        //Validação dos campos para evitar o envio de dados inválidos
        if(!vaga.placa || !vaga.proprietario || !vaga.apartamento || !vaga.bloco || !vaga.modeloVeiculo || !vaga.corVeiculo || !vaga.numeroVaga) {
            alert('Preencha todos os campos!');
            return;
        }

        //Recupera os vagas já cadastrados no LocalStorage
        const vagasCadastradas = JSON.parse(localStorage.getItem('vagas')) || [];
        //alert("Recuperado do localstorage");

        if (parseInt(vaga.numeroVaga) < 1 || parseInt(vaga.numeroVaga) > maximoVagas) {
            alert(`Escolha uma vaga de 1 à ${maximoVagas}, que esteja disponível`);
            return;
        }

        //alert("Validado a quantidade total de vagas");

        /*
            for (let i=0; i<vagasCadastradas.length; i++) {
                //if (element.numeroVaga === vaga.numeroVaga) {
                    alert(`Numero da vaga: ${vaga.numeroVaga}`);
                    if (vaga.numeroVaga == (i+1)) {
                        alert(`Vaga: ${(i+1)}`);
                        alert(`Vaga indisponível === ${vagasIndisponiveis[i].vagaIndisponivel}`);
                        if (vagasIndisponiveis[i].vagaIndisponivel === false) {
                            vagasIndisponiveis[i] = vaga;
                            vagasIndisponiveis[i].vagaIndisponivel = true;
                            alert(`Vaga indisponível === ${vagasIndisponiveis[i].vagaIndisponivel}`);
                        } else {
                            alert(`Vaga ${vaga.numeroVaga} ocupada!! - Escolha outra Vaga!!!`);
                            return;
                        }
                    } 
                
            }

            */
            let i=0;
            do {
                //alert(`Numero da vaga: ${vaga.numeroVaga}`);
                if (vaga.numeroVaga == (i+1)) {
                    //alert(`Vaga: ${(i+1)}`);
                    //alert(`Vaga indisponível === ${vagasIndisponiveis[i].vagaIndisponivel}`);
                    if (vagasIndisponiveis[i].vagaIndisponivel === false) {
                        vagasIndisponiveis[i] = vaga;
                        vagasIndisponiveis[i].vagaIndisponivel = true;
                        //alert(`Vaga indisponível === ${vagasIndisponiveis[i].vagaIndisponivel}`);
                    } else {
                        alert(`Vaga ${vaga.numeroVaga} ocupada!! - Escolha outra Vaga!!!`);
                        return;
                    }
                }
                i++;
            } while (i<maximoVagas);

            for (let i=0; i<totalVagas; i++) {
                console.log(vagasIndisponiveis[i]);
            }
            

            //Adiciona o novo vaga à lista de vagas
            //vagasCadastradas.push(vaga);

            //Atualiza o LocalStorage com a lista de vagas atualizada
            localStorage.setItem('vagas', JSON.stringify(vagasIndisponiveis));

            //alert("Local Storage atualizado");

            //Limpa os campos após o cadastro
            setVaga({
                placa: '',
                proprietario: '',
                apartamento: '',
                bloco: '',
                modeloVeiculo: '',
                corVeiculo: '',
                numeroVaga: '',
                //vagaIndisponivel: false
            });

            alert(`Vaga ${vaga.numeroVaga} cadastrada com sucesso!`);

    };

    return (
        <div>
            <h1>Cadastro de vaga</h1>
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

                <label>Numero da Vaga:</label>
                <input type="text" name="numeroVaga" value={vaga.numeroVaga} onChange={handleInputChange} />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );

}

export default CadastroVagas;
