import { Check } from 'lucide-react'

interface Step {
  number: number
  title: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                currentStep >= step.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {currentStep > step.number ? (
                <Check className="h-5 w-5" />
              ) : (
                step.number
              )}
            </div>
            <div className="mt-2 text-center">
              <div className="text-sm font-medium text-slate-900">
                {step.title}
              </div>
              <div className="text-xs text-slate-500">{step.description}</div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`mx-4 h-px flex-1 ${currentStep > step.number ? 'bg-blue-600' : 'bg-slate-200'}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
