const fs = require('fs');

const getQuestions = ( subject, quizName, callback ) => {

    fs.readFile( `databases/${ subject }/${ quizName }.json`, 'utf8', ( err, data ) => {
        if ( err ) {
            throw new Error( err );
        }

        let questions = JSON.parse( formatRawData( data ) );
        callback( subject, quizName, questions );
    });

}

const formatRawData = ( data ) => {

    return data.replace( /\s+/g, ' ' )
            .replace( /\&nbsp\;+/g, ' ' )
            .replace( //g, '-' )
            .replace( /–/g, '-' )
            .replace( //g, "'" )
            .replace( //g, "'" )
            .replace( //g, "'")
            .replace( /“/g, "'" )
            .replace( /”/g, "'" )
            .replace( /\\n\\n+\s*[\\n\\n|\\n]*/g, '\\n' )
            .replace( /\\n+\s*[\\n\\n|\\n]*/g, '\\n' );

}

const distinctQuestions = questions => {

    return questions.filter( ( question, index ) =>
            questions.findIndex( q =>
                        q.pergunta.replace( /_+/g, '' )
                                .replace( /\\n+/g, '' )
                                .replace( /\s+/g, '' )
                                .toUpperCase()
                        === question.pergunta.replace( /_+/g, '' )
                                .replace( /\\n+/g, '' )
                                .replace( /\s+/g, '' )
                                .toUpperCase() )
            === index );

}

const buildPartial = ( subject, partialName, questions ) => {

    let content = '';

    let uniqueQuestions = distinctQuestions( questions );

    uniqueQuestions.forEach( ( q, i ) => {
        q.pergunta = q.pergunta.replace( /\n+/g, '<br>' );
        q.alternativas = q.alternativas.replace( /\n+/g, '<br>' );
        q.resposta= q.resposta.replace( /\.+\s*\.*/g, '. ' ).replace( /\n+/g, '<br>' );

        content += '<div class="question">'
                + `<span>${ i + 1 }.</span>`
                + `<p>${ q.pergunta }</p>`
                + ( q.imagem ? `<img src="${ q.imagem }">` : '' )
                + `<p>${ q.alternativas }</p>`
                + `<p>${ q.resposta }</p>`
                + '</div>';
    });

    writePartial( subject, partialName, content );

}

const writePartial = ( subject, partialName, content ) => {

    fs.writeFile( `views/partials/${ subject }/${ partialName }.ejs`, content, ( err ) => {
        if ( err ) {
            throw new Error( err );
        }

        console.log( `File ${ partialName } from ${ subject } recorded successfully!` );
    } );

}

// getQuestions( 'arquitetura', 'k1', buildPartial );

// getQuestions( 'arquitetura', 'k2', buildPartial );

getQuestions( 'arquitetura', 'k3', buildPartial );

getQuestions( 'arquitetura', 'k4', buildPartial );

// getQuestions( 'so', 'k1', buildPartial );

// getQuestions( 'so', 'k2', buildPartial );

/**
 * NOTE:
 *      Moodles que contém imagens precisam ter elas baixadas e adicionadas a
 *      pasta images (no k específico). Além disso, o partial gerado deve ter
 *      os img[src] modificados para o path dentro da pasta images. O arquivo
 *      inject.js apenas salva o img[src] que vem no Moodle, o trabalho de
 *      baixar e dar um nome a imagem tem de ser feito manualmente.
 */