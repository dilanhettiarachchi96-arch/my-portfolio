import { useState, useEffect, useRef } from "react";
import { Github, Mail, ExternalLink, Menu, X, ArrowUpRight, MessageCircle, Linkedin } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const TIMELINE = [
  {
    role: "Full-Stack Developer",
    org: "Self-employed · Remote",
    period: "2023 — Present",
    current: true,
    desc: "Building web and mobile products — from AI-integrated tools to educational platforms for Sri Lankan students. Working primarily with Next.js 14, React Native, Expo Router, and Supabase.",
    tags: ["Next.js", "React Native", "Supabase", "AI APIs"],
  },
  {
    role: "Mathematics Teacher",
    org: "Freelance · Colombo, Sri Lanka",
    period: "Ongoing",
    current: false,
    desc: "Teaching mathematics to secondary and A/L students. Developing structured lesson plans and practice materials to improve outcomes.",
    tags: ["Education", "Mentoring"],
  },
  {
    role: "Accountant",
    org: "Previous Employment",
    period: "Previous",
    current: false,
    desc: "Managed financial records, reconciliations, and reporting. Applied analytical and structured problem-solving in a professional environment.",
    tags: ["Finance", "Analytics"],
  },
  {
    role: "Lab Assistant",
    org: "Hycarb PLC · Sri Lanka",
    period: "Previous",
    current: false,
    desc: "Assisted in laboratory operations and technical procedures within an industrial environment, building attention to detail and process discipline.",
    tags: ["Science", "Industrial"],
  },
];

const PROJECTS = [
  {
    title: "PaperBook Lanka",
    description:
      "An exam paper platform built for Sri Lankan students — organised by grade, subject, and year. Helps students practice with real past papers without hunting through PDFs.",
    tags: ["Next.js 14", "Supabase", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    featured: true,
  },
  {
    title: "Open Source AI App",
    description:
      "An open-source AI-powered desktop application built with Electron for macOS.",
    tags: ["Electron", "React", "TypeScript", "SQLite"],
    github: "https://github.com",
    featured: true,
  },
  {
    title: "AI Study Buddy",
    description:
      "An AI-powered study assistant that generates practice questions and explains concepts from uploaded notes. Built with Next.js and integrated with OpenAI APIs.",
    tags: ["Next.js", "AI APIs", "Supabase", "React Native"],
    github: "https://github.com",
    featured: false,
  },
];

const SKILLS = [
  "Next.js 14",
  "React Native",
  "Expo Router",
  "TypeScript",
  "Supabase",
  "Electron",
  "AI APIs",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0e0e12]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-bold tracking-tight text-sm">
          <span className="text-violet-400">&lt;</span>dev
          <span className="text-violet-400">/&gt;</span>
        </span>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-zinc-400 hover:text-white text-sm transition-colors duration-200"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="mailto:dilanhettiarachchi18@gmail.com"
          className="hidden md:inline-flex items-center gap-2 text-sm text-violet-400 border border-violet-400/40 hover:border-violet-400/80 hover:bg-violet-400/5 px-4 py-1.5 rounded-full transition-all duration-200"
        >
          Hire me
        </a>

        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#0e0e12]/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-zinc-300 hover:text-white text-left text-sm transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-6 opacity-80">
          Available for work
        </p>

        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-none mb-6">
          Full-stack{" "}
          <span className="relative inline-block">
            developer
            <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
          </span>
          .<br />
          <span className="text-zinc-400 font-light">Building with AI.</span>
        </h1>

        <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-10">
          I build web and mobile apps — from AI-integrated tools to educational platforms for students across Sri Lanka.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-400 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-[0_0_24px_rgba(167,139,250,0.3)]"
          >
            View Projects <ArrowUpRight size={16} />
          </button>
          <a
            href="/cv.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-zinc-300 hover:text-white border border-white/10 hover:border-violet-400/50 hover:text-violet-300 px-6 py-3 rounded-full transition-all duration-200"
          >
            Download CV <ArrowUpRight size={16} />
          </a>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 px-6 py-3 rounded-full transition-all duration-200"
          >
            Contact Me
          </button>
        </div>

        <div className="mt-20 flex items-center justify-center gap-2 text-zinc-600">
          <span className="w-px h-10 bg-gradient-to-b from-transparent to-zinc-600 block" />
          <span className="text-xs tracking-widest uppercase rotate-0">scroll</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <p className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-4">About</p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="border-l-2 border-violet-500/50 pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug mb-5">
                I write code that solves real problems.
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                I'm a full-stack developer specialising in Next.js and React Native, focused on building fast, accessible web and mobile experiences. My work sits at the intersection of modern tooling and meaningful impact — particularly in EdTech and AI-integrated products.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Right now I'm building educational platforms that make quality resources accessible to students in Sri Lanka, alongside desktop tools and AI-powered apps that help people work and learn more effectively.
              </p>
              <p className="text-zinc-500 leading-relaxed text-sm">
                When I'm not shipping — I'm reading, contributing to open source, or figuring out how to make the next thing just a little more useful.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Web Apps", value: "Next.js 14", sub: "App Router · RSC" },
                { label: "Mobile", value: "React Native", sub: "Expo Router" },
                { label: "Database", value: "Supabase", sub: "PostgreSQL · Edge" },
                { label: "Desktop", value: "Electron", sub: "macOS · Windows" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:border-violet-500/30 transition-colors duration-300"
                >
                  <p className="text-zinc-600 text-xs mb-1">{item.label}</p>
                  <p className="text-white font-semibold text-sm">{item.value}</p>
                  <p className="text-zinc-500 text-xs mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`group relative bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-violet-500/40 hover:bg-violet-500/[0.03] transition-all duration-300 hover:shadow-[0_0_30px_rgba(167,139,250,0.07)] flex flex-col ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 80}ms`, transitionDuration: "600ms" }}
    >
      {project.featured && (
        <span className="absolute top-4 right-4 text-[10px] text-violet-400 border border-violet-400/30 px-2 py-0.5 rounded-full tracking-wider uppercase">
          Featured
        </span>
      )}

      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors duration-200">
        {project.title}
      </h3>
      <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-5">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] text-zinc-500 bg-white/[0.04] border border-white/5 px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href="https://github.com/dilanhettiarachchi96-arch"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-violet-400 text-xs transition-colors duration-200 w-fit"
      >
        <Github size={14} /> View on GitHub <ExternalLink size={11} />
      </a>
    </div>
  );
}

function TimelineItem({ item, index }: { item: (typeof TIMELINE)[0]; index: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`relative pl-10 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Dot */}
      <div
        className={`absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-2 flex items-center justify-center ${
          item.current
            ? "border-violet-400 bg-violet-500/20 shadow-[0_0_12px_rgba(167,139,250,0.5)]"
            : "border-zinc-700 bg-[#0e0e12]"
        }`}
      >
        {item.current && (
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
        )}
      </div>

      {/* Card */}
      <div
        className={`group rounded-2xl border p-5 transition-all duration-300 ${
          item.current
            ? "border-violet-500/30 bg-violet-500/[0.04] hover:border-violet-500/50"
            : "border-white/5 bg-white/[0.02] hover:border-white/10"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <div>
            <span className="text-white font-semibold text-base">{item.role}</span>
            {item.current && (
              <span className="ml-2.5 text-[10px] font-semibold tracking-wider uppercase text-violet-400 border border-violet-400/40 px-2 py-0.5 rounded-full">
                Current
              </span>
            )}
          </div>
          <span className="text-zinc-600 text-xs shrink-0">{item.period}</span>
        </div>
        <p className="text-zinc-500 text-xs mb-3">{item.org}</p>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{item.desc}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-zinc-500 bg-white/[0.03] border border-white/5 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <p className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-4">Experience</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-14">
            Career path.
          </h2>
        </RevealSection>

        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500 via-violet-500/40 to-transparent" />
          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.role} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <p className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-4">Projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            Things I've built.
          </h2>
        </RevealSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <p className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-4">Skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            My toolkit.
          </h2>
        </RevealSection>

        <div ref={ref} className="flex flex-wrap gap-3">
          {SKILLS.map((skill, i) => (
            <span
              key={skill}
              className={`text-sm text-zinc-300 bg-white/[0.04] border border-white/5 hover:border-violet-500/50 hover:text-violet-300 hover:bg-violet-500/[0.05] px-4 py-2 rounded-full cursor-default transition-all duration-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 50}ms`, transitionDuration: "500ms" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <div className="border border-white/5 rounded-2xl bg-white/[0.02] p-10 sm:p-14 text-center">
            <p className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-4">Contact</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-5">
              Let's build something.
            </h2>
            <p className="text-zinc-400 max-w-md mx-auto mb-10 leading-relaxed">
              Whether it's a project, a question, or just a hello — my inbox is open.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:dilanhettiarachchi18@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-400 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-[0_0_24px_rgba(167,139,250,0.3)]"
              >
                <Mail size={16} /> Send an email
              </a>
              <a
                href="https://wa.me/94761935808"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-zinc-300 hover:text-white border border-white/10 hover:border-green-500/50 hover:text-green-400 px-6 py-3 rounded-full transition-all duration-200"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href="https://github.com/dilanhettiarachchi96-arch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 px-6 py-3 rounded-full transition-all duration-200"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dilan-hettiarachchi-07b621418/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-zinc-300 hover:text-white border border-white/10 hover:border-blue-500/50 hover:text-blue-400 px-6 py-3 rounded-full transition-all duration-200"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-zinc-600 text-sm">
          © 2026 Dilan Hettiarachchi
        </span>
        <div className="flex items-center gap-5">
          <a href="mailto:dilanhettiarachchi18@gmail.com" className="text-zinc-600 hover:text-zinc-300 transition-colors">
            <Mail size={16} />
          </a>
          <a
            href="https://wa.me/94761935808"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-green-400 transition-colors"
          >
            <MessageCircle size={16} />
          </a>
          <a
            href="https://github.com/dilanhettiarachchi96-arch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/dilan-hettiarachchi-07b621418/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-blue-400 transition-colors"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#0e0e12] text-white font-sans">
      <Nav />
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
