let attempt = document.getElementById( "COLE_O_ID_AQUI" ).firstChild;
let questionsList = [];

const getImage = node => {

	let img = '';

	if ( !node ) {
		return;
	}

	if ( node.tagName === "IMG" ) {
		img = node.src;
	}

	for ( let i = 0; i < node.childNodes.length; i++ ) {
		img += getImage( node.childNodes[i] );
	}

	return img;

}

for ( let i = 1; i < attempt.childNodes.length; i++ ) {
	let question = {};
	let questionNode = document.querySelector( '#q' + i );

	if ( !questionNode ) {
		continue;
	}

	question.pergunta = questionNode.childNodes[1].childNodes[0].childNodes[2].innerText;
	question.imagem = getImage( questionNode.childNodes[1].childNodes[0].childNodes[2] );
	question.alternativas = questionNode.childNodes[1].childNodes[0].childNodes[3].innerText;
	question.resposta = ( questionNode.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
			|| questionNode.childNodes[1].childNodes[1].childNodes[1].childNodes[0] ).innerText;

	questionsList.push( question );
}

JSON.stringify( questionsList );