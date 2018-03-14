package com.populisrh.dadosesocial;


import java.util.Map;

import javax.sound.midi.Synthesizer;

import org.json.simple.JSONArray;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;

public class Email {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Funcionario funcionario = new Funcionario();
	SendEmailHtml sendEmailHtml = new SendEmailHtml();
	TemplateEmail templateEmail = new TemplateEmail(); 

	@SuppressWarnings("rawtypes")
	public String mandaEmailGeral(MongoClient mongo) {

		JSONArray emails = commons_db.getCollectionListaNoKey("emails", mongo, false);
		
		for (int i = 0; i < emails.size(); i++) {
			BasicDBObject email = new BasicDBObject();
			email.putAll((Map) emails.get(i));
			BasicDBObject funcionarioDoc = commons_db.getCollectionDoc(email.getString("matricula"), "funcionarios", "documento.matricula", mongo, false);
			funcionario.emailInicial("eSocial EMAE – Reveja suas informações", email.getString("matricula"), email, funcionarioDoc, mongo);
		};
		
		return "success";
			
	};
	
	
	
};
