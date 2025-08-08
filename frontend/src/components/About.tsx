import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import profilePic from "@/assets/profile-pic-6.png"; // Adjust path if needed

export default function About() {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center py-4 sm:py-8 px-4 sm:px-6">
        <Card
          className="w-full max-w-xs sm:w-60 h-72 sm:h-80 p-0"
          style={{
            borderImage: "linear-gradient(135deg, #eab676 0%, #154c79 100%) 1",
            borderWidth: "2px",
            borderStyle: "solid",
            overflow: "hidden",
          }}
        >
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-2/3 object-cover rounded-none"
            style={{ display: "block" }}
          />
          <CardHeader className="flex flex-col items-center justify-center pt-2 pb-0 px-2">
            <CardTitle className="text-sm sm:text-base text-center">
              VAENGAI VENG`LEE
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Software Engineer
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="w-full max-w-4xl mx-auto mt-6 rounded-lg p-4 sm:p-6 shadow flex flex-col">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#eab676] mb-4">
            About Hexagon
          </h3>
          <p className="text-base sm:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed mt-2 sm:mt-4">
            Hexagon is an open source project focused on habit tracking,
            journaling, and reminders. I built this app to learn modern frontend
            technologies and explore the React ecosystem. Every feature and
            component is a result of experimenting and learning. Hexagon is
            completely free and available for anyone to use or contribute to.
            This project is for learning and sharing. Feel free to explore, use,
            and build upon it! Enjoy building software in the age of AI.
          </p>
        </div>
      </div>
    </>
  );
}
