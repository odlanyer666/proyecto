const codeInput = document.getElementById('codeInput');
const receiveButton = document.getElementById('receiveButton');

receiveButton.addEventListener('click', () => {
	const code = codeInput.value.trim();
	socket.emit('receive', code);
});

socket.on('startTransfer', () => {
	console.log('Inicio de transferencia de archivo');
	// Aquí puedes agregar la lógica para recibir el archivo
});
