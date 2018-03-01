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
				conteudo = conteudo + "<p>Após análise de sua atualização cadastral, o mesmo foi rejeitado pelos seguintes itens:</p>";
				conteudo = conteudo + "<p><b>Motivo: </b>" + motivo + "</p>";
				conteudo = conteudo + "<p>Pedimos acessar o link abaixo para realizar a correção da informação.</p>";
				conteudo = conteudo + "<p style=\"margin-left:50px;\"><a href=\"http://52.41.8.255:8080/dadosesocial/\" target=\"_blank\" style=\"color:#416b96;\" title=\"Saneamento dados ESocial\">Saneamento dados ESocial</a></p>";
				
				
		sendEmailHtml.sendEmailHtml(email.get("email").toString(), subject, templateEmail.emailEnviar(conteudo));
		
		return email.get("email").toString();
			
	};
	
	public String emailInicial(String subject, String matricula, BasicDBObject email, BasicDBObject funcionario, MongoClient mongo) {

		String conteudo = "<h1 style=\"color:darkgrey;font-size:18px\">Prezado(a) " + email.get("nome").toString() + "</h1><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Conforme divulgado na rede interna da EMAE, você está recebendo o endereço eletrônico, usuário e senha para acessar seus dados cadastrais, que deverão ser validados e, se necessário, corrigidos.</p><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Endereço eletrônico: <a href=\"http://52.41.8.255:8080/dadosesocial/\" target=\"_blank\" style=\"color:#416b96;\" title=\"http://52.41.8.255:8080/dadosesocial/login.html\">http://52.41.8.255:8080/dadosesocial/login.html</a></p><br>";				
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Usuário: " + matricula + "</p>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Senha: mudar@123</p><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Departamento de Desenvolvimento Organizacional e de Recursos Humanos</span></p>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Diretoria Administrativa</p><br><br>";
				conteudo = conteudo + "<p style=\"color:darkgrey;font-size:13px\">Obs.: caso tenha dificuldade de conexão através do endereço acima, este deverá ser copiado em seu navegador de preferência para iniciar o acesso aos seus dados.</p><br>";
				
				
		sendEmailHtml.sendEmailHtml(email.get("email").toString(), subject, templateEmail.emailEnviar(conteudo));
		
		return email.get("email").toString();
			
	};
	
	
	
};
