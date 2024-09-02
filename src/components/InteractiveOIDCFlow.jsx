import React, { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import mermaid from 'mermaid'
import { oidcSteps } from '../oidcSteps'

const InteractiveOIDCFlow = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const mermaidRef = useRef(null)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true })
    renderDiagram()
  }, [currentStep])

  const renderDiagram = () => {
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = ''
      mermaid
        .render(`mermaid-${currentStep}`, oidcSteps[currentStep].diagram)
        .then((result) => {
          mermaidRef.current.innerHTML = result.svg
        })
    }
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, oidcSteps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle>Interactive OpenID Connect Flow</CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {oidcSteps.length}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <h3 className='text-lg font-semibold'>
          {oidcSteps[currentStep].title}
        </h3>
        <p className='text-md'>{oidcSteps[currentStep].description}</p>
        {oidcSteps[currentStep].details && (
          <details className='mt-2'>
            <summary className='cursor-pointer text-sm text-blue-600'>
              View Technical Details
            </summary>
            <pre className='mt-2 p-2 bg-gray-100 rounded text-sm overflow-x-auto'>
              {oidcSteps[currentStep].details}
            </pre>
          </details>
        )}
        <div className='border p-4 bg-gray-100'>
          <div ref={mermaidRef}></div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={prevStep} disabled={currentStep === 0}>
          <ArrowLeft className='mr-2 h-4 w-4' /> Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={currentStep === oidcSteps.length - 1}
        >
          Next <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default InteractiveOIDCFlow
