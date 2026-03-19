import type { ReactNode } from 'react';

export default function CardWidget({ title, children, className = '' }: { title: string, children: ReactNode, className?: string }) {
  return (
    <div className={`bg-brand-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <h3 className="text-gray-500 font-semibold text-sm mb-4 tracking-wide uppercase">{title}</h3>
      <div className="h-full">
        {children}
      </div>
    </div>
  );
}
