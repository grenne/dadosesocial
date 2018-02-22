package com.populisrh.dadosesocial;


import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;

public class Funcionario {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	SendEmailHtml sendEmailHtml = new SendEmailHtml();
	TemplateEmail templateEmail = new TemplateEmail(); 
	
	public String emailRejeicao(String subject, String matricula, BasicDBObject email, BasicDBObject funcionario, String motivo, MongoClient mongo) {

		String conteudo = "<h1>Prezado(a) " + email.get("nome").toString() + "</h1>";
				conteudo = conteudo + "<p>Após análise de sua qualificação cadastral, o mesmo foi rejeitado pelos seguintes itens:</p>";
				conteudo = conteudo + "<p><b>Motivo: </b>" + motivo + "</p>";
				conteudo = conteudo + "<p>Pedimos acessar o link abaixo para realizar a correção da informação.</p>";
				conteudo = conteudo + "<p style=\"margin-left:50px;\"><a href=\"http://52.41.8.255:8080/dadosesocial/\" target=\"_blank\" style=\"color:#416b96;\" title=\"Saneamento dados ESocial\">Saneamento dados ESocial</a></p>";
				
				
		sendEmailHtml.sendEmailHtml(email.get("email").toString(), subject, templateEmail.emailEnviar(conteudo));
		
		return email.get("email").toString();
			
	};
	
	public String emailInicial(String subject, String matricula, BasicDBObject email, BasicDBObject funcionario, MongoClient mongo) {

		String conteudo = "<h1 style=\"color:darkgrey;font-size:18px\">Prezado(a) " + email.get("nome").toString() + "</h1><br>";
				conteudo = conteudo + "<p style=\"color:orange;font-size:16px\">Você já ouviu falar no eSocial?</p>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">O eSocial é um sistema de escrituração digital das obrigações fiscais, previdenciárias e trabalhistas. Ele ficou conhecido por estender aos trabalhadores domésticos direitos trabalhistas que eram exclusivos dos trabalhadores urbanos e rurais mas também tem como objetivo unificar a prestação de informações pelo empregador em relação aos seus empregados.</p><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Quando começar a funcionar efetivamente, todas as informações do trabalhador como cadastramento, vínculos, licenças, exames ocupacionais, contribuições previdenciárias e folha de pa​gamento, entre outros, serão acessadas pela Caixa Econômica Federal, INSS, Ministério do Trabalho e da Previdência Social e Receita Federal do Brasil via eSocial.</p><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">O eSocial mudará processos de diversas áreas como Saúde e Segurança, Recursos Humanos, Suprimentos, Jurídico, que precisarão ser mais rigorosos com prazos e procedimentos para evitar multas e exposição da nossa empresa junto ao Governo Federal.</p><br>";
				conteudo = conteudo + "<p style=\"color:orange;font-size:16px\">O que precisa ser feito agora?</p>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">As áreas impactadas já estão trabalhando para adequação ao novo sistema. Além disso, todos os empregados da EMAE devem acessar suas informações no <a href=\"http://52.41.8.255:8080/dadosesocial/\" target=\"_blank\" style=\"color:#416b96;\" title=\"link\">link</a> e confirmar os dados pessoais.</p><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Seu login de acesso e senha para acesso ao portal são:</p><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Login: " + matricula + "</p><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Senha: mudar@123</p><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">O RH entrará em contato com os empregados que estão com inconformidades, por e-mail ou via gestores, para atualização dos dados. <span style=\"color:darkgrey;font-size:13px;text-decoration: underline\">Contamos com os líderes para facilitarem o acesso à computadores e/ou orientarem suas equipes a fazerem a confirmação dos dados.</span></p><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Esse processo de qualificação cadastral tem que ser feito até o fim de <span style=\"color:darkgrey;font-size:13px;font-weight:bold;text-decoration: underline\">9 de março de 2018.</span></p><br>";
				
				
		sendEmailHtml.sendEmailHtml(email.get("email").toString(), subject, templateEmail.emailEnviar(conteudo));
		
		return email.get("email").toString();
			
	};
	
	
	
};
