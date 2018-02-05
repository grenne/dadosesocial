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
	
	
	
};
