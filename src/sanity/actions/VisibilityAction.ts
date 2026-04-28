import { useCallback } from "react";
import type { DocumentActionComponent } from "sanity";
import { useDocumentOperation } from "sanity";
import { EyeClosedIcon } from "@sanity/icons";

const SUPPORTED_TYPES = ["page", "blogPost", "teamMember", "teamMembers", "service"];

// Map structure pane IDs → actual schema type names
const TYPE_MAP: Record<string, string> = {
  teamMembers: "teamMember",
};

export const UnpublishPageAction: DocumentActionComponent = (props) => {
  const { id, type, published, onComplete } = props;

  // Normalise: if the pane ID leaks in (e.g. "teamMembers"), resolve to the real schema type
  const schemaType = TYPE_MAP[type] ?? type;

  const { unpublish } = useDocumentOperation(id, schemaType);

  // published === null means no published version exists (already unpublished / draft-only)
  const isAlreadyUnpublished = published === null;

  const onHandle = useCallback(() => {
    unpublish.execute();
    onComplete();
  }, [unpublish, onComplete]);

  if (!SUPPORTED_TYPES.includes(type)) return null;

  return {
    label: "Unpublish",
    icon: EyeClosedIcon,
    tone: isAlreadyUnpublished ? undefined : "caution",
    disabled: isAlreadyUnpublished,
    title: isAlreadyUnpublished
      ? "Already unpublished"
      : "Remove this document from the website",
    onHandle,
  };
};
