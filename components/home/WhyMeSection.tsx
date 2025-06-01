import { CheckCircle, BrainCircuit, Settings2, Rocket, Handshake, Compass } from 'lucide-react';

const reasons = [
  {
    icon: <BrainCircuit className="w-6 h-6 text-blue-500" />,
    title: 'Tech + Business Mindset',
    description: 'I connect deep technical skills with a clear understanding of business needs, ensuring every solution is aligned with measurable value.',
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
    title: 'Results-Driven',
    description: 'I don’t build buzzwords — I design intelligent systems that automate, optimize, and create tangible impact.',
  },
  {
    icon: <Settings2 className="w-6 h-6 text-blue-500" />,
    title: 'Full-Stack Versatility',
    description: 'From AI models to backend APIs, from dashboards to deployment — I cover the entire technical stack without compromise.',
  },
  {
    icon: <Handshake className="w-6 h-6 text-blue-500" />,
    title: 'Transparent Collaboration',
    description: 'You get clarity at every step: constant feedback loops, lean documentation, and proactive updates.',
  },
  {
    icon: <Rocket className="w-6 h-6 text-blue-500" />,
    title: 'Flexible Engagement',
    description: 'I adapt to your rhythm: fixed projects, hourly packages, or strategic support on demand.',
  },
  {
    icon: <Compass className="w-6 h-6 text-blue-500" />, 
    title: 'Long-Term Technical Thinking',
    description: 'I design systems and architectures built to scale — not just for delivery, but for sustainability, autonomy, and future growth.',
  }
];

export default function WhyMeSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">
          Why Work With Me
        </h2>
        <p className="text-gray-400 mb-12 text-lg">
          A unique blend of software engineering, AI expertise, and a pragmatic business approach — here’s what sets me apart.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 p-6 rounded-2xl shadow-sm text-left"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{reason.title}</h3>
              <p className="text-sm text-white">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}