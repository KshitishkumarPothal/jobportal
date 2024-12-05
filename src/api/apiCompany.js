import supabaseClient from "@/utils/superbase";

export async function getCompany(token) {

    const superbase = await supabaseClient(token);
    const {data, error} = await superbase.from("companies").select("*");
 

    if (error){
      console.error("Error on fatching Saved jobs", error);
      return null;
    }

    return data;
    
}