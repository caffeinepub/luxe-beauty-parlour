import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Crown,
  Facebook,
  Gem,
  Heart,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Scissors,
  Sparkles,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { ServiceType } from "./backend.d";
import { useSubmitAppointment } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Scissors,
    title: "Haircut & Styling",
    description:
      "Precision cuts and styling tailored to your face shape and lifestyle. From classic to avant-garde, our stylists bring your vision to life.",
    color: "rose",
  },
  {
    icon: Sparkles,
    title: "Facial & Skincare",
    description:
      "Restore your natural radiance with our luxurious facial treatments. We use premium skincare products for deep cleansing and hydration.",
    color: "gold",
  },
  {
    icon: Star,
    title: "Makeup Artistry",
    description:
      "From everyday glam to special occasions, our makeup artists create flawless looks that enhance your natural beauty and confidence.",
    color: "rose",
  },
  {
    icon: Heart,
    title: "Waxing",
    description:
      "Smooth, silky results with our gentle waxing services. We use premium waxes suitable for all skin types for a comfortable experience.",
    color: "gold",
  },
  {
    icon: Crown,
    title: "Bridal Packages",
    description:
      "Make your special day unforgettable with our comprehensive bridal packages. Complete beauty preparation for the bride and her entourage.",
    color: "rose",
  },
  {
    icon: Gem,
    title: "Nail Care",
    description:
      "Express your personality with stunning nail art and treatments. From classic manicures to intricate designs, every detail perfected.",
    color: "gold",
  },
];

const GALLERY_ITEMS = [
  {
    src: "/assets/generated/gallery-bridal.dim_600x600.jpg",
    alt: "Bridal Makeup",
    label: "Bridal Makeup",
  },
  {
    src: "/assets/generated/gallery-hair.dim_600x600.jpg",
    alt: "Hair Styling",
    label: "Hair Styling",
  },
  {
    src: "/assets/generated/gallery-facial.dim_600x600.jpg",
    alt: "Facial Treatment",
    label: "Facial Treatment",
  },
  {
    src: "/assets/generated/gallery-nails.dim_600x600.jpg",
    alt: "Nail Art",
    label: "Nail Art",
  },
];

const PRICING_TIERS = [
  {
    name: "Essential",
    subtitle: "Everyday Beauty Essentials",
    highlight: false,
    items: [
      { service: "Haircut & Blow-dry", price: "$25" },
      { service: "Classic Facial", price: "$45" },
      { service: "Waxing (per area)", price: "from $15" },
      { service: "Classic Manicure", price: "$20" },
      { service: "Eyebrow Shaping", price: "$12" },
    ],
  },
  {
    name: "Premium",
    subtitle: "Elevated Beauty Experience",
    highlight: true,
    items: [
      { service: "Full Makeup Look", price: "$75" },
      { service: "Hair Coloring", price: "$85" },
      { service: "Hydrating Facial", price: "$70" },
      { service: "Gel Nail Art", price: "$45" },
      { service: "Eyebrow Threading", price: "$12" },
    ],
  },
  {
    name: "Bridal Package",
    subtitle: "Complete Bridal Beauty",
    highlight: false,
    featured: true,
    price: "$299",
    items: [
      { service: "Bridal Makeup", price: "included" },
      { service: "Bridal Hairstyle", price: "included" },
      { service: "Manicure & Pedicure", price: "included" },
      { service: "Pre-wedding Facial", price: "included" },
      { service: "Trial Session", price: "included" },
    ],
  },
];

const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: ServiceType.haircut, label: "Haircut & Styling" },
  { value: ServiceType.facial, label: "Facial & Skincare" },
  { value: ServiceType.makeup, label: "Makeup Artistry" },
  { value: ServiceType.waxing, label: "Waxing" },
  { value: ServiceType.bridalPackage, label: "Bridal Package" },
  { value: ServiceType.nailCare, label: "Nail Care" },
  { value: ServiceType.hairColoring, label: "Hair Coloring" },
  { value: ServiceType.eyebrowThreading, label: "Eyebrow Threading" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "" as ServiceType | "",
    date: "",
    timeSlot: "",
    notes: "",
  });

  const bookingRef = useRef<HTMLDivElement>(null);
  const submitMutation = useSubmitAppointment();

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.service) return;
    submitMutation.mutate({
      customerName: formData.name,
      phoneNumber: formData.phone,
      email: formData.email,
      service: formData.service as ServiceType,
      preferredDate: formData.date,
      preferredTimeSlot: formData.timeSlot,
      notes: formData.notes || null,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      timeSlot: "",
      notes: "",
    });
    submitMutation.reset();
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-xs">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2 group"
            data-ocid="nav.home.link"
          >
            <span className="text-2xl font-display font-bold text-rose-deep tracking-tight">
              Luxe
            </span>
            <span className="text-2xl font-display font-light text-foreground tracking-wide">
              Beauty
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-rose-deep transition-colors duration-200"
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Button
            onClick={scrollToBooking}
            className="hidden md:flex bg-rose-deep hover:bg-rose-medium text-white rounded-full px-5 py-2 text-sm font-semibold shadow-rose transition-all duration-300 hover:shadow-luxury"
            data-ocid="nav.book_now.primary_button"
          >
            Book Now
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background"
            >
              <ul className="px-4 py-4 space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm font-medium text-muted-foreground hover:text-rose-deep"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToBooking();
                    }}
                    className="w-full bg-rose-deep hover:bg-rose-medium text-white rounded-full text-sm font-semibold"
                    data-ocid="nav.mobile_book.primary_button"
                  >
                    Book Appointment
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-salon.dim_1400x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        {/* Decorative rose overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-deep/20 via-transparent to-gold/10" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="text-gold-light font-display italic text-lg md:text-xl mb-4 tracking-widest uppercase">
              Welcome to
            </p>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight">
              Luxe Beauty
              <span className="block font-light text-gold-light">Parlour</span>
            </h1>
            <div className="w-24 h-px bg-gold mx-auto mb-6" />
            <p className="text-white/90 text-xl md:text-2xl font-light tracking-wide mb-10">
              Where Beauty Meets Artistry
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToBooking}
                className="bg-rose-deep hover:bg-rose-medium text-white rounded-full px-8 py-4 text-lg font-semibold shadow-luxury transition-all duration-300 hover:scale-105"
                data-ocid="hero.book.primary_button"
              >
                Book Appointment
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/60 text-white bg-white/10 hover:bg-white/20 rounded-full px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                <a href="#services" data-ocid="hero.services.secondary_button">
                  Explore Services
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-rose-deep font-display italic text-lg mb-2">
              What We Offer
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Our Services
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Indulge in a curated menu of beauty services designed to make you
              look and feel extraordinary.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative bg-card rounded-2xl p-8 shadow-xs border border-border hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                data-ocid={`services.item.${idx + 1}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-blush/40 to-transparent rounded-bl-full" />
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 ${
                    service.color === "rose"
                      ? "bg-rose-blush text-rose-deep"
                      : "bg-gold-light text-gold-deep"
                  }`}
                >
                  <service.icon size={24} />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {service.description}
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={scrollToBooking}
                    className="text-rose-deep text-sm font-semibold hover:text-rose-medium transition-colors group-hover:underline"
                  >
                    Book this service →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        className="py-24 bg-gradient-to-br from-rose-blush/30 via-background to-gold-light/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-rose-deep font-display italic text-lg mb-2">
              Our Work
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Beauty Gallery
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              A glimpse into the transformations we create every day.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {GALLERY_ITEMS.map((item, idx) => (
              <motion.div
                key={item.alt}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer shadow-xs"
                data-ocid={`gallery.item.${idx + 1}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-display font-semibold text-sm">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-rose-deep font-display italic text-lg mb-2">
              Transparent Pricing
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Our Packages
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Quality beauty services at honest prices. No hidden fees, no
              surprises.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {PRICING_TIERS.map((tier, idx) => (
              <motion.div
                key={tier.name}
                variants={itemVariants}
                className={`relative rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-luxury hover:-translate-y-1 ${
                  tier.highlight
                    ? "border-rose-deep bg-rose-deep text-white shadow-rose"
                    : tier.featured
                      ? "border-gold bg-gradient-to-br from-gold-light/30 to-background shadow-gold"
                      : "border-border bg-card"
                }`}
                data-ocid={`pricing.item.${idx + 1}`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-light via-gold to-gold-deep" />
                )}
                {tier.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold text-white text-xs font-bold px-2 py-1 rounded-full">
                      Best Value
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <h3
                    className={`font-display font-bold text-2xl mb-1 ${
                      tier.highlight ? "text-white" : "text-foreground"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`text-sm mb-2 ${
                      tier.highlight ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {tier.subtitle}
                  </p>
                  {tier.price && (
                    <div className="mb-6">
                      <span className="font-display font-bold text-4xl text-rose-deep">
                        {tier.price}
                      </span>
                      <span className="text-muted-foreground text-sm ml-1">
                        complete package
                      </span>
                    </div>
                  )}
                  <div
                    className={`w-12 h-0.5 mb-6 ${tier.highlight ? "bg-white/40" : "bg-gold"}`}
                  />

                  <ul className="space-y-3 mb-8">
                    {tier.items.map((item) => (
                      <li
                        key={item.service}
                        className={`flex justify-between items-center text-sm ${
                          tier.highlight ? "text-white/90" : "text-foreground"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              tier.highlight
                                ? "bg-gold-light"
                                : "bg-rose-medium"
                            }`}
                          />
                          {item.service}
                        </span>
                        <span
                          className={`font-semibold ${
                            tier.highlight
                              ? "text-gold-light"
                              : "text-rose-deep"
                          }`}
                        >
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={scrollToBooking}
                    className={`w-full rounded-full font-semibold transition-all duration-300 ${
                      tier.highlight
                        ? "bg-white text-rose-deep hover:bg-rose-blush"
                        : tier.featured
                          ? "bg-rose-deep text-white hover:bg-rose-medium shadow-rose"
                          : "bg-secondary text-secondary-foreground hover:bg-rose-blush"
                    }`}
                    data-ocid={`pricing.book.primary_button.${idx + 1}`}
                  >
                    Book Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT US */}
      <section
        id="about"
        className="py-24 bg-gradient-to-br from-rose-blush/20 via-background to-gold-light/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-rose-deep font-display italic text-lg mb-2">
                Our Story
              </p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
                About Luxe Beauty
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-8" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Founded over a decade ago with a single vision — to create a
                sanctuary where every woman walks in feeling ordinary and walks
                out feeling extraordinary. Luxe Beauty Parlour has been the
                trusted destination for beauty in our community for{" "}
                <strong className="text-foreground">10+ years</strong>.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our team of passionate beauty artisans brings together years of
                expertise, ongoing training, and an unwavering commitment to
                using only the finest products. We believe beauty is not just
                about appearance — it's about confidence, self-expression, and
                feeling your absolute best.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Whether you're preparing for a wedding, a big interview, or
                simply treating yourself, we promise a warm, welcoming
                experience that leaves you glowing inside and out.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "10+", label: "Years of Excellence" },
                  { value: "5000+", label: "Happy Clients" },
                  { value: "15+", label: "Expert Artists" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display font-bold text-3xl text-rose-deep mb-1">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-rose-blush/50 to-gold-light/30 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-luxury aspect-[4/5]">
                <img
                  src="/assets/generated/gallery-bridal.dim_600x600.jpg"
                  alt="Our talented beauty team at work"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-display font-semibold text-foreground text-sm">
                    ✨ Trusted by over 5,000 happy clients
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Rated 5 stars across all platforms
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-gold/30 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT + BOOKING */}
      <section id="contact" className="py-24 bg-background" ref={bookingRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-rose-deep font-display italic text-lg mb-2">
              Get in Touch
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Book Your Appointment
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Reserve your beauty experience. We'll confirm your booking within
              24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="font-display font-semibold text-2xl text-foreground mb-6">
                  Contact Details
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-blush rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-rose-deep" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Address
                      </p>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        123 Rose Lane, Beauty District
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-blush rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-rose-deep" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Phone
                      </p>
                      <a
                        href="tel:+15558937726"
                        className="text-muted-foreground text-sm mt-0.5 hover:text-rose-deep transition-colors"
                      >
                        +1 (555) LUXE-SPA
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-blush rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-rose-deep" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Email
                      </p>
                      <a
                        href="mailto:hello@luxebeauty.com"
                        className="text-muted-foreground text-sm mt-0.5 hover:text-rose-deep transition-colors"
                      >
                        hello@luxebeauty.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-blush rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-rose-deep" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Opening Hours
                      </p>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        Mon–Sat: 9:00 AM – 7:00 PM
                        <br />
                        Sunday: 10:00 AM – 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-rose-blush/40 to-gold-light/20 rounded-2xl border border-rose-soft/30">
                <p className="font-display font-semibold text-foreground mb-2">
                  🌸 Walk-ins Welcome
                </p>
                <p className="text-muted-foreground text-sm">
                  While we recommend booking in advance, we always try to
                  accommodate walk-in clients. Give us a call to check
                  availability.
                </p>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-2xl border border-border shadow-luxury p-8">
                <h3 className="font-display font-semibold text-2xl text-foreground mb-6">
                  Book Your Visit
                </h3>

                <AnimatePresence mode="wait">
                  {submitMutation.isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-12"
                      data-ocid="booking.success_state"
                    >
                      <CheckCircle2
                        size={56}
                        className="text-green-500 mx-auto mb-4"
                      />
                      <h4 className="font-display font-bold text-2xl text-foreground mb-2">
                        Booking Confirmed!
                      </h4>
                      <p className="text-muted-foreground mb-6">
                        Thank you! We've received your appointment request and
                        will confirm within 24 hours.
                      </p>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="rounded-full border-rose-deep text-rose-deep hover:bg-rose-blush"
                      >
                        Book Another Appointment
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label
                            htmlFor="booking-name"
                            className="text-sm font-medium"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="booking-name"
                            type="text"
                            placeholder="Sophie Anderson"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((p) => ({
                                ...p,
                                name: e.target.value,
                              }))
                            }
                            required
                            className="rounded-xl border-border focus-visible:ring-rose-deep"
                            data-ocid="booking.name.input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="booking-phone"
                            className="text-sm font-medium"
                          >
                            Phone Number *
                          </Label>
                          <Input
                            id="booking-phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((p) => ({
                                ...p,
                                phone: e.target.value,
                              }))
                            }
                            required
                            className="rounded-xl border-border"
                            data-ocid="booking.phone.input"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="booking-email"
                          className="text-sm font-medium"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="booking-email"
                          type="email"
                          placeholder="sophie@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          required
                          className="rounded-xl border-border"
                          data-ocid="booking.email.input"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Service *</Label>
                        <Select
                          value={formData.service}
                          onValueChange={(v) =>
                            setFormData((p) => ({
                              ...p,
                              service: v as ServiceType,
                            }))
                          }
                          required
                        >
                          <SelectTrigger
                            className="rounded-xl border-border"
                            data-ocid="booking.service.select"
                          >
                            <SelectValue placeholder="Choose a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label
                            htmlFor="booking-date"
                            className="text-sm font-medium"
                          >
                            Preferred Date *
                          </Label>
                          <Input
                            id="booking-date"
                            type="date"
                            value={formData.date}
                            onChange={(e) =>
                              setFormData((p) => ({
                                ...p,
                                date: e.target.value,
                              }))
                            }
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className="rounded-xl border-border"
                            data-ocid="booking.date.input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Preferred Time *
                          </Label>
                          <Select
                            value={formData.timeSlot}
                            onValueChange={(v) =>
                              setFormData((p) => ({ ...p, timeSlot: v }))
                            }
                            required
                          >
                            <SelectTrigger
                              className="rounded-xl border-border"
                              data-ocid="booking.time.select"
                            >
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Morning 9-12">
                                Morning (9am – 12pm)
                              </SelectItem>
                              <SelectItem value="Afternoon 12-4">
                                Afternoon (12pm – 4pm)
                              </SelectItem>
                              <SelectItem value="Evening 4-7">
                                Evening (4pm – 7pm)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="booking-notes"
                          className="text-sm font-medium"
                        >
                          Additional Notes
                        </Label>
                        <Textarea
                          id="booking-notes"
                          placeholder="Any special requests or notes for our team..."
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              notes: e.target.value,
                            }))
                          }
                          rows={3}
                          className="rounded-xl border-border resize-none"
                          data-ocid="booking.notes.textarea"
                        />
                      </div>

                      {submitMutation.isError && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-xl text-sm"
                          data-ocid="booking.error_state"
                        >
                          <AlertCircle size={16} />
                          <span>
                            Something went wrong. Please try again or call us
                            directly.
                          </span>
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        disabled={submitMutation.isPending}
                        className="w-full bg-rose-deep hover:bg-rose-medium text-white rounded-full py-3 font-semibold text-base shadow-rose transition-all duration-300 hover:shadow-luxury"
                        data-ocid="booking.submit_button"
                      >
                        {submitMutation.isPending ? (
                          <>
                            <Loader2 size={18} className="mr-2 animate-spin" />
                            Booking...
                          </>
                        ) : (
                          "Confirm Appointment"
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display font-bold text-2xl text-gold">
                  Luxe
                </span>
                <span className="font-display font-light text-2xl text-background/80">
                  Beauty
                </span>
              </div>
              <p className="text-background/60 text-sm leading-relaxed max-w-xs">
                Your premier destination for luxury beauty services. Where
                artistry meets elegance, and every visit is a celebration of
                you.
              </p>
              <div className="flex gap-3 mt-5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background/10 hover:bg-rose-deep flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background/10 hover:bg-rose-deep flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-gold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-background/60 hover:text-gold text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-gold mb-4">
                Hours
              </h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li className="flex justify-between">
                  <span>Mon – Sat</span>
                  <span>9am – 7pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>10am – 5pm</span>
                </li>
              </ul>
              <div className="mt-6">
                <h4 className="font-display font-semibold text-gold mb-3">
                  Contact
                </h4>
                <p className="text-background/60 text-sm">
                  123 Rose Lane, Beauty District
                </p>
                <p className="text-background/60 text-sm">+1 (555) LUXE-SPA</p>
                <p className="text-background/60 text-sm">
                  hello@luxebeauty.com
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/40 text-sm">
              © {new Date().getFullYear()} Luxe Beauty Parlour. All rights
              reserved.
            </p>
            <p className="text-background/40 text-sm">
              Built with{" "}
              <Heart size={12} className="inline text-rose-medium mx-0.5" />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
