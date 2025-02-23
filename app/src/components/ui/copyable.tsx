"use client"

import * as React from "react"
import { Clipboard } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"

interface CopyableProps {
  text: string
  label?: string
  className?: string
  showToast?: boolean
  tooltipMessage?: string
  toastMessage?: string
  errorMessage?: string
}

export function Copyable({
  text,
  label,
  className,
  showToast = true,
  tooltipMessage = "Copiado!",
  toastMessage = "Texto copiado!",
  errorMessage = "Erro ao copiar o texto",
}: CopyableProps) {
  const [showTooltip, setShowTooltip] = React.useState(false)

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback para browsers mais antigos
        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          document.execCommand("copy")
        } finally {
          textArea.remove()
        }
      }

      // Mostra o tooltip
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2000)

      // Mostra o toast se necessário
      if (showToast) {
        toast.success(toastMessage)
      }
    } catch (error) {
      console.error("Erro ao copiar texto:", error)
      if (showToast) {
        toast.error(errorMessage)
      }
    }
  }

  return (
    <TooltipProvider>
      <Tooltip open={showTooltip}>
        <TooltipTrigger asChild>
          <span
            className={`inline-flex cursor-pointer items-center gap-1 hover:text-primary ${className}`}
            onClick={copyToClipboard}
          >
            {label && <span>{label}: </span>}
            <code className="rounded bg-muted px-1 py-0.5">{text}</code>
            <Clipboard className="h-4 w-4" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
