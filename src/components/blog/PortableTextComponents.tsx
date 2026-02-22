import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="article-image">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ""}
            width={800}
            height={500}
            style={{ width: "100%", height: "auto" }}
          />
          {value.caption && (
            <p className="article-image__caption">{value.caption}</p>
          )}
        </div>
      );
    },
    contactBlock: ({ value }) => (
      <div className="contact-block">
        <strong>{value.companyName}</strong>
        {value.address}
        <br />
        Email: {value.email}
        <br />
        Web: {value.website}
        <br />
        Tel: {value.phone}
      </div>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const target = value?.blank ? "_blank" : undefined;
      const rel = value?.blank ? "noopener noreferrer" : undefined;
      return (
        <a href={value?.href} target={target} rel={rel}>
          {children}
        </a>
      );
    },
  },
};
