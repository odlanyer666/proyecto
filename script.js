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

// Agregar evento de recepción de archivo desde el servidor
socket.on('startTransfer', () => {
	console.log('Inicio de transferencia de archivo');
	
	// Crear un nuevo peer connection
	const peerConnection = new RTCPeerConnection();
	
	// Crear un nuevo data channel
	const dataChannel = peerConnection.createDataChannel('fileTransfer');
	
	// Agregar evento de recepción de datos
	dataChannel.onmessage = event => {
		const fileBuffer = new Uint8Array(event.data);
		const file = new Blob([fileBuffer], { type: 'application/octet-stream' });
		const url = URL.createObjectURL(file);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'received_file.txt'; // Cambiar el nombre del archivo según sea necesario
		a.click();
	};
	
	// Agregar evento de apertura del data channel
	dataChannel.onopen = () => {
		console.log('Data channel abierto');
	};
	
	// Agregar evento de cierre del data channel
	dataChannel.onclose = () => {
		console.log('Data channel cerrado');
	};
function generateCode() {
	return Math.random().toString(36).substr(2, 6);
}
});
