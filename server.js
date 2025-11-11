let digitado = document.getElementById("cep"); //Recebe os dados digitados no "input" do HTML, que tem o ID "cep"

function buscarEndereco() { //Função principal que executa o back-end
    let cep = digitado.value; //Transformo o que peguei do input em apenas o valor digitado, sem pegar o elemento HTML por inteiro
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)//Uso o end point da API pública para buscar o cep digitado e retornar os dados
      .then(response => { //Aqui pego a resposta ("promessa") com todos os dados do cep digitado anteriormente 
        if (!response.ok) { //Verifico se a resposta é válida ou não
          throw new Error('CEP não encontrado ou inválido.'); //Passo a mensagem de erro caso o cep não seja encontrado ou seja inválido
        }
        return response.json(); //Transformo a resposta em json
      })
      .then(dadosEndereco => { //Aqui vem as infos do endereço do cep digitado
        
        if (dadosEndereco.erro) { //Mensagem de erro caso o cep não seja encontrado
          throw new Error('CEP não encontrado.');
        }
        
        document.getElementById('rua').value = dadosEndereco.logradouro; //Pego apenas o nome da rua para mostrar depois em um elemento html com o id 'rua'
        document.getElementById('bairro').value = dadosEndereco.bairro; //Pego apenas o nome do bairro para mostrar depois em um elemento html com o id 'bairro'
        document.getElementById('cidade').value = dadosEndereco.localidade; //Pego apenas o nome da cidade para mostrar depois em um elemento html com o id 'cidade'
        document.getElementById('estado').value = dadosEndereco.uf; //Pego apenas o nome do estado para mostrar depois em um elemento html com o id 'estado'
        console.log(dadosEndereco); //Retorno os dados do endereço no console apenas para verificar se deu certo
      })
      .catch(error => {
        console.error('Erro ao buscar CEP:', error); //Mensagem com o erro no console caso aconteça um
      });
  }
