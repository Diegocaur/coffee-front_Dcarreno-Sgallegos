function ToBlob(base64) {

    
    const byteCharacters = atob(base64);

   
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)], { type: 'image/jpeg' });

    return blob;
}

export default ToBlob;