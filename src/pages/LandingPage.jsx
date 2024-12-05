import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import companies from "../data/companies.json"
import faqs from "../data/faq.json"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const LandingPage = () => {
    return (
        <main className="flex flex-col gap-8 sm:gap-20 p-10 sm:p-20">
            <section className=" text-center">
                <h1 className=" flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-7xl tracking-tighter py-4">Find Your Dream Job{" "}
                    <span className=" flex items-center gap-2 sm:gap-6">And get{" "}
                        <img src="logo1.png"
                            alt="Logo of Job Portal "
                            className=" h-24 sm:h-40 lg:h-60" />
                    </span>
                </h1>
                <p className=" text-gray-300 sm:mt-4 text-xs sm:text-xl">Explore a Large Numbers of Jobs or Find the Perfect Candidate</p>
            </section>
            <div className="flex gap-6 justify-center">
                {/* buttons */}
                <Link to="/jobs">
                    <Button variant="blue" size="xl">  Find Jobs </Button>
                </Link>
                <Link to="/post-job">
                    <Button size="xl" variant="destructive">Post Jobs </Button>
                </Link>

            </div>
            {/* carousel */}
            <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full  py-10">
                <CarouselContent className="flex gap-5 sm:gap-20 items-center" >
                    {companies.map(({ name, id, path }) => {
                        return <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                            <img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
                        </CarouselItem>
                    })}
                </CarouselContent>

            </Carousel>
            {/* banner */}
            <img src="/job2.jpg" alt="Not found " className="w-full" />
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {/* cards */}
                <Card>
                    <CardHeader>
                        <CardTitle>For Job Seeker</CardTitle>

                    </CardHeader>
                    <CardContent>
                        <p>Search and apply for job as many as you can</p>
                    </CardContent>

                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>For Recruiter</CardTitle>

                    </CardHeader>
                    <CardContent>
                        <p>Hire your best candidate here</p>
                    </CardContent>

                </Card>
 
            </section>

            {/* Accordian */}
            <Accordion type="single" collapsible>
                {faqs.map((faq, index) => {
                    return (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    );

                })}

            </Accordion>

        </main>
    )
}
export default LandingPage; 