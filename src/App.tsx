import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  Heart,
  Shield,
  Activity,
  UserCheck,
  ChevronRight,
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  HelpCircle,
  ExternalLink,
  Settings,
  RefreshCw,
  MessageSquare,
  Sparkles,
  Stethoscope,
  Users,
  Layers,
  Compass,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [googleCalendarUrl, setGoogleCalendarUrl] = useState(
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3OlbJnsnL8qEf4SVQL-DMf-1eViTWeRD0OhqmsgkBLxaJmjjRyuZFhprCpQksukLS2XdvpdIv3",
  );
  const [customUrlInput, setCustomUrlInput] = useState(
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3OlbJnsnL8qEf4SVQL-DMf-1eViTWeRD0OhqmsgkBLxaJmjjRyuZFhprCpQksukLS2XdvpdIv3",
  );
  const [selectedCondition, setSelectedCondition] = useState("tmj");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Quick Notification Toast state
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Scroll to top on tab change
  const navigateTo = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    {
      id: "sot",
      title: "Sacro Occipital Technique (SOT) & Craniopathy",
      icon: <BrainIcon className="w-8 h-8 text-teal-600" />,
      shortDesc:
        "Gentle, precise pelvic block indicators and cranial bone adjustments to balance the nervous system.",
      details:
        "Sacro Occipital Technique (SOT) is a specialized chiropractic technique designed to restore harmony between the sacrum (base of spine) and occiput (base of skull). Utilizing indicator points, customized pelvic blocks, and gentle cranial stabilization, SOT aids body alignment without harsh forces.",
      benefits: [
        "Low-force gentleness",
        "Enhanced cerebrospinal fluid flow",
        "Structural stability",
        "Comprehensive organ reflex balancing",
      ],
    },
    {
      id: "adjustments",
      title: "Spinal Alignment & Manual Therapy",
      icon: <Activity className="w-8 h-8 text-teal-600" />,
      shortDesc:
        "Comprehensive spinal adjustments targeting mechanical disc stress and nerve impingement.",
      details:
        "Spinal adjustments aim to relieve abnormal biomechanical pressure on surrounding vertebrae, nerves, and intervertebral discs. Tailored techniques accommodate patient preferences from high-velocity low-amplitude (HVLA) to low-force instrument techniques.",
      benefits: [
        "Improved spinal mobility",
        "Relief from chronic stiffness",
        "Reduced joint inflammation",
        "Optimal nerve function",
      ],
    },
    {
      id: "visceral",
      title: "Organ Reflex Therapy (CMRT)",
      icon: <Heart className="w-8 h-8 text-teal-600" />,
      shortDesc:
        "Chiropractic Muscle Reflex Technique addressing nerve supply connection between spine and internal organs.",
      details:
        "Chiropractic Muscle Reflex Technique (CMRT) focuses on the neurological connections linking spinal segments with internal organs. By balancing specific reflex points and soft tissue tension, CMRT helps alleviate referred mechanical stress.",
      benefits: [
        "Better digestion support",
        "Reflex tension relief",
        "Enhanced holistic recovery",
        "Autonomic nervous balance",
      ],
    },
    {
      id: "tmj",
      title: "TMJ & Craniofacial Relief",
      icon: <Sparkles className="w-8 h-8 text-teal-600" />,
      shortDesc:
        "Targeted care for jaw pain, clenching, bruxism, and associated tension headaches.",
      details:
        "TMJ dysfunction causes persistent facial pain, ear pressure, clicking, and tension headaches. Care includes soft tissue therapy for masticatory muscles, cranial jaw alignment, and cervical spine corrections.",
      benefits: [
        "Reduced jaw clicking and pain",
        "Relief from temporal headaches",
        "Easier chewing and yawning",
        "Cervical alignment balance",
      ],
    },
    {
      id: "prenatal",
      title: "Prenatal & Pediatric Chiropractic",
      icon: <Users className="w-8 h-8 text-teal-600" />,
      shortDesc:
        "Gentle, supportive care for expecting mothers and growing infants for balanced biomechanics.",
      details:
        "Using modified low-force protocols such as the Webster Technique, prenatal care reduces pelvic misalignments and round ligament strain. Pediatric care uses minimal pressure (no more than pressure on an eyeball) for healthy development.",
      benefits: [
        "Improved pelvic alignment during pregnancy",
        "Relief from lower back and sciatica pain",
        "Colic and infant sleep support",
        "Safer, comfortable motion",
      ],
    },
    {
      id: "wellness",
      title: "Postural & Ergo Wellness Planning",
      icon: <Compass className="w-8 h-8 text-teal-600" />,
      shortDesc:
        "Personalized corrective exercise regimens, ergonomic station reviews, and posture restoration.",
      details:
        "Long-term healing requires daily lifestyle support. We create custom rehabilitation exercises, spinal traction recommendations, ergonomic desk setups, and anti-inflammatory lifestyle guidelines.",
      benefits: [
        "Sustained alignment results",
        "Prevents repetitive strain injuries",
        "Enhanced physical vitality",
        "Empowered self-care routines",
      ],
    },
  ];

  const conditions = [
    {
      id: "tmj",
      title: "TMJ & Jaw Pain",
      description:
        "Jaw popping, clicking, clenching tension, and radiating facial pressure often stem from cervical subluxations and cranial imbalance.",
      approach:
        "Combining cranial alignment, gentle jaw soft-tissue release, and upper neck adjustments.",
    },
    {
      id: "headaches",
      title: "Headaches & Migraines",
      description:
        "Cervicogenic headaches result from upper neck muscle spasms and cranial restriction affecting cranial nerve pathways.",
      approach:
        "SOT cranial balancing and upper cervical spinal adjustments to relieve vascular and neurological tension.",
    },
    {
      id: "sciatica",
      title: "Sciatica & Low Back Pain",
      description:
        "Sharp or burning pain extending into hips and legs caused by lumbar nerve root compression or pelvic tilt.",
      approach:
        "Pelvic blocking, spinal decompression principles, and disc-sparing rotational adjustments.",
    },
    {
      id: "neck",
      title: "Neck Pain & Forward Head Posture",
      description:
        '"Text neck" and cervical strain caused by heavy device usage, leading to disc bulge and shoulder stiffness.',
      approach:
        "Postural biomechanics restoration, cervical curve correction, and ergonomic re-training.",
    },
    {
      id: "scoliosis",
      title: "Postural Imbalance & Scoliosis Support",
      description:
        "Abnormal spinal curvature causing uneven hips, shoulder height discrepancies, and chronic back fatigue.",
      approach:
        "Structural SOT category alignment, corrective core strengthening, and pelvic stabilizer usage.",
    },
    {
      id: "prenatal-discomfort",
      title: "Pregnancy-Related Pelvic Pain",
      description:
        "Hormonal ligament laxity and changing center of gravity causing pubic symphysis dysfunction or back strain.",
      approach:
        "Webster Technique adjustments, supporting pregnancy pillows, and gentle pelvic ligament release.",
    },
  ];

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      setGoogleCalendarUrl(customUrlInput.trim());
      showToast("Iframe schedule URL updated!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigateTo("home")}
            >
              <div className="bg-teal-600 text-white p-2.5 rounded-xl shadow-md shadow-teal-600/20">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                  APEX <span className="text-teal-600">WELLNESS</span>
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">
                  Chiropractic & SOT Care
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "services", label: "Services" },
                { id: "conditions", label: "Conditions Treated" },
                { id: "about", label: "About Practice" },
                { id: "book", label: "Book Appointment" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    activeTab === item.id
                      ? "text-teal-600 border-b-2 border-teal-600 pb-1"
                      : "text-slate-600 hover:text-teal-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:5551234567"
                className="flex items-center text-xs font-semibold text-slate-600 hover:text-teal-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                (555) 123-4567
              </a>
              <button
                onClick={() => navigateTo("book")}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition duration-200 flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            {[
              { id: "home", label: "Home" },
              { id: "services", label: "Services" },
              { id: "conditions", label: "Conditions Treated" },
              { id: "about", label: "About Practice" },
              { id: "book", label: "Book Appointment" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`block w-full text-left py-2 px-3 rounded-lg text-base font-medium ${
                  activeTab === item.id
                    ? "bg-teal-50 text-teal-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col space-y-2">
              <a
                href="tel:5551234567"
                className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl text-slate-700 font-medium text-sm"
              >
                <Phone className="w-4 h-4 mr-2 text-teal-600" /> Call (555)
                123-4567
              </a>
              <button
                onClick={() => navigateTo("book")}
                className="w-full bg-teal-600 text-white py-2.5 rounded-xl font-medium text-sm shadow-md flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {}
      <main className="flex-grow">
        {/* TAB 1: HOME PAGE */}
        {activeTab === "home" && (
          <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-teal-900 via-slate-900 to-slate-900 text-white py-20 lg:py-28 overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 bg-teal-500/20 border border-teal-500/30 px-3.5 py-1.5 rounded-full text-teal-300 text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>Advanced SOT & Holistic Chiropractic</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                      Restoring Natural Balance{" "}
                      <br className="hidden sm:inline" />
                      <span className="text-teal-400">
                        To Your Body & Spine
                      </span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                      Experience specialized chiropractic care utilizing Sacro
                      Occipital Technique (SOT), Craniopathy, Organ Reflex
                      Therapy, and gentle spinal alignment to relieve chronic
                      pain and elevate vital wellness.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                      <button
                        onClick={() => navigateTo("book")}
                        className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-teal-500/20 transition duration-200 flex items-center justify-center space-x-2"
                      >
                        <Calendar className="w-5 h-5" />
                        <span>Schedule Appointment</span>
                      </button>
                      <button
                        onClick={() => navigateTo("services")}
                        className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl backdrop-blur-sm border border-white/10 transition duration-200 flex items-center justify-center space-x-2"
                      >
                        <span>Explore Our Services</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick highlights */}
                    <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-4 text-center lg:text-left">
                      <div>
                        <div className="text-2xl font-bold text-teal-400">
                          100%
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          Gentle & Low Force
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-teal-400">
                          Whole Body
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          SOT & Craniopathy
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-teal-400">
                          All Ages
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          Prenatal to Seniors
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hero Graphic Card */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full space-y-6">
                      <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                        <div className="p-3 bg-teal-500/20 text-teal-400 rounded-2xl">
                          <Shield className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white">
                            Patient-Centered Care
                          </h3>
                          <p className="text-xs text-slate-400">
                            Tailored gentle adjustments for lasting health
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 text-sm text-slate-300">
                          <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                          <span>No forceful twisting or cracking required</span>
                        </div>
                        <div className="flex items-start space-x-3 text-sm text-slate-300">
                          <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                          <span>
                            Specialized SOT pelvic blocking & indicator analysis
                          </span>
                        </div>
                        <div className="flex items-start space-x-3 text-sm text-slate-300">
                          <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                          <span>
                            Comprehensive TMJ, headache, and cranial balancing
                          </span>
                        </div>
                        <div className="flex items-start space-x-3 text-sm text-slate-300">
                          <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                          <span>
                            Flexible online Google Calendar booking system
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => setContactModalOpen(true)}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-sm font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Have Questions? Contact Us</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Philosophy Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">
                    Our Clinical Approach
                  </h2>
                  <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                    Why Sacro Occipital Technique (SOT)?
                  </p>
                  <p className="mt-4 text-slate-600 leading-relaxed">
                    SOT is an advanced indicator-based technique that recognizes
                    the intricate link between the cranial mechanism, the spine,
                    and organ health. By restoring structural integrity without
                    aggressive strain, we enable your central nervous system to
                    heal itself naturally.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center font-bold mb-4">
                      01
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Cranial & Sacral CSF Dynamics
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Optimizing the circulation of cerebrospinal fluid (CSF)
                      that bathes the brain and spinal cord, essential for
                      cognitive clarity and systemic recovery.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center font-bold mb-4">
                      02
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Pelvic Blocking Precision
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Using anatomical blocks under the pelvis while you
                      comfortably rest in place, allowing gravity and body
                      weight to gently re-align subluxations.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center font-bold mb-4">
                      03
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Visceral Reflex Integration
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Addresses reflex patterns where spinal joint imbalances
                      directly strain internal organs or cause referred back and
                      abdominal symptoms.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Services Overview Grid */}
            <section className="py-16 bg-slate-50 border-t border-slate-200/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">
                      Specialized Care
                    </h2>
                    <p className="text-3xl font-extrabold text-slate-900">
                      Featured Health Services
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo("services")}
                    className="mt-4 md:mt-0 text-teal-600 hover:text-teal-700 font-semibold text-sm flex items-center space-x-1"
                  >
                    <span>View all services</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.slice(0, 3).map((s) => (
                    <div
                      key={s.id}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition"
                    >
                      <div className="mb-4">{s.icon}</div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {s.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {s.shortDesc}
                      </p>
                      <button
                        onClick={() => navigateTo("services")}
                        className="text-teal-600 hover:text-teal-700 text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Call to Action Banner */}
            <section className="py-16 bg-teal-700 text-white">
              <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
                <h2 className="text-3xl font-bold">
                  Ready to experience low-force, holistic healing?
                </h2>
                <p className="text-teal-100 max-w-2xl mx-auto text-base">
                  Schedule your comprehensive clinical evaluation today and take
                  the first step towards pain-free, optimal vitality.
                </p>
                <div>
                  <button
                    onClick={() => navigateTo("book")}
                    className="bg-white text-teal-800 hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl shadow-lg transition duration-200"
                  >
                    Book Your Appointment Now
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {}
        {activeTab === "services" && (
          <div className="py-12 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Chiropractic Services & Care
                </h1>
                <p className="mt-3 text-slate-600">
                  Comprehensive, low-force techniques custom-tailored to your
                  spine, cranial nerves, and overall vitality.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
                  >
                    <div className="p-6 flex-grow">
                      <div className="p-3 bg-teal-50 w-fit rounded-xl mb-4">
                        {s.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {s.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {s.details}
                      </p>

                      <div className="border-t border-slate-100 pt-4 mt-auto">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
                          Key Benefits:
                        </h4>
                        <ul className="space-y-1.5">
                          {s.benefits.map((b, i) => (
                            <li
                              key={i}
                              className="text-xs text-slate-600 flex items-center space-x-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 border-t border-slate-100">
                      <button
                        onClick={() => navigateTo("book")}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs py-2.5 rounded-lg transition text-center"
                      >
                        Schedule This Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === "conditions" && (
          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Conditions Treated
                </h1>
                <p className="mt-3 text-slate-600">
                  Select a condition below to learn how Sacro Occipital
                  Technique (SOT) and manual therapy alleviate symptoms at their
                  root cause.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Condition Selector Tabs */}
                <div className="lg:col-span-4 space-y-2">
                  {conditions.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCondition(c.id)}
                      className={`w-full text-left p-4 rounded-xl font-medium transition flex items-center justify-between ${
                        selectedCondition === c.id
                          ? "bg-teal-600 text-white shadow-md"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{c.title}</span>
                      <ChevronRight
                        className={`w-4 h-4 ${selectedCondition === c.id ? "text-white" : "text-slate-400"}`}
                      />
                    </button>
                  ))}
                </div>

                {/* Condition Detail Display */}
                <div className="lg:col-span-8 bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[320px] flex flex-col justify-between">
                  {(() => {
                    const active =
                      conditions.find((c) => c.id === selectedCondition) ||
                      conditions[0];
                    return (
                      <div>
                        <div className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                          Clinical Condition Focus
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">
                          {active.title}
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-1">
                              Understanding the Issue:
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {active.description}
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <h3 className="text-sm font-bold text-teal-700 mb-1 flex items-center space-x-1.5">
                              <Stethoscope className="w-4 h-4" />
                              <span>Our Clinical Approach:</span>
                            </h3>
                            <p className="text-slate-700 text-sm leading-relaxed">
                              {active.approach}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="pt-6 border-t border-slate-200 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Need specific advice regarding your symptoms?
                    </p>
                    <button
                      onClick={() => navigateTo("book")}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs px-5 py-2.5 rounded-xl shadow transition"
                    >
                      Book Consultation For This Condition
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === "about" && (
          <div className="py-12 bg-slate-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  About Apex Wellness Practice
                </h1>
                <p className="mt-3 text-slate-600">
                  Dedicated to low-force neurological and physical care in a
                  serene, supportive environment.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Our Healing Philosophy
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  At Apex Wellness & Chiropractic Clinic, our focus is centered
                  on structural integrity, craniosacral fluid dynamics, and
                  neurological health. We believe in taking the time necessary
                  to thoroughly evaluate each individual's unique indicator
                  points, spinal mechanics, and lifestyle stressors.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Unlike traditional quick-adjustment models, our clinic
                  integrates Sacro Occipital Technique (SOT), Craniopathy, and
                  Chiropractic Muscle Reflex Technique (CMRT) to deliver
                  precise, gentle care that treats root causes rather than
                  temporary symptoms.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                    <h3 className="font-bold text-teal-900 mb-2 flex items-center space-x-2">
                      <UserCheck className="w-5 h-5 text-teal-600" />
                      <span>Individualized Treatment Plans</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      No cookie-cutter routines. Every plan is formulated
                      according to anatomical findings, posture assessments, and
                      patient comfort preferences.
                    </p>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                    <h3 className="font-bold text-teal-900 mb-2 flex items-center space-x-2">
                      <Award className="w-5 h-5 text-teal-600" />
                      <span>High Standards of Comfort</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Equipped with ergonomic SOT tables, custom pelvic blocks,
                      and gentle cranial tools for patients of all ages,
                      including infants and expecting mothers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Facility Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Clock className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 mb-1">
                    Flexible Scheduling
                  </h3>
                  <p className="text-xs text-slate-500">
                    Convenient morning & evening appointments available.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <MapPin className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 mb-1">
                    Accessible Location
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ample parking and full handicap accessibility.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Heart className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 mb-1">
                    Patient Comfort First
                  </h3>
                  <p className="text-xs text-slate-500">
                    Calming environment focused on peaceful healing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === "book" && (
          <div className="py-12 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-3xl mx-auto">
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Online Scheduling Portal
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                  Book Your Appointment
                </h1>
                <p className="mt-2 text-slate-600 text-sm">
                  Select your preferred consultation time below using our
                  interactive Google Appointment Scheduler.
                </p>
              </div>

              {/* Developer / Setup Bar for Google Calendar URL */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                    <Settings className="w-4 h-4 text-teal-600" />
                    <span>Google Calendar Scheduling Link Settings:</span>
                  </div>

                  <form
                    onSubmit={handleUrlSubmit}
                    className="flex-grow max-w-xl flex items-center space-x-2"
                  >
                    <input
                      type="url"
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      placeholder="https://calendar.app.google/ntU27R1JKFJLc2q27"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      type="submit"
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-4 py-2 rounded-xl flex-shrink-0 font-medium transition"
                    >
                      Update Iframe
                    </button>
                  </form>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  * Note for GitHub/Cloudflare deployment: Replace the input
                  above with your Google Workspace Appointment Scheduling link.
                </p>
              </div>

              {/* Embedded Interactive Google Calendar Frame Container */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
                <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-teal-400" />
                    <span className="font-semibold text-sm">
                      Live Appointment Scheduling Embed
                    </span>
                  </div>
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-teal-300 hover:text-white flex items-center space-x-1"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* iFrame Container */}
                <div className="w-full bg-slate-100 min-h-[600px] relative flex items-center justify-center">
                  <iframe
                    src={googleCalendarUrl}
                    style={{ border: 0 }}
                    width="100%"
                    height="650"
                    frameBorder="0"
                    scrolling="yes"
                    title="Google Appointment Scheduling"
                    className="w-full h-[650px]"
                    onError={() =>
                      showToast("Failed to load Google Calendar iframe link")
                    }
                  ></iframe>
                </div>
              </div>

              {/* Alternative / Offline Call Notice */}
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center space-y-3">
                <h3 className="font-bold text-teal-900 text-base">
                  Prefer to book over the phone?
                </h3>
                <p className="text-xs text-teal-700 max-w-md mx-auto">
                  Our front office staff will gladly answer your questions and
                  find a time slot that best fits your schedule.
                </p>
                <div className="pt-1">
                  <a
                    href="tel:5551234567"
                    className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Us at (555) 123-4567</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative">
            <button
              onClick={() => {
                setContactModalOpen(false);
                setFormSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Message Received!
                </h3>
                <p className="text-slate-600 text-sm">
                  Thank you for reaching out to Apex Wellness. Our clinical
                  coordinator will respond to your inquiry within 1 business
                  day.
                </p>
                <button
                  onClick={() => {
                    setContactModalOpen(false);
                    setFormSubmitted(false);
                  }}
                  className="bg-teal-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    Contact Apex Wellness
                  </h3>
                  <p className="text-xs text-slate-500">
                    Send us a general question or inquiry.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="(555) 000-0000"
                      className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Inquiry / Message
                  </label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Describe your health goals or general questions..."
                    className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition text-xs shadow-md"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {}
      <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white">
              <Stethoscope className="w-5 h-5 text-teal-400" />
              <span className="font-bold text-base tracking-wide">
                APEX WELLNESS
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Generic Chiropractic & Sacro Occipital Technique sample web
              template for public hosting on GitHub and Cloudflare Pages.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo("home")}
                  className="hover:text-teal-400"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("services")}
                  className="hover:text-teal-400"
                >
                  Services Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("conditions")}
                  className="hover:text-teal-400"
                >
                  Conditions Treated
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("about")}
                  className="hover:text-teal-400"
                >
                  About Practice
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("book")}
                  className="hover:text-teal-400"
                >
                  Book Online
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">
              Practice Hours
            </h4>
            <ul className="space-y-1.5">
              <li className="flex justify-between">
                <span className="text-slate-400">Monday - Thursday:</span>{" "}
                <span className="text-slate-200">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Friday:</span>{" "}
                <span className="text-slate-200">8:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Saturday:</span>{" "}
                <span className="text-slate-200">9:00 AM - 1:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Sunday:</span>{" "}
                <span className="text-slate-500">Closed</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">
              Location Contact
            </h4>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>100 Wellness Way, Suite 200</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>(555) 123-4567</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>info@apexwellnessclinic.example</span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800 text-center text-slate-500 flex flex-col sm:flex-row items-center justify-between">
          <p>
            © {new Date().getFullYear()} Apex Wellness & Chiropractic Clinic.
            Generic Template for Deployment.
          </p>
          <p className="mt-2 sm:mt-0 text-[11px]">
            Ready for Cloudflare Pages & GitHub Pages.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Custom Helper Icon Component for Cranial / Brain representation
function BrainIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.32M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.32M14.25 3.104c.251.023.501.05.75.082M19 14.32a2.25 2.25 0 01.659 1.591v2.839a2.25 2.25 0 01-.659 1.591l-2.091 2.091a2.25 2.25 0 01-1.591.659H8.682a2.25 2.25 0 01-1.591-.659L5 20.34a2.25 2.25 0 01-.659-1.591v-2.839c0-.597.237-1.17.659-1.591L9.75 9.41"
      />
    </svg>
  );
}
