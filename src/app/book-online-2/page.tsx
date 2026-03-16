import { client } from "@/sanity/lib/client";
import { bookableServicesQuery } from "@/sanity/lib/queries";
import BookOnlineClient from "./BookOnlineClient";

export const revalidate = 60;

interface BookableService {
  title: string;
  description?: string;
  duration?: string;
  price?: string;
}

export default async function BookOnlinePage() {
  const raw = await client.fetch(bookableServicesQuery);
  const services: BookableService[] = Array.isArray(raw)
    ? raw.map((s: { title: string; description?: string }) => ({
        title: s.title ?? "",
        description: s.description ?? "",
        duration: "",
        price: "",
      }))
    : [];

  return <BookOnlineClient services={services} />;
}
