( () => {

    let container = document.querySelector( '#container' );
    let content = '';
    let db = '';
    let xhr = new XMLHttpRequest();

    xhr.open( 'GET', 'databases/database.json' );

    xhr.onload = () => {

        if ( xhr.status >= 200 && xhr.status < 400 ) {
            console.log( xhr.responseText );
            db = formatResponseText( xhr.responseText );
            console.log( db );
            db = JSON.parse( db );
            console.log( db );
            renderHTML();
        }
        else {
            console.log( 'Server error' );
        }

    }

    xhr.send();

    const formatResponseText = ( responseText ) => {

        return responseText.replace( /\s+/g, ' ' )
                .replace( /\&nbsp\;+/g, ' ' )
                .replace( //g, '-' )
                .replace( /–/g, '-' )
                .replace( //g, "'" )
                .replace( //g, "'" )
                .replace( /“/g, "'" )
                .replace( /”/g, "'" )
                .replace( /\\n\\n+\s*[\\n\\n|\\n]*/g, '\\n' )
                .replace( /\\n+\s*[\\n\\n|\\n]*/g, '\\n' );

    }

    const renderHTML = () => {

        db = db.filter( ( question, index ) =>
                db.findIndex( q =>
                        q.pergunta.replace( /_+/g, '' ).toUpperCase()
                        === question.pergunta.replace( /_+/g, '' ).toUpperCase() )
                === index );

        console.log( db );

        for ( let i = 0; i < db.length; i++ ) {
            db[i].pergunta = db[i].pergunta.replace( /\n+/g, '<br>' );
            db[i].alternativas = db[i].alternativas.replace( /\n+/g, '<br>' );
            db[i].resposta= db[i].resposta.replace( /\.+\s*\.*/g, '. ' ).replace( /\n+/g, '<br>' );

            content += '<div class="question">'
                    + `<span>${ i + 1 }.</span>`
                    + `<p>${ db[i].pergunta }</p>`
                    + ( db[i].imagem === '' ? '' : `<img src="${ db[i].imagem }">` )
                    + `<p>${ db[i].alternativas }</p>`
                    + `<p>${ db[i].resposta }</p>`
                    + '</div>';
        }

        console.log( content );
        container.insertAdjacentHTML( 'beforeend', content );

    }

})();
