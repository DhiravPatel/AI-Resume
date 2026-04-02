"use client"

import { useEffect, useRef, useState } from "react"
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileCode, 
  GitBranch,
  Clock,
  User,
  MessageSquare
} from "lucide-react"

const reviewComments = [
  {
    type: "error",
    line: 23,
    message: "Potential SQL injection vulnerability. Use parameterized queries.",
    file: "api/users.ts",
    severity: "high",
  },
  {
    type: "warning",
    line: 45,
    message: "Consider using async/await instead of .then() chains for better readability.",
    file: "services/auth.ts",
    severity: "medium",
  },
  {
    type: "success",
    line: 67,
    message: "Good use of TypeScript generics. This pattern improves type safety.",
    file: "utils/helpers.ts",
    severity: "low",
  },
]

const files = [
  { name: "api/users.ts", changes: "+42 -12", status: "modified" },
  { name: "services/auth.ts", changes: "+18 -5", status: "modified" },
  { name: "utils/helpers.ts", changes: "+8 -0", status: "added" },
  { name: "types/index.ts", changes: "+15 -3", status: "modified" },
]

function ReviewComment({ comment, index, isVisible }: { comment: typeof reviewComments[0]; index: number; isVisible: boolean }) {
  const getIcon = () => {
    switch (comment.type) {
      case "error": return <XCircle className="w-4 h-4 text-red-500" />
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "success": return <CheckCircle2 className="w-4 h-4 text-neon" />
    }
  }

  const getBg = () => {
    switch (comment.type) {
      case "error": return "border-red-500/30 bg-red-500/5"
      case "warning": return "border-yellow-500/30 bg-yellow-500/5"
      case "success": return "border-neon/30 bg-neon/5"
    }
  }

  const getSeverityColor = () => {
    switch (comment.severity) {
      case "high": return "bg-red-500/20 text-red-500"
      case "medium": return "bg-yellow-500/20 text-yellow-500"
      case "low": return "bg-neon/20 text-neon"
    }
  }

  return (
    <div
      className={`p-3 rounded-lg border transition-all duration-500 ${getBg()} ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono text-muted-foreground">{comment.file}:{comment.line}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded ${getSeverityColor()}`}>
              {comment.severity}
            </span>
          </div>
          <p className="text-sm text-foreground/90">{comment.message}</p>
        </div>
      </div>
    </div>
  )
}

export function LivePreview() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"comments" | "files">("comments")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-24 bg-muted/30 border-y border-border overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-neon border border-neon/30 rounded-full bg-neon/5">
            LIVE PREVIEW
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            See AI Reviews in <span className="text-neon">Action</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Watch how our AI analyzes your code and provides actionable feedback in real-time.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
            {/* Window header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-4 text-sm font-mono text-muted-foreground">
                  codereview.ai/dashboard
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  2.3s review time
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  @developer
                </span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
              {/* Sidebar - Files */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="w-4 h-4 text-neon" />
                  <span className="text-sm font-medium">feature/user-auth</span>
                </div>
                <div className="space-y-2">
                  {files.map((file, i) => (
                    <div
                      key={file.name}
                      className={`flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-300 ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                      style={{ transitionDelay: `${300 + i * 100}ms` }}
                    >
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <span className="text-xs text-neon font-mono">{file.changes}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main - Review comments */}
              <div className="lg:col-span-2 p-4">
                {/* Tabs */}
                <div className="flex items-center gap-4 mb-4 border-b border-border pb-3">
                  <button
                    onClick={() => setActiveTab("comments")}
                    className={`flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-colors ${
                      activeTab === "comments"
                        ? "border-neon text-neon"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    AI Comments
                    <span className="px-1.5 py-0.5 text-xs bg-muted rounded">3</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("files")}
                    className={`flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-colors ${
                      activeTab === "files"
                        ? "border-neon text-neon"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <FileCode className="w-4 h-4" />
                    Changed Files
                    <span className="px-1.5 py-0.5 text-xs bg-muted rounded">4</span>
                  </button>
                </div>

                {/* Comments list */}
                <div className="space-y-3">
                  {reviewComments.map((comment, index) => (
                    <ReviewComment
                      key={index}
                      comment={comment}
                      index={index}
                      isVisible={isVisible}
                    />
                  ))}
                </div>

                {/* Summary bar */}
                <div
                  className={`mt-4 p-3 rounded-lg bg-muted/50 border border-border flex items-center justify-between transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "800ms" }}
                >
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-red-500">
                      <XCircle className="w-4 h-4" /> 1 error
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <AlertTriangle className="w-4 h-4" /> 1 warning
                    </span>
                    <span className="flex items-center gap-1 text-neon">
                      <CheckCircle2 className="w-4 h-4" /> 1 suggestion
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    PR Score: 78/100
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
