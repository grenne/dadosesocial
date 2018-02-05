package com.populisrh.dadosesocial;


import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/rest")
public class ApplicationConfig extends Application {

    public Set<Class<?>> getClasses() {
        return new HashSet<Class<?>>(Arrays.asList(
           		Rest_Crud.class,
           		Rest_UploadFiles.class,
           		Rest_Email.class,
           		Rest_Funcionario.class
           	        		));
    }

}
