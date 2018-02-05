package com.populisrh.dadosesocial;


import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;

	
@Singleton
// @Lock(LockType.READ)
@Path("/funcionario")

public class Rest_Funcionario {

	MongoClient mongo = new MongoClient();
	
	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();
	Funcionario funcionario = new Funcionario();
 	

	@Path("/enviar-email")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String EnviarEmail(@QueryParam("matricula") String matricula, @QueryParam("motivo") String motivo) {
		
		if (matricula == null) {
			System.out.println("Matricula do envio do email nula ");
			mongo.close();
			return  null;
		};
		BasicDBObject email = commons_db.getCollectionDoc(matricula, "emails", "documento.matricula", mongo, false);
		if (email == null) {
			System.out.println("Email da matricula do enviada é inválido");
			mongo.close();
			return  null;
		};
		BasicDBObject funcionarioGet = commons_db.getCollectionDoc(matricula, "funcionarios", "documento.matricula", mongo, false);
		if (funcionarioGet == null) {
			System.out.println("Matricula inexistente");
			mongo.close();
			return  null;
		};
		
		String result = funcionario.emailRejeicao("Reveja suas  informações", matricula, email, funcionarioGet, motivo, mongo);
		mongo.close();
		return "Email enviado para - " + result;

	};

};
