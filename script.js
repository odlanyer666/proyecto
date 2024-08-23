// Obtener el input de archivo y el botón de envío
const fileInput = document.getElementById('fileInput');
const sendButton = document.getElementById('sendButton');
const codeDisplay = document.getElementById('code-display');

// Generar un código aleatorio
const code = generateCode();
codeDisplay.textContent = `Código de envío: ${code}`;

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
		
		// Enviar el código de envío al servidor de señalización
		socket.emit('code', code);
	};
	fileReader.readAsArrayBuffer(file);
});

// Función para generar un código aleatorio
function generateCode() {
	return Math.random().toString(36).substr(2, 6);
}
