function ToBlob(base64) {

    // Decodificar el base64 a un array de bytes
    const byteCharacters = atob(base64);

    // Convertir a array de bytes
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // Crear un blob con el tipo adecuado
    const blob = new Blob([new Uint8Array(byteNumbers)], { type: 'image/jpeg' });

    return blob;
}

export default ToBlob;