import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Rizky Pratama",
    game: "Mobile Legends",
    rating: 5,
    text: "Pelayanan cepat dan profesional! Dari Epic ke Legend hanya 1 hari. Highly recommended!",
  },
  {
    name: "Aditya Saputra",
    game: "Valorant",
    rating: 5,
    text: "Top up cepat banget, ga sampe 5 menit udah masuk. Harga juga lebih murah dari yang lain.",
  },
  {
    name: "Putri Wulandari",
    game: "PUBG Mobile",
    rating: 5,
    text: "Joki rank nya aman dan fast response. Account tetap aman dan lancar jaya!",
  },
  {
    name: "Budi Santoso",
    game: "Genshin Impact",
    rating: 5,
    text: "Sudah beberapa kali top up disini, selalu memuaskan. CS nya ramah dan helpful.",
  },
  {
    name: "Dewi Anggraini",
    game: "Free Fire",
    rating: 5,
    text: "Proses order mudah, pembayaran fleksibel. Pokoknya the best deh!",
  },
];

const Testimonials = () => {
  return (
    <section id="testimoni" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Testimoni Pelanggan</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Apa kata mereka yang sudah menggunakan layanan kami
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-border hover:border-primary transition-all hover:neon-glow-cyan bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                      <div className="mt-4">
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.game}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
