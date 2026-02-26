"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Info } from "lucide-react"

export default function Home() {
  const [inputValue, setInputValue] = useState("")

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <Badge variant="secondary">shadcn/ui</Badge>
          </div>
          <CardDescription>A quick tour of the most common components.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Alert */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              This page shows 5 of the most popular shadcn components.
            </AlertDescription>
          </Alert>

          {/* Input */}
          <Input
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <div className="flex gap-2">
            {/* Dialog trigger */}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="flex-1 text-base">Get Started</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>You clicked Get Started!</DialogTitle>
                  <DialogDescription>
                    {inputValue
                      ? `You typed: "${inputValue}"`
                      : "Try typing something in the input above first."}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="lg" onClick={() => setInputValue("")}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
