// app.js - Lógica del Cliente y Control de Pestañas
function switchTab(tabId) {
    ['camara', 'mapa', 'checklist'].forEach(t => {
        const sec = document.getElementById(`tab-${t}`);
        if(sec) sec.classList.add('hidden');
        const btn = document.getElementById(`nav-${t}`);
        if(btn) btn.className = "px-3 py-2 rounded-lg transition text-gray-300 hover:text-white";
    });

    const activeSec = document.getElementById(`tab-${tabId}`);
    if(activeSec) activeSec.classList.remove('hidden');
    
    const activeBtn = document.getElementById(`nav-${tabId}`);
    if(activeBtn) activeBtn.className = "px-3 py-2 rounded-lg transition bg-red-600 text-white shadow";
}

let isCamActive = false;
let webcamStream = null;

async function toggleWebcam() {
    const video = document.getElementById('user-video');
    const simView = document.getElementById('simulated-view');
    const btn = document.getElementById('webcam-btn');

    if (!isCamActive) {
        try {
            webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = webcamStream;
            video.classList.remove('hidden');
            simView.classList.add('hidden');
            btn.innerText = "Apagar Cámara Web";
            isCamActive = true;
        } catch (e) {
            alert("No se pudo activar la cámara web.");
        }
    } else {
        if (webcamStream) webcamStream.getTracks().forEach(t => t.stop());
        video.classList.add('hidden');
        simView.classList.remove('hidden');
        btn.innerText = "Encender Cámara Web";
        isCamActive = false;
    }
}

function simulateDetection(species) {
    alert(`[IA SIMULACIÓN] Detección exitosa de ${species} con 99.4% de confianza.`);
}