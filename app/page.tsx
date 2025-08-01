import Navbar from "@/components/global/nav-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/constants/landing-page";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar/>

      <section>

        <div className="flex items-center justify-center flex-col mt-[80px] gap-4">

          <span className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm">
            An Ai powered salses assistant chatbot 
          </span>

          <Image src={'/images/corinna-ai-logo.png'} width={500} height={100} alt="Logo" className="max-w-lg object-contain"/>

          <p className="text-center max-w-[500px]">
            Your Ai powered sales assistant! Embed Corinna Ai into any website with just a snippet of code!
          </p>

          <Button className="bg-orange font-bold text-white px-4">
            Start for free
          </Button>

          <Image src={'/images/iphonecorinna.png'} width={400} height={100} alt="Logo" className="max-w-lg object-contain"/>
        </div>

      </section>

      <section className="flex justify-center items-center flex-col gap-4 mt-10">
        <h2 className="text-4xl text-center font-semibold">Choose what fits your right now</h2>

        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If you&apos;re not
          <br />
          ready to commit you can get started for free.
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map(card => (
            <Card key={card.priceId} className={cn("w-[300px] flex flex-col justify-between", card.title === "Ultimate" && "border-2 border-primary")}>

              <CardHeader>

                <CardTitle className="text-orange">
                  {card.title}
                </CardTitle>

                <CardDescription>{card.description}</CardDescription>

              </CardHeader>

              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">/ month</span>
              </CardContent>

              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map(features => (
                    <div key={features}i className="flex gap-2">
                      <CheckIcon/>
                      <p>{features}</p>
                    </div>
                  ))}
                </div>

                <Link className="rounded-md bg-[#f3d299] border-orange border p-2 w-full text-center font-semibold" href={`/dashboard?plan=${card.title}`}>
                  Get started
                </Link>
              </CardFooter>

            </Card>
          ))} 
        </div>

      </section>
    </main>
  );
}
