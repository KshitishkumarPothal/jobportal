import supabaseClient, { supabaseUrl } from "@/utils/superbase";

export async function applyToJob(token,__, jobData) {

    const superbase = await supabaseClient(token);
    const random = Math.floor(Math.random() * 90000);
    const filename = `resume-${random}-${jobData.candidate_id}`;

    const {error:strogeError} = await supabase.storage.from("resume").upload(filename, jobData.resume)
    if (strogeError){
        console.error("Error on uploading Resume", strogeError);
        return null;
      }

    const resume = `${supabaseUrl}/storage/v1/object/public/resume/${filename}`;

    const {data, error} = await superbase.from("applications").insert([{
        ...jobData,
        resume,
    }]).select()
 

    if (error){
      console.error("Error on submitting application", error);
      return null;
    }

    return data;
    
}