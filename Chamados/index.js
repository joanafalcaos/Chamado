const url = "https://parseapi.back4app.com/classes/Chamado";
const headers = {
  "X-Parse-Application-Id": "mI50K0T2GZ4MvpgJOP7HHmaaNgU3fXFWDDQy6OEm",
  "X-Parse-REST-API-Key": "OKAzIaA5ONyH546zF8EzvwmCghGSKTZ27RbONUac",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const criarChamados = async (chamado) => {
  const requestOptions = {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify({ 
      email: chamado.email, 
      nome: chamado.nome, 
      senha: chamado.senha, 
      assunto: chamado.assunto, 
      mensagem: chamado.mensagem, 
      finalizado: chamado.finalizado 
    }),
  };

  try {
    await fetch(url, requestOptions);
    clear();
  } catch (error) {
    console.error('Error:', error);
  }
};

const button = document.getElementById('btnAbrirChamado');
const emailInput = document.querySelector("#email");
const nomeInput = document.querySelector("#name");
const senhaInput = document.querySelector("#senha");
const assuntoInput = document.querySelector("#title");
const textArea = document.querySelector("#mensagem");

button.addEventListener('click', (e) => {
  const chamado = {
    email: emailInput.value,
    nome: nomeInput.value,
    senha: senhaInput.value,
    assunto: assuntoInput.value,
    mensagem: textArea.value,
    finalizado: false
    
  };
  console.log(chamado);

  criarChamados(chamado);
});

const clear = () => {
  emailInput.value = "";
  nomeInput.value = "";
  senhaInput.value = "";
  assuntoInput.value = "";
  textArea.value = "";
};