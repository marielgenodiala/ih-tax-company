"use client";

import React from "react";
import { useFormValue } from "sanity";
import { Box, Text, Card } from "@sanity/ui";
import { LaunchIcon } from "@sanity/icons";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function PageUrlPreview() {
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const docType = useFormValue(["_type"]) as string | undefined;

  if (!slug) {
    return (
      <Card padding={3} radius={2} tone="transparent">
        <Text size={1} muted>
          Enter a slug to see the page URL.
        </Text>
      </Card>
    );
  }

  let path: string;
  if (docType === "blogPost") {
    path = `/blogs/${slug}`;
  } else {
    path = slug === "home" ? "/" : `/${slug}`;
  }

  const fullUrl = `${SITE_URL}${path}`;

  return (
    <Card padding={3} radius={2} tone="primary" border>
      <a
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "inherit",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "13px",
        }}
      >
        <LaunchIcon />
        {fullUrl}
      </a>
    </Card>
  );
}

export function BlogUrlPreview() {
  return <PageUrlPreview />;
}
