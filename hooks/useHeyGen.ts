import { useState, useEffect, useCallback } from 'react';

interface HeyGenMessage {
  type: string;
  action: string;
  data?: any;
}

interface UseHeyGenReturn {
  isInitialized: boolean;
  isVisible: boolean;
  isExpanded: boolean;
  messages: string[];
  initializeHeyGen: () => void;
  sendMessage: (message: string) => void;
  toggleVisibility: () => void;
  cleanup: () => void;
}

export const useHeyGen = (): UseHeyGenReturn => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  // Gérer les messages de HeyGen
  const handleHeyGenMessage = useCallback((event: MessageEvent) => {
    if (event.origin !== 'https://labs.heygen.com') return;
    
    const message: HeyGenMessage = event.data;
    if (!message || message.type !== 'streaming-embed') return;

    switch (message.action) {
      case 'init':
        setIsInitialized(true);
        setIsVisible(true);
        break;
      case 'show':
        setIsExpanded(true);
        break;
      case 'hide':
        setIsExpanded(false);
        break;
      case 'message':
        if (message.data?.text) {
          setMessages(prev => [...prev, message.data.text]);
        }
        break;
    }
  }, []);

  // Initialiser HeyGen
  const initializeHeyGen = useCallback(() => {
    if (isInitialized) return;

    // Vérifier si le script est déjà chargé
    const existingEmbed = document.getElementById('heygen-streaming-embed');
    if (existingEmbed) {
      setIsInitialized(true);
      setIsVisible(true);
      return;
    }

    // Charger le script HeyGen
    const script = document.createElement('script');
    script.innerHTML = `
      !function(window){
        const host="https://labs.heygen.com",
        url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiI0MTY1MWNiMGJmYWU0MzQyODgyZTc1MDNm%0D%0AMzI3MGYyYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0ALzQxNjUxY2IwYmZhZTQzNDI4ODJlNzUwM2YzMjcwZjJjL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0%0D%0ALndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6Ijg3%0D%0ANGQ1NTY5ZTIwYzQzNDdiZjc1ZjM0YzVlODhjNmY2IiwidXNlcm5hbWUiOiI2ZTMzNDY2YzU0NWM0%0D%0AOGE1Yjg0ZjNhMTI2NGVhZTgxNSJ9&inIFrame=1",
        clientWidth=document.body.clientWidth,
        wrapDiv=document.createElement("div");
        wrapDiv.id="heygen-streaming-embed";
        
        const container=document.createElement("div");
        container.id="heygen-streaming-container";
        
        const stylesheet=document.createElement("style");
        stylesheet.innerHTML=\`
          #heygen-streaming-embed {
            z-index: 9999;
            position: fixed;
            left: 40px;
            bottom: 40px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 2px solid #fff;
            box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
            transition: all linear 0.1s;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
          }
          #heygen-streaming-embed.show {
            opacity: 1;
            visibility: visible;
          }
          #heygen-streaming-embed.expand {
            \${clientWidth<540?"height: 266px; width: 96%; left: 50%; transform: translateX(-50%);":"height: 366px; width: calc(366px * 16 / 9);"}
            border: 0;
            border-radius: 8px;
          }
          #heygen-streaming-container {
            width: 100%;
            height: 100%;
          }
          #heygen-streaming-container iframe {
            width: 100%;
            height: 100%;
            border: 0;
          }
        \`;
        
        const iframe=document.createElement("iframe");
        iframe.allowFullscreen=false;
        iframe.title="Streaming Embed";
        iframe.role="dialog";
        iframe.allow="microphone";
        iframe.src=url;
        
        let visible=false,initial=false;
        
        window.addEventListener("message",(e=>{
          if(e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type){
            if("init"===e.data.action){
              initial=true;
              wrapDiv.classList.toggle("show",initial);
            } else if("show"===e.data.action){
              visible=true;
              wrapDiv.classList.toggle("expand",visible);
            } else if("hide"===e.data.action){
              visible=false;
              wrapDiv.classList.toggle("expand",visible);
            }
          }
        }));
        
        container.appendChild(iframe);
        wrapDiv.appendChild(stylesheet);
        wrapDiv.appendChild(container);
        document.body.appendChild(wrapDiv);
      }(globalThis);
    `;
    
    document.head.appendChild(script);
  }, [isInitialized]);

  // Envoyer un message à HeyGen
  const sendMessage = useCallback((message: string) => {
    setMessages(prev => [...prev, message]);
    
    // Ici, on pourrait implémenter l'envoi réel du message à HeyGen
    // Pour l'instant, on simule juste l'ajout du message
    console.log('Message envoyé à HeyGen:', message);
  }, []);

  // Basculer la visibilité
  const toggleVisibility = useCallback(() => {
    const embedElement = document.getElementById('heygen-streaming-embed');
    if (embedElement) {
      if (isVisible) {
        embedElement.style.display = 'none';
        setIsVisible(false);
      } else {
        embedElement.style.display = 'block';
        setIsVisible(true);
      }
    }
  }, [isVisible]);

  // Nettoyer les ressources
  const cleanup = useCallback(() => {
    const embedElement = document.getElementById('heygen-streaming-embed');
    if (embedElement) {
      embedElement.remove();
    }
    setIsInitialized(false);
    setIsVisible(false);
    setIsExpanded(false);
    setMessages([]);
  }, []);

  // Écouter les messages HeyGen
  useEffect(() => {
    window.addEventListener('message', handleHeyGenMessage);
    return () => {
      window.removeEventListener('message', handleHeyGenMessage);
    };
  }, [handleHeyGenMessage]);

  // Nettoyer au démontage
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    isInitialized,
    isVisible,
    isExpanded,
    messages,
    initializeHeyGen,
    sendMessage,
    toggleVisibility,
    cleanup
  };
};

export default useHeyGen;