import React, { useEffect, useRef, useState } from 'react';

interface HeyGenAvatarProps {
  className?: string;
}

const HeyGenAvatar: React.FC<HeyGenAvatarProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const [isFullscreen, setIsFullscreen] = useState(false);


  // Fonction pour basculer le mode plein écran natif
  const toggleFullscreen = async () => {
    const embedElement = document.getElementById('heygen-streaming-embed');
    if (!embedElement) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await embedElement.requestFullscreen();
      }
    } catch (error) {
      console.warn('Erreur lors du basculement en plein écran:', error);
    }
  };

  // Gérer les changements d'état du plein écran natif
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    // Éviter le double chargement du script
    if (scriptLoaded.current) return;
    
    // Vérifier si le script est déjà présent
    const existingEmbed = document.getElementById('heygen-streaming-embed');
    if (existingEmbed) {
      existingEmbed.remove();
    }



    // Créer le conteneur personnalisé pour l'intégration rectangulaire
    const createCustomHeyGenEmbed = () => {
      const host = "https://labs.heygen.com";
      const url = host + "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiI0MTY1MWNiMGJmYWU0MzQyODgyZTc1MDNm%0D%0AMzI3MGYyYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0ALzQxNjUxY2IwYmZhZTQzNDI4ODJlNzUwM2YzMjcwZjJjL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0%0D%0ALndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6Ijg3%0D%0ANGQ1NTY5ZTIwYzQzNDdiZjc1ZjM0YzVlODhjNmY2IiwidXNlcm5hbWUiOiI2ZTMzNDY2YzU0NWM0%0D%0AOGE1Yjg0ZjNhMTI2NGVhZTgxNSJ9&inIFrame=1";
      
      // Créer le conteneur principal
      const wrapDiv = document.createElement("div");
      wrapDiv.id = "heygen-streaming-embed";
      
      // Créer le conteneur interne
      const container = document.createElement("div");
      container.id = "heygen-streaming-container";
      
      // Styles personnalisés pour l'intégration rectangulaire
      const stylesheet = document.createElement("style");
      stylesheet.innerHTML = `
        #heygen-streaming-embed {
          position: relative;
          width: 100%;
          height: 300px;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 78, 59, 0.1) 100%);
          opacity: 1;
          visibility: visible;
          transition: all 0.3s ease-in-out;
        }
        #heygen-streaming-embed:fullscreen {
           width: 100vw;
           height: 100vh;
           border-radius: 0;
           border: none;
           background: #000;
           display: flex;
           align-items: center;
           justify-content: center;
         }
         #heygen-streaming-embed:-webkit-full-screen {
           width: 100vw;
           height: 100vh;
           border-radius: 0;
           border: none;
           background: #000;
           display: flex;
           align-items: center;
           justify-content: center;
         }
         #heygen-streaming-embed:-moz-full-screen {
           width: 100vw;
           height: 100vh;
           border-radius: 0;
           border: none;
           background: #000;
           display: flex;
           align-items: center;
           justify-content: center;
         }
         #heygen-streaming-embed:-ms-fullscreen {
           width: 100vw;
           height: 100vh;
           border-radius: 0;
           border: none;
           background: #000;
           display: flex;
           align-items: center;
           justify-content: center;
         }
        #heygen-streaming-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        #heygen-streaming-container iframe {
          width: 100%;
          height: 100%;
          border: 0;
          border-radius: 10px;
          z-index: 10;
          position: relative;
          pointer-events: auto;
        }
        /* Masquer tous les écrans de chargement/initialisation HeyGen */
        #heygen-streaming-container iframe::part(initial-screen),
        #heygen-streaming-container iframe::part(loading-overlay),
        #heygen-streaming-container iframe::part(preloader) {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
        /* Styles pour forcer l'affichage immédiat du contenu */
        #heygen-streaming-container iframe {
          background: transparent !important;
        }
        /* Masquer les overlays de chargement via sélecteurs génériques */
        #heygen-streaming-embed [class*="loading"],
        #heygen-streaming-embed [class*="initial"],
        #heygen-streaming-embed [class*="overlay"],
        #heygen-streaming-embed [class*="preloader"],
        #heygen-streaming-embed [id*="loading"],
        #heygen-streaming-embed [id*="initial"],
        #heygen-streaming-embed [id*="overlay"],
        #heygen-streaming-embed [id*="preloader"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
        #heygen-streaming-embed:fullscreen #heygen-streaming-container {
           width: 100%;
           height: 100%;
           max-width: none;
           max-height: none;
         }
         #heygen-streaming-embed:fullscreen #heygen-streaming-container iframe,
         #heygen-streaming-embed:-webkit-full-screen #heygen-streaming-container iframe,
         #heygen-streaming-embed:-moz-full-screen #heygen-streaming-container iframe,
         #heygen-streaming-embed:-ms-fullscreen #heygen-streaming-container iframe {
           border-radius: 0;
           width: 100%;
           height: 100%;
         }
         .fullscreen-button {
           position: absolute;
           top: 8px;
           right: 8px;
           z-index: 21;
           background: rgba(0, 0, 0, 0.6);
           backdrop-filter: blur(4px);
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 8px;
           padding: 8px;
           color: white;
           cursor: pointer;
           transition: all 0.2s ease;
           display: flex;
           align-items: center;
           justify-content: center;
         }
         .fullscreen-button:hover {
           background: rgba(0, 0, 0, 0.8);
           transform: scale(1.05);
         }
         .fullscreen-button:focus {
           outline: 2px solid #10b981;
           outline-offset: 2px;
         }
         #heygen-streaming-embed:fullscreen .fullscreen-button,
          #heygen-streaming-embed:-webkit-full-screen .fullscreen-button,
          #heygen-streaming-embed:-moz-full-screen .fullscreen-button,
          #heygen-streaming-embed:-ms-fullscreen .fullscreen-button {
            top: 16px;
            right: 16px;
            background: rgba(0, 0, 0, 0.8);
            z-index: 22;
          }
        /* Styles supprimés - plus d'indicateur de chargement personnalisé */
      `;
      
      // Créer l'iframe
      const iframe = document.createElement("iframe");
      iframe.allowFullscreen = true;
      iframe.title = "Guide IA Interactif";
      iframe.role = "dialog";
      iframe.allow = "microphone; fullscreen";
      iframe.src = url;
      

      
      // Assembler les éléments
      container.appendChild(iframe);
      wrapDiv.appendChild(stylesheet);
      wrapDiv.appendChild(container);
      
      // Ajouter l'attribut allowfullscreen à l'iframe
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('webkitallowfullscreen', 'true');
      iframe.setAttribute('mozallowfullscreen', 'true');

      // Ajouter au conteneur de référence au lieu du body
      if (containerRef.current) {
        containerRef.current.appendChild(wrapDiv);
      }
    };

    // Délai pour s'assurer que le DOM est prêt
    setTimeout(createCustomHeyGenEmbed, 100);
    scriptLoaded.current = true;

    // Cleanup function
    return () => {
      const embedElement = document.getElementById('heygen-streaming-embed');
      if (embedElement) {
        embedElement.remove();
      }
      // Sortir du plein écran si actif
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

    };
  }, []);

  return (
    <div className={`heygen-avatar-container ${className}`}>
      {/* Conteneur pour l'intégration HeyGen */}
      <div 
        ref={containerRef}
        className="relative w-full h-[300px] overflow-hidden rounded-lg"
      >

        {/* Bouton plein écran */}
         <button
           onClick={toggleFullscreen}
           className="fullscreen-button"
           title={isFullscreen ? "Quitter le plein écran (Échap)" : "Plein écran"}
           aria-label={isFullscreen ? "Quitter le plein écran" : "Passer en plein écran"}
         >
          {isFullscreen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>
        {/* Le script créera automatiquement l'interface ici */}
      </div>
      

    </div>
  );
};

export default HeyGenAvatar;