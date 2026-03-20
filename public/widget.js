// AI Luna Widget - Pastille - Design Or Magnifique
// Ajoutez ce script sur votre site : <script src="https://ai-luna.pages.dev/widget.js" async></script>

(function() {
  const container = document.createElement('div');
  container.id = 'ai-luna-widget';
  container.innerHTML = `
    <style>
      #ai-luna-widget * {
        box-sizing: border-box;
      }
      
      /* Bouton pastille - Design Or Lumineux */
      #luna-pastille-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.4);
        background: linear-gradient(135deg, #D8B15A 0%, #B8963A 100%);
        box-shadow: 0 0 40px rgba(216, 177, 90, 0.7), 0 0 80px rgba(216, 177, 90, 0.4);
        cursor: pointer;
        z-index: 99999;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        overflow: hidden;
        padding: 0;
      }
      
      #luna-pastille-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 0 50px rgba(216, 177, 90, 0.9), 0 0 100px rgba(216, 177, 90, 0.5);
      }
      
      #luna-pastille-btn img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      /* Fenêtre de chat - Design Or Élégant */
      #luna-chat-popup {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 380px;
        height: 550px;
        max-height: 85vh;
        border-radius: 24px;
        background: linear-gradient(160deg, #0B1F3A 0%, #1a0f2e 50%, #0B1F3A 100%);
        box-shadow: 0 0 50px rgba(216, 177, 90, 0.4), 0 25px 50px rgba(0, 0, 0, 0.5);
        border: 2px solid rgba(216, 177, 90, 0.5);
        z-index: 99999;
        display: none;
        flex-direction: column;
        overflow: hidden;
        font-family: Georgia, serif;
      }
      
      #luna-chat-popup.open {
        display: flex;
      }
      
      /* En-tête - Design Or */
      #luna-chat-header {
        padding: 16px 20px;
        background: linear-gradient(180deg, rgba(216, 177, 90, 0.2) 0%, transparent 100%);
        border-bottom: 1px solid rgba(216, 177, 90, 0.4);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      #luna-chat-header-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      #luna-avatar-container {
        position: relative;
        width: 44px;
        height: 44px;
      }
      
      #luna-avatar-glow {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(216, 177, 90, 0.6) 0%, transparent 70%);
        filter: blur(8px);
      }
      
      #luna-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 2px solid #D8B15A;
        overflow: hidden;
        position: relative;
        box-shadow: 0 0 15px rgba(216, 177, 90, 0.5);
      }
      
      #luna-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      #luna-chat-title {
        font-size: 18px;
        font-weight: bold;
        color: #D8B15A;
        text-shadow: 0 0 15px rgba(216, 177, 90, 0.6);
      }
      
      #luna-chat-subtitle {
        font-size: 12px;
        color: rgba(216, 177, 90, 0.7);
      }
      
      #luna-close-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(216, 177, 90, 0.2);
        border: 1px solid rgba(216, 177, 90, 0.4);
        color: #D8B15A;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
      }
      
      #luna-close-btn:hover {
        transform: scale(1.1);
      }
      
      /* Messages */
      #luna-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .luna-message {
        display: flex;
        gap: 8px;
        max-width: 85%;
      }
      
      .luna-message.user {
        flex-direction: row-reverse;
        align-self: flex-end;
      }
      
      .luna-message-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid #D8B15A;
        overflow: hidden;
        flex-shrink: 0;
        box-shadow: 0 0 10px rgba(216, 177, 90, 0.4);
      }
      
      .luna-message-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .luna-message-content {
        padding: 12px 16px;
        border-radius: 16px;
        font-size: 14px;
        line-height: 1.5;
        white-space: pre-wrap;
      }
      
      .luna-message.assistant .luna-message-content {
        background: linear-gradient(135deg, rgba(43, 15, 58, 0.6) 0%, rgba(11, 31, 58, 0.6) 100%);
        border: 1px solid rgba(216, 177, 90, 0.25);
        color: rgba(255, 255, 255, 0.9);
        border-bottom-left-radius: 6px;
      }
      
      .luna-message.user .luna-message-content {
        background: linear-gradient(135deg, rgba(216, 177, 90, 0.35) 0%, rgba(184, 150, 58, 0.25) 100%);
        border: 2px solid rgba(216, 177, 90, 0.5);
        color: #D8B15A;
        border-bottom-right-radius: 6px;
        box-shadow: 0 0 15px rgba(216, 177, 90, 0.25);
      }
      
      .luna-loading {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
      }
      
      .luna-loading span {
        width: 8px;
        height: 8px;
        background: #D8B15A;
        border-radius: 50%;
        animation: luna-bounce 1s infinite;
      }
      
      .luna-loading span:nth-child(2) { animation-delay: 150ms; }
      .luna-loading span:nth-child(3) { animation-delay: 300ms; }
      
      @keyframes luna-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      
      /* Input - Design Or */
      #luna-chat-input-area {
        padding: 16px;
        background: linear-gradient(0deg, rgba(216, 177, 90, 0.1) 0%, transparent 100%);
        border-top: 1px solid rgba(216, 177, 90, 0.4);
      }
      
      #luna-input-container {
        display: flex;
        gap: 8px;
      }
      
      #luna-message-input {
        flex: 1;
        padding: 10px 16px;
        border-radius: 20px;
        border: 2px solid rgba(216, 177, 90, 0.5);
        background: rgba(11, 31, 58, 0.7);
        color: white;
        font-size: 14px;
        font-family: Georgia, serif;
        outline: none;
      }
      
      #luna-message-input::placeholder {
        color: rgba(216, 177, 90, 0.5);
      }
      
      #luna-message-input:focus {
        border-color: rgba(216, 177, 90, 0.8);
      }
      
      #luna-send-btn {
        padding: 10px 16px;
        border-radius: 20px;
        border: none;
        background: linear-gradient(135deg, #D8B15A 0%, #B8963A 100%);
        color: #0B1F3A;
        font-size: 16px;
        cursor: pointer;
        box-shadow: 0 0 20px rgba(216, 177, 90, 0.5);
        transition: transform 0.2s;
      }
      
      #luna-send-btn:hover {
        transform: scale(1.05);
      }
      
      #luna-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    </style>
    
    <button id="luna-pastille-btn">
      <img src="https://ai-luna.pages.dev/deesse-lunaire.png" alt="Luna">
    </button>
    
    <div id="luna-chat-popup">
      <div id="luna-chat-header">
        <div id="luna-chat-header-left">
          <div id="luna-avatar-container">
            <div id="luna-avatar-glow"></div>
            <div id="luna-avatar">
              <img src="https://ai-luna.pages.dev/deesse-lunaire.png" alt="Luna">
            </div>
          </div>
          <div>
            <div id="luna-chat-title">Luna</div>
            <div id="luna-chat-subtitle">Guide lunaire</div>
          </div>
        </div>
        <button id="luna-close-btn">✕</button>
      </div>
      
      <div id="luna-chat-messages"></div>
      
      <div id="luna-chat-input-area">
        <div id="luna-input-container">
          <input type="text" id="luna-message-input" placeholder="Votre message...">
          <button id="luna-send-btn">✨</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(container);
  
  // Éléments
  const pastilleBtn = document.getElementById('luna-pastille-btn');
  const chatPopup = document.getElementById('luna-chat-popup');
  const closeBtn = document.getElementById('luna-close-btn');
  const messagesContainer = document.getElementById('luna-chat-messages');
  const messageInput = document.getElementById('luna-message-input');
  const sendBtn = document.getElementById('luna-send-btn');
  
  let messages = [];
  let isLoading = false;
  
  // Message de bienvenue
  const welcomeMessage = `🌙 Bienvenue, voyageur des étoiles !

Je suis Luna, votre guide spirituelle. Je suis ici pour vous aider à découvrir votre signe lunaire et à comprendre son influence sur votre vie émotionnelle.

✨ Pour commencer, dites-moi votre date de naissance (jour, mois, année) et je révélerai les secrets de votre Lune natale...`;
  
  // Ouvrir/fermer le chat
  pastilleBtn.addEventListener('click', () => {
    chatPopup.classList.add('open');
    pastilleBtn.style.display = 'none';
    
    if (messages.length === 0) {
      addMessage('assistant', welcomeMessage);
    }
  });
  
  closeBtn.addEventListener('click', () => {
    chatPopup.classList.remove('open');
    pastilleBtn.style.display = 'block';
  });
  
  // Gestion des messages
  function addMessage(role, content) {
    messages.push({ role, content });
    renderMessages();
  }
  
  function renderMessages() {
    messagesContainer.innerHTML = messages.map(msg => `
      <div class="luna-message ${msg.role}">
        ${msg.role === 'assistant' ? `
          <div class="luna-message-avatar">
            <img src="https://ai-luna.pages.dev/deesse-lunaire.png" alt="Luna">
          </div>
        ` : ''}
        <div class="luna-message-content">${msg.content}</div>
      </div>
    `).join('');
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'luna-message assistant';
    loadingDiv.id = 'luna-loading-message';
    loadingDiv.innerHTML = `
      <div class="luna-message-avatar">
        <img src="https://ai-luna.pages.dev/deesse-lunaire.png" alt="Luna">
      </div>
      <div class="luna-loading">
        <span></span><span></span><span></span>
      </div>
    `;
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  function hideLoading() {
    const loadingDiv = document.getElementById('luna-loading-message');
    if (loadingDiv) loadingDiv.remove();
  }
  
  async function sendMessage() {
    const content = messageInput.value.trim();
    if (!content || isLoading) return;
    
    addMessage('user', content);
    messageInput.value = '';
    isLoading = true;
    sendBtn.disabled = true;
    showLoading();
    
    try {
      const response = await fetch('https://ai-luna.pages.dev/api/luna-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages.slice(0, -1).concat([{ role: 'user', content }]) })
      });
      
      const data = await response.json();
      
      hideLoading();
      
      if (data.success) {
        addMessage('assistant', data.message);
      } else {
        addMessage('assistant', "🌟 Désolée, une perturbation cosmique m'empêche de répondre. Pouvez-vous reformuler votre question?");
      }
    } catch (error) {
      hideLoading();
      addMessage('assistant', "🌟 Les étoiles sont momentanément voilées... Veuillez réessayer dans un instant.");
    } finally {
      isLoading = false;
      sendBtn.disabled = false;
    }
  }
  
  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
})();
