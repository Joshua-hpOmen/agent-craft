/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECERT_KEY!, {
    typescript: true,
    apiVersion: "2025-08-27.basil"
})


export const GET = async () => {
    try {
        const user = await currentUser();
        if(!user) return new NextResponse("User not authenticated")

        const account = stripe.accounts.create({
            country: "CA",
            type: "custom",
            business_type: "company",
            capabilities: {
                card_payments: {
                    requested: true,
                },
                transfers: {
                    requested: true,
                },
            },
            external_account: "btok_us",
            tos_acceptance: {
                date: 1547923073,
                ip: "172.18.80.19"
            }
        }).then(account => stripe.accounts.update(account.id,  {
                business_profile: {
                    mcc: "5045",
                    url: "https://bestcookieco.com"
                },
                company: {
                    address: {
                        city: "victoria",
                        line1: "123 State St",
                        postal_code: "V8P 1A1",
                        state: "BC"
                    },
                    tax_id: "00000000",
                    name: "The Best Cookie Co",
                    phone: "8888675309"
                }
            })
        ).then(account => stripe.accounts.createPerson(account.id,{
                    first_name: "Jenny",
                    last_name: "Rosen",
                    relationship: {
                        representative: true,
                        title: "CEO"
                    }
                }).then((person) => stripe.accounts.updatePerson(account.id, person.id, {
                    address: {
                        city: "Victoria",
                        line1: "123 State St",
                        postal_code: "V8P 1A1",
                        state: "CV"
                    },
                    dob: {
                                day: 10,
                                month: 12,
                                year: 1993
                            },
                            ssn_last_4: "0000",
                            phone: "8888675309",
                            email: "jenny@bestcookieco.com",
                            relationship: {
                                executive: true
                            }
                        }
                ).then(account => stripe.accounts.createPerson(account.id, {
                    first_name: "Kathlean",
                    last_name: "Bamk",
                    email: "katbank@bestcookieco.com",
                    address: {
                        city: "Victoria",
                        line1: "123 State St",
                        postal_code: "V8P 1A1",
                        state: "CV"
                    },
                    dob: {
                        day: 10,
                        month: 12,
                        year: 1993
                    },
                    phone: "8888675309",
                    relationship: {
                        owner: true,
                        percent_ownership: 80
                    }
                }).then(acc => stripe.accounts.update(account.id, {
                    company: {
                        owners_provided: true
                    }
                })).then(acc => db.user.update({
                        where: {
                            clerkId: user.id
                        },
                        data: {
                            stripeId: account.id
                        }
                    })
                ).then(acc => stripe.accountLinks.create({
                        account: account.id,
                        refresh_url: `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/callback/stripe/refresh`,
                        return_url: `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/callback/stripe/success`,
                        type: "account_onboarding",
                        collection_options: {
                            fields: "currently_due"
                        }
                    })
                ).then(acc => NextResponse.json("User created"))
            ))
        )    
    } catch (error) {
       console.log("🔴There was an error in the stripe connect api", error) 
    }
}