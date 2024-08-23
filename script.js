// Obtener el input de archivo y el botón de envío
const fileInput = document.getElementById('fileInput');
const sendButton = document.getElementById('sendButton');

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

