import { getCompany } from "@/api/apiCompany";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import useFetch from "@/hooks/useFatch";
import { useUser } from "@clerk/clerk-react";
import { Select } from "@radix-ui/react-select";
import { State } from "country-state-city";
// import { Pagination } from "@/components/ui/pagination";

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {

    // const {session}=useSession()
    // const fetchJobs =async() =>{

    //     const data = await getJobs(superbaseAccessToken);
    //     console.log(data);
    // }

    // useEffect(() =>{
    //    fetchJobs();
    // },[])

    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [company_id, setCompany_id] = useState("");
    const { isLoaded } = useUser();

    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [pageSize] = useState(10);

    const {
        fn: findJobs,
        data: jobs,
        loading: loadingJobs
    } = useFetch(getJobs, { location, company_id, searchQuery, page: currentPage, limit: pageSize });

    const {
        data: companies,
        fn: fnCompanies,
    } = useFetch(getCompany);

    useEffect(() => {
        if (isLoaded) {
            fnCompanies();
        }
    }, [isLoaded]);

    // console.log(companies);
 

    useEffect(() => {
        if (isLoaded) findJobs();
    }, [isLoaded, location, company_id, searchQuery, currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        const query = formData.get("search-query");
        if (query) setSearchQuery(query);

        setCurrentPage(1);
    };

    if (!isLoaded) {
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
    }

    console.log(jobs);
    const clearFilters =() =>{
        setSearchQuery("");
        setCompany_id("");
        setLocation("");
        setCurrentPage(1);
    }

    const totalJobs = jobs?.total || 0; // Total jobs fetched from API
    const totalPages = Math.ceil(totalJobs / pageSize); // Total pages
    return (
        <div className="p-6">
            <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
                Latest Jobs
            </h1>
            {/* Add filter */}

            <form onSubmit={handleSearch} className="h-14 flex w-full gap-2 items-center mb-3">
                <Input type="text" placeholder="Search jobs by title..." name="search-query" className="h-full flex-1 px-4 text-md" />

                <Button type="submit" className="h-full sm:w-28" variant="blue">
                    Search
                </Button>
            </form>
            <div className="flex flex-col sm:flex-row gap-2">
                <Select value={location} onValueChange={(value) => setLocation(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter By Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {State.getStatesOfCountry("IN").map(({name}) => {
                                return(
                                <SelectItem value={name} key={name}>{name}</SelectItem>
                            )})}
                            
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter By Company" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {companies?.map(({name, id}) => {
                                return(
                                <SelectItem key={name} value={id} > 
                                  {name} 
                                </SelectItem>
                            );
                        })}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button onClick ={clearFilters} variant="destructive" className="sm:w-1/2">Clear</Button>
            </div>

            {loadingJobs && (
                <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}

            {loadingJobs === false && (
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobs?.length ? (
                        jobs.map((job) => {
                            return <JobCard key={job.id} job={job} />;
                        })

                    ) : (
                        <div>No Job Found</div>
                    )}
                </div>
            )}
            {/* Pagination Controls */}
            <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
             <PaginationItem>
             <PaginationPrevious href="#" onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} />
           </PaginationItem>
        )}
        
        {Array.from({length: totalPages}).map((__, index) =>{
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => setCurrentPage(index + 1)} href="#">{index + 1 }</PaginationLink>
                </PaginationItem>
        })}
        
        {currentPage < totalPages && (
             <PaginationItem>
             <PaginationNext
                 onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                 href="#"
             />
         </PaginationItem>

        )}
        
       
      </PaginationContent>
    </Pagination>
       
        </div>
    )
}
export default JobListing;