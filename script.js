// static/script.js
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message === '') return;

    const chatBox = document.getElementById('chat-box');
    
    // Exibe a mensagem do usuário
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = message;
    chatBox.appendChild(userMessageDiv);

    // Limpa o input
    userInput.value = '';

    // Scroll para o final
    chatBox.scrollTop = chatBox.scrollHeight;

    // Exibe uma mensagem de "digitando..."
    const botTypingDiv = document.createElement('div');
    botTypingDiv.className = 'message bot-message';
    botTypingDiv.textContent = 'IANexos está digitando...';
    chatBox.appendChild(botTypingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Envia a mensagem para a API
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        
        // Remove a mensagem de "digitando..."
        chatBox.removeChild(botTypingDiv);

        // Exibe a resposta da IA
        const botResponseDiv = document.createElement('div');
        botResponseDiv.className = 'message bot-message';
        botResponseDiv.textContent = data.response;
        chatBox.appendChild(botResponseDiv);

    } catch (error) {
        console.error('Erro:', error);
        chatBox.removeChild(botTypingDiv);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message bot-message';
        errorDiv.textContent = 'Ops! Ocorreu um erro. Tente novamente.';
        chatBox.appendChild(errorDiv);
    }

    // Scroll para o final novamente
    chatBox.scrollTop = chatBox.scrollHeight;
          }
