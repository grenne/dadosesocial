package com.populisrh.dadosesocial;


import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

public class SendEmailHtml {
	
	public void sendEmailHtml(String to, String subject, String html){
	    
		HtmlEmail email = new HtmlEmail();
		
		try {
			email.setHostName("smtp.gmail.com");
			email.setSmtpPort(587);
			email.setAuthenticator(new DefaultAuthenticator("noreplay@populisrh.com", "gafe#4169"));
			email.setStartTLSEnabled(true);
			email.setFrom("grenne@populisrh.com");
			email.setSubject(subject);
			email.setHtmlMsg(html);
			email.addTo(to);
			email.send();
			email.setTextMsg("Your email client does not support HTML messages");
		} catch(EmailException ee) {
		    ee.printStackTrace();
		}

	};
};