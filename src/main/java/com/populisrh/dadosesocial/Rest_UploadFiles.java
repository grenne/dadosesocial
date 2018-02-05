package com.populisrh.dadosesocial;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Map;

import javax.activation.MimetypesFileTypeMap;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;

	
@Singleton
// @Lock(LockType.READ)
@Path("/upload")

public class Rest_UploadFiles {
	/**
	 * Procura a imagem pelo seu nome e devolve como resposta.
	 * @author magician
	 *
     * Devolve a imagem com o mime type do ficheiro ou 404 caso
     * o ficheiro n�o seja encontrada.
     * @param image nome da imagem a procurar
     * @return imagem com o mime type da imagem fonte.
     */
	@GET
	@Path("/images")
    @Produces("image/*")
    public Response getImage(@QueryParam("image") String image){

		String folder = "c:/images/esocial/";
        
		File target = new File(folder + image);
        if(!target.exists()){
        	System.out.println("imagem inexistente:" + folder + image);
//            throw new WebApplicationException(404);
        }
        String mt = new MimetypesFileTypeMap().getContentType(target);
        return Response.ok(target, mt).build();
    };
 
	@POST
	@Path("/files")
	@Consumes("multipart/form-data")
	public Response uploadFile(MultipartFormDataInput input, @QueryParam("prefix") String prefix) {
		String folder = "c:/images/esocial/";
		String fileName = "";
		Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
		List<InputPart> inputParts = uploadForm.get("uploadedFile");
		for (InputPart inputPart : inputParts) {

			try {

				MultivaluedMap<String, String> header = inputPart.getHeaders();
				fileName = prefix + "_" + getFileName(header);

				//convert the 	uploaded file to inputstream
				InputStream inputStream = inputPart.getBody(InputStream.class,null);

				byte [] bytes = IOUtils.toByteArray(inputStream);
				
				//constructs upload file path
				fileName = folder + fileName;
				
				writeFile(bytes,fileName);
				
				System.out.println("Done");

			} catch (IOException e) {
				e.printStackTrace();
			}

		}

		return Response.status(200)
				.entity("uploadFile is called, Uploaded file name : " + fileName).build();

	}

	/**
	 * header sample
	 * {
	 * 		Content-Type=[image/png], 
	 * 		Content-Disposition=[form-data; name="file"; filename="filename.extension"]
	 * }
	 **/
	//get uploaded filename, is there a easy way in RESTEasy?
	private String getFileName(MultivaluedMap<String, String> header) {

		String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
		
		for (String filename : contentDisposition) {
			if ((filename.trim().startsWith("filename"))) {

				String[] name = filename.split("=");
				
				String finalFileName = name[1].trim().replaceAll("\"", "");
				return finalFileName;
			}
		}
		return "unknown";
	}

	//save to somewhere
	private void writeFile(byte[] content, String filename) throws IOException {

		File file = new File(filename);

		if (!file.exists()) {
			file.createNewFile();
		}

		FileOutputStream fop = new FileOutputStream(file);

		fop.write(content);
		fop.flush();
		fop.close();

	};

}
