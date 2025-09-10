'use client';

interface PhaseIndicatorProps {
  currentPhase: number;
}

export default function PhaseIndicator({ currentPhase }: PhaseIndicatorProps) {
  const phases = [
    { number: 1, name: 'Context Gathering', color: 'bg-blue-500' },
    { number: 2, name: 'Confirming Question', color: 'bg-yellow-500' },
    { number: 3, name: 'Statistical Forecast', color: 'bg-green-500' },
    { number: 4, name: 'Citations', color: 'bg-purple-500' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center justify-between">
        {phases.map((phase) => (
          <div key={phase.number} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                currentPhase >= phase.number ? phase.color : 'bg-gray-300'
              }`}
            >
              {phase.number}
            </div>
            <span className="ml-2 text-sm text-gray-600">{phase.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}