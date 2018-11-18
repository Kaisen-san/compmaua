const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.set( 'views', path.join( __dirname, 'views' ) );

app.set( 'view engine', 'ejs' );


app.get( '/', ( req, res ) => res.render( 'pages/index' ) );

app.get( '/arquitetura/k1', ( req, res ) => res.render( 'pages/quiz', { subject: 'arquitetura', quizName: 'k1' } ) );

app.get( '/arquitetura/k2', ( req, res ) => res.render( 'pages/quiz', { subject: 'arquitetura', quizName: 'k2' } ) );

app.get( '/arquitetura/k3', ( req, res ) => res.render( 'pages/quiz', { subject: 'arquitetura', quizName: 'k3' } ) );

app.get( '/arquitetura/k4', ( req, res ) => res.render( 'pages/quiz', { subject: 'arquitetura', quizName: 'k4' } ) );

app.get( '/so/k1', ( req, res ) => res.render( 'pages/quiz', { subject: 'so', quizName: 'k1' } ) );

app.get( '/so/k2', ( req, res ) => res.render( 'pages/quiz', { subject: 'so', quizName: 'k2' } ) );


app.listen( PORT, () => console.log( `Listening on ${ PORT }` ) );