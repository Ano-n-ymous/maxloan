interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepNames?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepNames }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {stepNames && (
        <div className="flex justify-between mb-2 text-sm font-medium">
          {stepNames.map((name, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            return (
              <div
                key={name}
                className={`flex items-center ${
                  isActive ? 'text-kenya-green font-semibold' : isCompleted ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 text-xs ${
                    isActive
                      ? 'bg-kenya-green text-white'
                      : isCompleted
                      ? 'bg-green-100 text-kenya-green'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </span>
                <span className="hidden sm:inline">{name}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-kenya-green transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
