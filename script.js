// Obtener los elementos del DOM
const fileInput = document.getElementById('fileInput');
const sendButton = document.getElementById('sendButton');
const receiveCodeInput = document.getElementById('receiveCodeInput');
const receiveButton = document.getElementById('receiveButton');
const codeDisplay = document.getElementById('code-display');

// Agregar evento de envío de archivo
sendButton.addEventListener('click', () => {
	// Generar un código aleatorio
	const code = generateCode();
	codeDisplay.textContent = `Código de envío: ${code}`;
	
	// Leer el archivo seleccionado
	const file = fileInput.files[0];
	const fileReader = new FileReader();
	fileReader.onload = event => {
		// Enviar el archivo al otro peer
		const peerConnection = new RTCPeerConnection();
		const dataChannel = peerConnection.createDataChannel('fileTransfer');
		dataChannel.send(event.target.result);
		
		// Enviar el código de envío al servidor de señalización
		socket.emit('code', code);
	};
	fileReader.readAsArrayBuffer(file);
});

// Agregar evento de recepción de archivo
receiveButton.addEventListener('click', () => {
	const code = receiveCodeInput.value.trim();
	socket.emit('receive', code);
});

// Función para generar un código aleatorio
function generateCode() {
	return Math.random().toString(36).substr(2, 6);
}
