import supabaseClient from "@/utils/superbase";

export async function getJobs(token,{location, company_id,searchQuery}) {
      const superbase = await supabaseClient(token);
      let query = superbase.from("jobs").select("*, company:companies(name, logo_url), saved: saved_job(id)");

      if(location){
        query = query.eq("location",location);
      }
      if(company_id){
        query = query.eq("company_id",company_id);
      }
      if(searchQuery){
        query = query.ilike("title", `%${searchQuery}%`);
      }

      const {data, error} = await query;

      if (error){
        console.error("Error on Fatchnig jobs", error);
        return null;
      }
      return data;
}

// , {location, company_id,searchQuery}



export async function saveJobs(token,{alreadySaved}, saveData) {
  const superbase = await supabaseClient(token);

  if(alreadySaved){
    const {data, error:deleteError} = await superbase
    .from("saved_job")
    .delete()
    .eq("job_id" , saveData.job_id);

    if (deleteError){
      console.error("Error on Deleting Saved jobs", deleteError);
      return null;
    }
    return data;

  }else{
    const {data, error:insertError} = await superbase
    .from("saved_job")
    .insert([saveData])
    .select()

    if (insertError){
      console.log("Error on inserting jobs", insertError);
      return null;
    }
    return data;

  }

}

export async function getSingleJob(token,{job_id}) {

  const superbase = await supabaseClient(token);
  const {data, error} = await superbase
    .from("jobs")
    .select("*, company:companies(name, logo_url), application: applications(*)")
    .eq("id", job_id)
    .single()


  if (error){
    console.error("Error on fatching Saved jobs", error);
    return null;
  }

  return data;
  
}
 

export async function updateHiringStatus(token,{job_id}, isOpen) {

  const superbase = await supabaseClient(token);
  const {data, error} = await superbase
    .from("jobs")
    .update({isOpen})
    .eq("id", job_id)
    .single()


  if (error){
    console.error("Error on Updating  job", error);
    return null;
  }

  return data;
  
}
 