import TeamGridDefault from "./Default";
import TeamGridPage from "./TeamGridPage";

export interface TeamGridSectionProps {
  layout?: "default" | "teamPage";
  introLabel?: string;
  introHeading?: string;
  introText?: string;
  useTeamList?: boolean;
}

export default async function TeamGrid(props: TeamGridSectionProps) {
  const { layout = "default", ...rest } = props;

  if (layout === "teamPage") {
    return <TeamGridPage {...rest} />;
  }

  return <TeamGridDefault {...rest} />;
}
