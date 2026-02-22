import { client } from "@/sanity/lib/client";
import { bookableServicesQuery } from "@/sanity/lib/queries";
import BookOnlineClient from "./BookOnlineClient";

export const revalidate = 60;

interface BookableService {
  title: string;
  description: string;
  duration: string;
  price: string;
}

export default async function BookOnlinePage() {
  const services: BookableService[] = await client.fetch(bookableServicesQuery);

  return <BookOnlineClient services={services} />;
}
