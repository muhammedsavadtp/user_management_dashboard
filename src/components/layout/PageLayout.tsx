import React from "react";
import TeamHeader from "../shared/header/Header";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div>
      <TeamHeader
        title="Team members"
        profileInitials="JD"
        profileColor="#69c07b"
        onSearchClick={() => console.log("Search clicked")}
        onChatClick={() => console.log("Chat clicked")}
        onSettingsClick={() => console.log("Settings clicked")}
        onNotificationClick={() => console.log("Notifications clicked")}
        onProfileClick={() => console.log("Profile clicked")}
      />
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
