//sanitização front do input
const sanitizeInput = (input) => {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
  };
  
  document.getElementById('url-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const urlInput = document.getElementById('url-input').value;
    const sanitizedInput = sanitizeInput(urlInput);
  
    // Substituir o valor do input pelo sanitizado antes de enviar
    document.getElementById('url-input').value = sanitizedInput;

    try {
        const response = await fetch('/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl: sanitizeInput })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('URL encurtada:', data.shortUrl);
            
            // Exibir a URL encurtada na página ou em algum elemento HTML
            document.getElementById('shortened-url-display').innerText = `Shortened URL: ${data.shortUrl}`;
          } else {
            console.error('Erro:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao fazer a chamada:', error);
        }
  });
  