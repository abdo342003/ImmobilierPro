import { useState } from 'react';
import api from './api';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await api.post(
        '/api/test-endpoint/',
        { test: "data" },
        { responseType: 'text' }  // important pour recevoir HTML brut
      );

      // Vérifie le type de contenu de la réponse
      const contentType = res.headers['content-type'];

      if (contentType && contentType.includes('text/html')) {
        // Si c'est du HTML (comme login.html), ouvrir dans une nouvelle fenêtre
        const newWindow = window.open();
        newWindow.document.write(res.data);
        newWindow.document.close();
        setResponse({ message: 'Redirigé vers login.html' });
      } else {
        // Sinon, JSON comme prévu
        const json = JSON.parse(res.data);
        setResponse(json);
      }
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Connecté à Django</h1>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Envoi en cours...' : 'Envoyer à Django'}
      </button>

      {response && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          background: '#f0f0f0',
          borderRadius: '5px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
