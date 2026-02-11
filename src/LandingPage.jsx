import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Check, Star, ArrowRight, Zap, Shield, TrendingUp, Users, Award, Globe, Sparkles, Play } from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [stats, setStats] = useState({ clients: 0, projects: 0, satisfaction: 0, years: 0 });
  const [visibleSections, setVisibleSections] = useState({});
  const [chartHeights, setChartHeights] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targets = { clients: 500, projects: 1200, satisfaction: 98, years: 10 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        clients: Math.floor(targets.clients * progress),
        projects: Math.floor(targets.projects * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
        years: Math.floor(targets.years * progress)
      });
      if (step >= steps) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, []);

  // Animate chart bars when visible
  useEffect(() => {
    if (visibleSections.hero) {
      const targetHeights = [40, 60, 45, 75, 55, 85, 70, 95];
      targetHeights.forEach((height, index) => {
        setTimeout(() => {
          setChartHeights(prev => {
            const newHeights = [...prev];
            newHeights[index] = height;
            return newHeights;
          });
        }, index * 100);
      });
    }
  }, [visibleSections.hero]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Inovasi AI & Machine Learning",
      description: "Teknologi artificial intelligence terdepan untuk automasi dan insight bisnis",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Keamanan Enterprise",
      description: "Sistem keamanan berlapis dengan enkripsi bank-grade dan compliance",
      icon: <Shield className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Skalabilitas Tinggi",
      description: "Infrastruktur cloud yang dapat berkembang seiring pertumbuhan bisnis",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Tim Expert 24/7",
      description: "Support premium dari tim bersertifikat internasional siaga round-the-clock",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const services = [
    {
      name: "Starter",
      price: "5 Juta",
      period: "/bulan",
      description: "Sempurna untuk startup dan bisnis kecil",
      features: [
        "Konsultasi strategi bisnis",
        "Website responsif modern",
        "SEO optimization dasar",
        "Support email",
        "Analytics dashboard"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "15 Juta",
      period: "/bulan",
      description: "Solusi lengkap untuk bisnis berkembang",
      features: [
        "Semua fitur Starter",
        "Mobile app development",
        "Advanced analytics & AI",
        "Digital marketing suite",
        "Priority support 24/7",
        "Custom integrations",
        "Monthly strategy review"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Solusi enterprise dengan dedicated team",
      features: [
        "Semua fitur Professional",
        "Dedicated account manager",
        "Custom AI/ML solutions",
        "Multi-platform development",
        "Security audit & compliance",
        "White-label options",
        "Unlimited revisions"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      position: "CEO",
      company: "PT Maju Jaya",
      content: "Transformasi digital yang luar biasa! Revenue kami meningkat 300% dalam 6 bulan pertama. Tim yang sangat profesional dan responsif.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi"
    },
    {
      name: "Siti Nurhaliza",
      position: "Founder & CEO",
      company: "StartupHub Indonesia",
      content: "Platform yang mereka bangun mengubah cara kami berbisnis. Automation dan AI features benar-benar game changer untuk operasional kami.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti"
    },
    {
      name: "Ahmad Fadil",
      position: "Marketing Director",
      company: "TechVentures Asia",
      content: "ROI yang incredible! Dari investasi awal, kami sudah break even dalam 3 bulan. Support team mereka exceptional, selalu siap membantu.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad"
    }
  ];

  const clients = [
    "TechCorp", "InnovateLab", "FutureScale", "DataDriven", "CloudNine", "SmartOps"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 text-[15px]">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        .stagger-7 { animation-delay: 0.7s; }

        .opacity-0 {
          opacity: 0;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 animate-slideDown ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                NexaTech
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#hero" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Beranda</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Fitur</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Layanan</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Testimoni</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Kontak</a>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t shadow-xl animate-fadeIn">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <a href="#hero" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">Beranda</a>
              <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">Fitur</a>
              <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">Layanan</a>
              <a href="#testimonials" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">Testimoni</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">Kontak</a>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold mt-4 text-sm">
                Mulai Gratis
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={(el) => (sectionRefs.current.hero = el)} className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-purple-200 shadow-sm opacity-0 animate-fadeInUp">
                <Award className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-xs font-semibold text-gray-700">Trusted by 500+ Companies</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight opacity-0 animate-fadeInUp stagger-1">
                Transformasi
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Digital Masa Depan
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 leading-relaxed opacity-0 animate-fadeInUp stagger-2">
                Wujudkan potensi penuh bisnis Anda dengan teknologi AI, cloud computing, dan strategi digital yang telah terbukti meningkatkan revenue hingga 300%.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fadeInUp stagger-3">
                <button className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg text-sm font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center">
                  Konsultasi Gratis
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group bg-white text-gray-700 px-6 py-3 rounded-lg text-sm font-bold hover:shadow-xl transition-all border-2 border-gray-200 hover:border-purple-400 flex items-center justify-center">
                  <Play className="mr-2 w-4 h-4" />
                  Lihat Demo
                </button>
              </div>

              <div className="grid grid-cols-4 gap-6 pt-6 opacity-0 animate-fadeInUp stagger-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.clients}+</div>
                  <div className="text-xs text-gray-600">Klien</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.projects}+</div>
                  <div className="text-xs text-gray-600">Proyek</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.satisfaction}%</div>
                  <div className="text-xs text-gray-600">Puas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.years}+</div>
                  <div className="text-xs text-gray-600">Tahun</div>
                </div>
              </div>
            </div>

            <div className="relative opacity-0 animate-fadeInRight stagger-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Revenue Growth</div>
                          <div className="text-xl font-bold text-gray-900">+340%</div>
                        </div>
                      </div>
                      <div className="text-green-500 text-xs font-semibold">↑ 45%</div>
                    </div>

                    <div className="h-32 bg-gradient-to-t from-blue-50 to-purple-50 rounded-xl flex items-end justify-around p-3">
                      {chartHeights.map((height, i) => (
                        <div 
                          key={i} 
                          className="w-6 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-md transition-all duration-500 hover:scale-110 ease-out" 
                          style={{height: `${height}%`}}
                        ></div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
                        <div className="text-xl font-bold text-blue-900">1.2k+</div>
                        <div className="text-xs text-blue-700">Active Users</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
                        <div className="text-xl font-bold text-purple-900">98%</div>
                        <div className="text-xs text-purple-700">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section 
        id="trusted"
        ref={(el) => (sectionRefs.current.trusted = el)}
        className="py-10 px-4 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-6 ${visibleSections.trusted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <p className="text-gray-500 font-medium text-sm">Dipercaya oleh perusahaan terkemuka</p>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-6 gap-6 items-center opacity-50 ${visibleSections.trusted ? 'animate-fadeIn' : 'opacity-0'}`}>
            {clients.map((client, idx) => (
              <div key={idx} className="text-center">
                <div className="text-lg font-bold text-gray-400">{client}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        ref={(el) => (sectionRefs.current.features = el)}
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 ${visibleSections.features ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
              FITUR UNGGULAN
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Teknologi yang Membuat <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Perbedaan</span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Dilengkapi dengan teknologi terdepan dan infrastruktur enterprise-grade untuk memastikan kesuksesan bisnis Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`group relative ${visibleSections.features ? 'animate-fadeInUp' : 'opacity-0'} stagger-${idx + 1}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl" style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`}}></div>
                <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 h-full">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services" 
        ref={(el) => (sectionRefs.current.services = el)}
        className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 ${visibleSections.services ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
              PAKET LAYANAN
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Pilih Paket yang <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Tepat</span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Investasi yang fleksibel dengan ROI terukur. Mulai dari startup hingga enterprise
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className={`relative ${service.popular ? 'lg:-mt-3 lg:mb-3' : ''} ${visibleSections.services ? 'animate-scaleIn' : 'opacity-0'} stagger-${idx + 1}`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5">
                      <Star className="w-3 h-3 fill-current" />
                      <span>PALING POPULER</span>
                    </div>
                  </div>
                )}
                <div className={`bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col ${
                  service.popular ? 'ring-4 ring-blue-500 ring-offset-4' : ''
                }`}>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1.5">{service.name}</h3>
                    <p className="text-gray-600 text-xs">{service.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-3xl font-black text-gray-900">{service.price}</span>
                      <span className="text-gray-500 ml-2 mb-1 text-sm">{service.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="text-green-600 w-3 h-3" />
                        </div>
                        <span className="text-gray-700 ml-2.5 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 rounded-lg font-bold text-sm transition-all transform hover:scale-105 ${
                    service.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-2xl' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    Mulai Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        ref={(el) => (sectionRefs.current.testimonials = el)}
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 ${visibleSections.testimonials ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="inline-block bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
              TESTIMONI
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Kisah <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Sukses</span> Klien Kami
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Lebih dari 500 perusahaan telah mempercayai kami untuk transformasi digital mereka
            </p>
          </div>

          <div className={`relative max-w-5xl mx-auto ${visibleSections.testimonials ? 'animate-scaleIn' : 'opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img 
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-20 h-20 rounded-full border-4 border-purple-200"
                />
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-3">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 mb-4 italic leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{testimonials[activeTestimonial].name}</div>
                    <div className="text-gray-600 text-sm">{testimonials[activeTestimonial].position} - {testimonials[activeTestimonial].company}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === activeTestimonial 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="contact" 
        ref={(el) => (sectionRefs.current.contact = el)}
        className="py-16 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className={`max-w-4xl mx-auto text-center relative z-10 ${visibleSections.contact ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Siap Memulai Transformasi?
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed">
            Dapatkan konsultasi gratis dan discovery session senilai 10 juta rupiah. Kami akan bantu identifikasi peluang growth bisnis Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-white text-blue-600 px-8 py-3.5 rounded-lg text-base font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center">
              Jadwalkan Konsultasi
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white text-white px-8 py-3.5 rounded-lg text-base font-bold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center">
              <Globe className="mr-2 w-5 h-5" />
              Lihat Portfolio
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-white/90 text-sm">
            <div className="flex items-center space-x-1.5">
              <Check className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Check className="w-4 h-4" />
              <span>14-day free trial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NexaTech</span>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Transformasi digital untuk masa depan yang lebih cerah. Kami membantu bisnis berkembang dengan teknologi terdepan dan strategi yang proven.
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition text-xs">
                  f
                </div>
                <div className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition text-xs">
                  tw
                </div>
                <div className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition text-xs">
                  in
                </div>
                <div className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition text-xs">
                  ig
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-base mb-4">Perusahaan</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-gray-400 hover:text-white transition flex items-center group text-sm">
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition -ml-4 group-hover:ml-0" />
                  <span>Tentang Kami</span>
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition flex items-center group text-sm">
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition -ml-4 group-hover:ml-0" />
                  <span>Karir</span>
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition flex items-center group text-sm">
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition -ml-4 group-hover:ml-0" />
                  <span>Blog & News</span>
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition flex items-center group text-sm">
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition -ml-4 group-hover:ml-0" />
                  <span>Press Kit</span>
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-base mb-4">Layanan</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-gray-400 hover:text-white transition flex items-center group text-sm">
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition -ml-4 group-hover:ml-0" />
                  <span>Konsultasi</span>
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition flex items-center group text-sm">
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition -ml-4 group-hover:ml-0" />
                  <span>Development</span>
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition flex items-center group text-sm">
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition -ml-4 group-hover:ml-0" />
                  <span>Digital Marketing</span>
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition flex items-center group text-sm">
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition -ml-4 group-hover:ml-0" />
                  <span>Support 24/7</span>
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-base mb-4">Kontak</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start">
                  <Globe className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Jakarta Selatan<br />Indonesia 12345</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📧</span>
                  <a href="mailto:info@nexatech.id" className="hover:text-white transition">info@nexatech.id</a>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📱</span>
                  <a href="tel:+6281234567890" className="hover:text-white transition">+62 812-3456-7890</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <p className="text-gray-400 text-xs">
                &copy; 2025 NexaTech. All rights reserved. Crafted with ❤️ in Indonesia
              </p>
              <div className="flex space-x-5 text-xs">
                <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}