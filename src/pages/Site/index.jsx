
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './assets/css/main.css';
import './assets/css/noscript.css';
import GeralContext from '../../contexts/geral';

import pic01 from './images/pic01.jpg';
import logo from './images/papya_branco.png';

export default function Suporte() {
    const { tipoUsuario, setTipoUsuario } = useContext(GeralContext);

    const history = useHistory();

    return (
        <html>
	<head>
		<title>Photon by HTML5 UP</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
	</head>
	<body class="is-preload">

		{/* <!-- Header --> */}
			<section id="header">
				<div class="inner">
					<span ><img src={logo} alt="" width="300" height="105" /></span>
					<h1>Olá, Somos o <strong>Papya</strong><br />
					Rede social de atendimento.</h1>
					<p>Transforme seu estabelecimento em uma rede social.</p>
					
					<ul class="actions special">
						<li><a href="#one" class="botao1 button scrolly">Descubra</a></li>
					</ul>
				</div>
			</section>

		{/* <!-- One --> */}
			<section id="one" class="main style1">
				<div class="container">
					<div class="row gtr-150">
						<div class="col-6 col-12-medium">
							<header class="major">
								<h2>Rede social<br />
								ou Aplicativo de atendimento?</h2>
							</header>
							<p>Olá amantes de um bom atendimento, este aplicativo é pra vocês! Acesse o cardápio digital, acompanhe os gastos, convide amigos à mesa e dívida a conta automaticamente. <br /> O papya chegou pra trazer facilidade e comodidade, e se você quiser, ainda pode espiar nossa rede social e saber o que está rolando em outros estabelecimentos parceiros. </p>
						</div>
						<div class="col-6 col-12-medium imp-medium">
							<span class="image fit"><img src={pic01} alt="" /></span>
						</div>
					</div>
				</div>
			</section>

		{/* <!-- Two --> */}
			<section id="two" class="main style2">
				<div class="container">
					<div class="row gtr-150">
						<div class="col-6 col-12-medium">
							<ul class="major-icons">
								<li><span class="icon solid style1 major fa-shopping-cart"></span></li>
								<li><span class="icon solid style2 major fa-map-marked"></span></li>
								<li><span class="icon solid style3 major fa-users"></span></li>
								<li><span class="icon solid style4 major fa-file-invoice-dollar"></span></li>
								<li><span class="icon solid style6 major fa-hand-holding-usd"></span></li>
								<li><span class="icon solid style5 major fa-comments"></span></li>
							</ul>
						</div>
						<div class="col-6 col-12-medium">
							<header class="major">
								<h2>Principais funcionalidades<br />
								</h2>
							</header>
							<p>Que tal estar em um estabelecimento parceiro do papya e ter acesso ao cardápio digital com todos os detalhes necessários.</p>
							<p>Encontre estabelecimentos próximos, veja as promoções e a classificação.</p>
							<p>Faça pedidos, acompanhe o status e os gastos da sua mesa.<br /> Acompanhe os gastos dos lugares que você frequenta.</p>
							<p>Convide amigos para entrar na sua conta e eles poderão fazer pedidos e acompanhar o que cada um pediu, no final pague a conta separadamente sem precisar ficar calculando o que cada um consumiu.</p>
							<p>Acesso nossa rede social e converse com pessoas onde você está ou em outros estabelecimentos.</p>
						</div>
					</div>
				</div>
			</section>

		{/* <!-- Three --> */}
			<section id="three" class="main style1 special">
				<div class="container">
					<header class="major">
						<h2>Benefícios para o estabelecimento</h2>
					</header>
					<p>Listamos aqui alguns benefícios de ser um estabelecimento parceiro Papya.</p>
					<div class="row gtr-150">
						<div class="col-4 col-12-medium">
							<span class="image fit"><img src="images/pic02.jpg" alt="" /></span>
							<h3>Agilidade</h3>
							<p>O garçom terá mais agilidade para entregar os pedidos sem perder tempo entregando o cardápio e esperando o cliente escolher.</p>
							<ul class="actions special">
								<li><a href="#" class="button">More</a></li>
							</ul>
						</div>
						<div class="col-4 col-12-medium">
							<span class="image fit"><img src="images/pic03.jpg" alt="" /></span>
							<h3>Cardápio mais atrativo</h3>
							<p>Um cardápio digital e dinâmico faz estimula o interesse do cliente, adicione imagens atrativas e chame mais atenção.</p>
							<ul class="actions special">
								<li><a href="#" class="button">More</a></li>
							</ul>
						</div>
						<div class="col-4 col-12-medium">
							<span class="image fit"><img src="images/pic04.jpg" alt="" /></span>
							<h3>Gestão dos pedidos</h3>
							<p>Através de um painel é possível saber tudo que os clientes estão pedindo, acompanhar a agilidade do preparo e entrega.</p>
							<ul class="actions special">
								<li><a href="#" class="button">More</a></li>
							</ul>
						</div>
					</div>
				</div>
			</section>

		{/* <!-- Four --> */}
			<section id="four" class="main style2 special">
				<div class="container">
					<header class="major">
						<h2>Baixe nosso aplicativo</h2>
					</header>
					<p>Google Play e App Store</p>
					<ul class="actions special">
					<li><span class="fab major fa-google-play"  style={{ fontSize: '40px'}} ></span></li>
					<li><span class="fab major fa-app-store-ios"  style={{ fontSize: '40px'}} ></span></li>
					</ul>
				</div>
			</section>
		{/* <!-- Footer --> */}
			<section id="footer">
				<ul class="icons">
					<li><a href="#" class="icon brands alt fa-twitter"><span class="label">Twitter</span></a></li>
					<li><a href="#" class="icon brands alt fa-facebook-f"><span class="label">Facebook</span></a></li>
					<li><a href="#" class="icon brands alt fa-instagram"><span class="label">Instagram</span></a></li>
					<li><a href="#" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>
					<li><a href="#" class="icon solid alt fa-envelope"><span class="label">Email</span></a></li>
				</ul>
				<ul class="copyright">
					<li>&copy; Tingle digital</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
				</ul>
			</section>

		{/* <!-- Scripts --> */}
			{/* <script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script> */}

	</body>
 </html>
    );
}