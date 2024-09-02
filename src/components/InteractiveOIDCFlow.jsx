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

const InteractiveOIDCFlow = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const mermaidRef = useRef(null)

  const steps = [
    {
      title: '1. User Attempts to Access Protected Resource',
      description:
        'The user tries to access a resource in the Client Application that requires authentication.',
      diagram: `sequenceDiagram
      actor User
      participant Client as Client Application
      User->>Client: Attempts to access protected resource`,
    },
    {
      title: '2. Client Redirects to Authorization Server',
      description:
        'The Client Application redirects the user to the Authorization Server for authentication.',
      diagram: `sequenceDiagram
      actor User
      participant Client as Client Application
      participant AS as Authorization Server
      User->>Client: Attempts to access protected resource
      Client->>AS: Redirects user to Authorization Server`,
    },
    {
      title: '3. Authorization Server Prompts for Authentication',
      description:
        'The Authorization Server presents a login interface to the user.',
      diagram: `sequenceDiagram
      actor User
      participant AS as Authorization Server
      AS->>User: Prompts user for authentication`,
    },
    {
      title: '4. User Provides Credentials',
      description:
        'The user enters their credentials (e.g., username and password) to the Authorization Server.',
      diagram: `sequenceDiagram
      actor User
      participant AS as Authorization Server
      User->>AS: Provides credentials`,
    },
    {
      title: '5. Authorization Server Issues Code',
      description:
        'After successful authentication, the Authorization Server redirects the user back to the Client Application with an authorization code.',
      diagram: `sequenceDiagram
      participant AS as Authorization Server
      participant Client as Client Application
      AS->>Client: Redirects with authorization code`,
    },
    {
      title: '6. Client Exchanges Code for Tokens',
      description:
        'The Client Application sends the authorization code to the Authorization Server to exchange it for tokens.',
      diagram: `sequenceDiagram
      participant Client as Client Application
      participant AS as Authorization Server
      Client->>AS: Exchanges code for tokens`,
    },
    {
      title: '7. Authorization Server Returns Tokens',
      description:
        'The Authorization Server validates the code and returns an ID token and an access token to the Client Application.',
      diagram: `sequenceDiagram
      participant AS as Authorization Server
      participant Client as Client Application
      AS->>Client: Returns ID token and access token`,
    },
    {
      title: '8. Client Requests Protected Resource',
      description:
        'The Client Application uses the access token to request the protected resource from the Resource Server.',
      diagram: `sequenceDiagram
      participant Client as Client Application
      participant RS as Resource Server
      Client->>RS: Requests resource with access token`,
    },
    {
      title: '9. Resource Server Returns Protected Resource',
      description:
        'The Resource Server validates the access token and, if valid, returns the requested protected resource to the Client Application.',
      diagram: `sequenceDiagram
      participant RS as Resource Server
      participant Client as Client Application
      RS->>Client: Returns protected resource`,
    },
    {
      title: '10. Client Displays Protected Resource',
      description:
        'The Client Application presents the protected resource to the user, completing the authentication and authorization process.',
      diagram: `sequenceDiagram
      participant Client as Client Application
      actor User
      Client->>User: Displays protected resource`,
    },
  ]

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true })
    renderDiagram()
  }, [currentStep])

  const renderDiagram = () => {
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = ''
      mermaid
        .render(`mermaid-${currentStep}`, steps[currentStep].diagram)
        .then((result) => {
          mermaidRef.current.innerHTML = result.svg
        })
    }
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle>Interactive OpenID Connect Flow</CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {steps.length}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <h3 className='text-lg font-semibold'>{steps[currentStep].title}</h3>
        <p className='text-md'>{steps[currentStep].description}</p>
        <div className='border p-4 bg-gray-100'>
          <div ref={mermaidRef}></div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={prevStep} disabled={currentStep === 0}>
          <ArrowLeft className='mr-2 h-4 w-4' /> Previous
        </Button>
        <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
          Next <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default InteractiveOIDCFlow
