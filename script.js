// Obtener el input de archivo, el botón de envío, el input de código de recepción y el parágrafo de código de envío
const fileInput = document.getElementById('fileInput');
const sendButton = document.getElementById('sendButton');
const receiveCodeInput = document.getElementById('receiveCodeInput');
const codeDisplay = document.getElementById('code-display');

// Generar un código aleatorio
const code = generateCode();

// Mostrar el código de envío en el parágrafo y el input de código de recepción
codeDisplay.textContent = `Código de envío: ${code}`;
receiveCodeInput.value = code;

// Agregar evento de envío de archivo
sendButton.addEventListener('click', () => {
	// Leer el archivo seleccionado
	const file = fileInput.files[0];
	const fileReader = new FileReader();
	fileReader.onload = event => {
		// Enviar el archivo al otro peer
		const peerConnection = new RTCPeerConnection();
		const dataChannel = peerConnection.createDataChannel('fileTransfer');
		dataChannel.send(event.target.result);
	};
	fileReader.readAsArrayBuffer(file);
});

// Función para generar un código aleatorio
function generateCode() {
	return Math.random().toString(36).substr(2, 6);
}
