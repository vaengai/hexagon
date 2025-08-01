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
      <div className="w-full flex flex-col items-center justify-center py-8 pb-2">
        <Card
          className="w-60 h-80 p-0"
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
          <CardHeader className="flex flex-col items-center justify-center pt-2 pb-0">
            <CardTitle>VAENGAI VENG`LEE</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </CardHeader>
        </Card>
        <div className="w-[80%] mx-auto mt-6 rounded-lg p-6 shadow flex flex-col">
          <h3 className="text-4xl font-extrabold text-[#eab676] mb-4 place-items-start">
            About Hexagon
          </h3>
          <p className="text-xl font-light text-muted-foreground leading-relaxed mt-4">
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
