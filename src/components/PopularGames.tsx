import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";

const games = [
  { name: "Mobile Legends", category: "MOBA" },
  { name: "Valorant", category: "FPS" },
  { name: "PUBG Mobile", category: "Battle Royale" },
  { name: "Free Fire", category: "Battle Royale" },
  { name: "Genshin Impact", category: "RPG" },
  { name: "Call of Duty Mobile", category: "FPS" },
  { name: "League of Legends", category: "MOBA" },
  { name: "Apex Legends", category: "Battle Royale" },
];

const PopularGames = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Game Populer</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Pilih game favorit kamu dan tingkatkan performamu!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {games.map((game, index) => (
            <Card 
              key={index} 
              className="group hover:border-primary transition-all duration-300 hover:neon-glow-cyan cursor-pointer bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <Gamepad2 className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                <p className="text-sm text-muted-foreground">{game.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="neon" size="lg">
            Lihat Semua Game
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularGames;
