import React from 'react';
import { Award, Briefcase } from 'lucide-react';
import { type ChatResponse } from '@/lib/types';

interface ChatContentRendererProps {
  action: ChatResponse['action'];
}

const ChatContentRenderer: React.FC<ChatContentRendererProps> = ({ action }) => {
  if (!action) return null;

  switch (action.action_type) {
    case 'show_bio':
      return (
        <p className="text-sm whitespace-pre-wrap">{action.data.bio}</p>
      );
    case 'show_projects':
      return (
        <div className="space-y-4 mt-2">
          {action.data.projects.map((exp, i) => (
            <div key={i} className="border-b border-zinc-700 pb-4 last:border-b-0">
              <h4 className="font-semibold text-base flex items-center text-gray-100">
                <Briefcase className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                {exp.title}
              </h4>
              <p className="text-xs text-gray-300 mt-1 whitespace-pre-wrap">{exp.description}</p>
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium text-xs text-gray-300 mb-1">Techs:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, techIdx) => (
                      <span key={techIdx} className="bg-zinc-700 text-green-300 text-xs font-medium px-2 py-0.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    case 'show_skills':
      return (
        <div className="space-y-3 mt-2">
          {Object.entries(action.data.skills as Record<string, string[]>).map(([category, items]) => (
            <div key={category}>
              <p className="font-semibold capitalize mb-1 text-gray-100">{category.replace(/_/g, ' ')}:</p>
              <div className="flex flex-wrap gap-2">
                {items.map((item, i) => (
                  <span key={i} className="bg-blue-800 text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case 'show_experience':
      return (
        <div className="space-y-4 mt-2">
          {(action.data.experience as any[]).map((exp, i) => (
            <div key={i} className="border border-zinc-700 rounded-lg p-3 bg-zinc-900">
              <h4 className="font-semibold text-base text-gray-100">{exp.title}</h4>
              <p className="text-blue-400 text-xs">{exp.company} ({exp.period})</p>
              <p className="text-xs text-gray-300 mt-1 whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </div>
      );
    case 'show_certifications':
      return (
        <div className="space-y-2 mt-2">
          {(action.data.certifications as any[]).map((cert, i) => (
            <div key={i} className="border border-zinc-700 rounded-lg p-3 flex items-center bg-zinc-900"> 
              <Award className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-100">{cert.name}</p>
                <p className="text-xs text-gray-300">Year: {cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default ChatContentRenderer;