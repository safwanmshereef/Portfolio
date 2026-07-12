"use client";

import { motion } from "framer-motion";
import { Briefcase, Award, GraduationCap, Building2 } from "lucide-react";

export default function Experience() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-24 relative border-t-2 border-slate/50">
      <div className="mb-16">
        <h2 className="text-4xl font-display font-bold uppercase tracking-widest flex items-center space-x-4">
          <Briefcase className="text-radiant-gold" />
          <span>Professional Arc</span>
        </h2>
        <p className="font-mono text-cream/50 mt-2">Internships, Milestones & Academic Background.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Column: Work Experience */}
        <div className="space-y-8">
          <h3 className="text-2xl font-display font-bold uppercase flex items-center space-x-2 text-neon-teal">
            <Building2 />
            <span>Work Experience</span>
          </h3>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="manga-panel p-6 border-l-4 border-l-neon-teal relative overflow-hidden"
          >
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'var(--screentone)' }} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-display font-bold text-xl" style={{ color: 'var(--theme-color)' }}>Software Engineer Intern</h4>
                <span className="font-mono text-xs bg-neon-teal/10 text-neon-teal px-2 py-1 rounded">Jan 2026 – Present</span>
              </div>
              <p className="font-mono text-sm text-sunset-orange mb-4">Freshivores • Bangalore, Karnataka (Onsite)</p>

              <ul className="space-y-3 font-mono text-sm text-cream/80 list-disc pl-4 marker:text-neon-teal">
                <li>
                  Architected and delivered <strong className="text-cream">5-10 asynchronous RESTful API endpoints</strong> using Python and FastAPI, ensuring low latency and reliability for core application features.
                </li>
                <li>
                  Integrated frontend interfaces with backend services; wrote type-safe code and <strong className="text-cream">optimized SQL queries</strong> to reduce technical debt and improve database performance.
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="manga-panel p-6 border-l-4 border-l-cherry-pink relative overflow-hidden mt-6"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'var(--screentone)' }} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-display font-bold text-xl" style={{ color: 'var(--theme-color)' }}>Data Engineer Apprentice</h4>
                <span className="font-mono text-xs bg-cherry-pink/10 text-cherry-pink px-2 py-1 rounded whitespace-nowrap ml-2">Jun 2025 – Dec 2025</span>
              </div>
              <p className="font-mono text-sm text-cherry-pink mb-4">Knowit Education • Kochi, Kerala (On-site)</p>

              <ul className="space-y-3 font-mono text-sm text-cream/80 list-disc pl-4 marker:text-cherry-pink">
                <li>
                  Optimized <strong className="text-cream">PostgreSQL databases</strong>, writing queries to support dynamic website content and user activity tracking.
                </li>
                <li>
                  Engineered <strong className="text-cream">Python automation scripts</strong> to schedule daily data backups, perform data validation, and clean user activity logs, significantly reducing manual intervention.
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="manga-panel p-6 border-l-4 border-l-radiant-gold relative overflow-hidden mt-6"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'var(--screentone)' }} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-display font-bold text-xl" style={{ color: 'var(--theme-color)' }}>Python Developer Intern</h4>
                <span className="font-mono text-xs bg-radiant-gold/10 text-radiant-gold px-2 py-1 rounded">Sep 2024 – Mar 2025</span>
              </div>
              <p className="font-mono text-sm text-sunset-orange mb-4">Singularis Software Technologies • Kochi, Kerala (Hybrid)</p>

              <ul className="space-y-3 font-mono text-sm text-cream/80 list-disc pl-4 marker:text-radiant-gold">
                <li>
                  Built scalable automation scripts using advanced Python (OOP, multithreading); applied <strong className="text-cream">Linear Regression</strong> for data trend prediction and automated CSV/Excel workflows, <strong className="text-cream">reducing manual effort by 30%</strong>.
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="manga-panel p-6 border-l-4 border-l-sunset-orange relative overflow-hidden mt-6"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'var(--screentone)' }} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-display font-bold text-xl" style={{ color: 'var(--theme-color)' }}>AI & Computer Vision Intern</h4>
                <span className="font-mono text-xs bg-sunset-orange/10 text-sunset-orange px-2 py-1 rounded">Apr 2023 – May 2023</span>
              </div>
              <p className="font-mono text-sm text-sunset-orange mb-4">Techmaghi • Kochi, Kerala (Hybrid)</p>

              <ul className="space-y-3 font-mono text-sm text-cream/80 list-disc pl-4 marker:text-sunset-orange">
                <li>
                  Designed and deployed real-time object detection networks using <strong className="text-cream">TensorFlow and OpenCV</strong>; fine-tuned preprocessing pipelines, <strong className="text-cream">improving detection accuracy by 20%</strong>.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Certifications & Education */}
        <div className="space-y-8">
          {/* Certifications */}
          <h3 className="text-2xl font-display font-bold uppercase flex items-center space-x-2 text-radiant-gold">
            <Award />
            <span>Certifications</span>
          </h3>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="manga-panel p-4 flex items-start space-x-4">
              <div className="p-2 bg-radiant-gold/10 rounded">
                <Award className="text-radiant-gold" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-cream">Ethical Hacking Associate (EHA)</h4>
                <p className="font-mono text-xs text-cream/60 mt-1">EC-Council Certification validating cybersecurity principles, penetration testing methodologies, and defensive strategies.</p>
              </div>
            </div>

            <div className="manga-panel p-4 flex items-start space-x-4">
              <div className="p-2 bg-radiant-gold/10 rounded">
                <Award className="text-radiant-gold" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-cream">IELTS Certification</h4>
                <p className="font-mono text-xs text-cream/60 mt-1">Overall Band Score of 7.0. Verified international corporate business communication standard.</p>
              </div>
            </div>

            <div className="manga-panel p-4 flex items-start space-x-4">
              <div className="p-2 bg-radiant-gold/10 rounded">
                <Award className="text-radiant-gold" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-cream">Google Cloud AI Infrastructure</h4>
                <p className="font-mono text-xs text-cream/60 mt-1">6x Specialized Certifications validating deep technical expertise across scalable compute setups, secure data handling, and optimized AI model deployment boundaries.</p>
              </div>
            </div>

            <div className="manga-panel p-4 flex items-start space-x-4">
              <div className="p-2 bg-radiant-gold/10 rounded">
                <Award className="text-radiant-gold" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-cream">TCS iON Professional Strategy</h4>
                <p className="font-mono text-xs text-cream/60 mt-1">Certified in Corporate Etiquette, Critical Thinking, and Systemic Problem-Solving Frameworks.</p>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <h3 className="text-2xl font-display font-bold uppercase flex items-center space-x-2 text-sunset-orange pt-4">
            <GraduationCap />
            <span>Academic Foundation</span>
          </h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="manga-panel p-5 border-l-4 border-l-sunset-orange">
               <h4 className="font-bold text-lg">Bachelor of Technology (B.Tech)</h4>
               <p className="font-mono text-xs text-sunset-orange mt-1">Computer Science and Engineering</p>
               <p className="font-mono text-sm text-cream/70 mt-2">College of Engineering Kidangoor</p>
               <p className="font-mono text-xs text-cream/50 mt-1">Graduation: August 2025</p>
            </div>

            <div className="manga-panel p-5 border-l-4 border-l-sunset-orange">
               <h4 className="font-bold text-lg">Higher Secondary Education (12th Grade)</h4>
               <p className="font-mono text-sm text-cream/70 mt-2">Good Shepherd Public School</p>
               <p className="font-mono text-xs text-cream/50 mt-1">Completed: July 2021</p>
            </div>

            <div className="manga-panel p-5 border-l-4 border-l-sunset-orange">
               <h4 className="font-bold text-lg">Secondary Education (10th Grade)</h4>
               <p className="font-mono text-sm text-cream/70 mt-2">Good Shepherd Public School</p>
               <p className="font-mono text-xs text-cream/50 mt-1">Completed: May 2019</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
