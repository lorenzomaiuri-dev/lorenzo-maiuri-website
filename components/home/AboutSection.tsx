import { BrainCircuit, Lightbulb, Settings } from 'lucide-react';

export default function ExpertiseSection() {
    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-4">
                <h2
                    className="text-4xl font-bold text-center mb-6"
                >
                    My Expertise
                </h2>
                <p
                    className="text-lg text-gray-400 text-center mb-12"
                >
                    A skill set to address complex challenges.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div
                        className="bg-zinc-900 rounded-lg shadow-md p-10 flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center mb-6 shadow-inner">
                            <BrainCircuit size={40} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Machine Learning & AI</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Leveraging advanced algorithms and AI techniques to develop smart solutions and drive innovation.
                        </p>
                    </div>

                    <div
                        className="bg-zinc-900 rounded-lg shadow-md p-10 flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center mb-6 shadow-inner">
                            <Lightbulb size={40} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Innovative Solutions</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Combining technical expertise with a deep understanding of business needs to create tailored, high-impact solutions.
                        </p>
                    </div>

                    <div
                        className="bg-zinc-900 rounded-lg shadow-md p-10 flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center mb-6 shadow-inner">
                            <Settings size={40} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Automation & Efficiency</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Process optimization and improved operational efficiency through strategic automation and intelligent systems.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}