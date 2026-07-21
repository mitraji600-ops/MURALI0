import { Card } from "@/components/ui/card"

export default function PrivacySettings() {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Privacy Settings</h1>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Private Account</h3>
              <p className="text-sm text-zinc-500">Only approved followers can see your content.</p>
            </div>
            <div className="w-12 h-6 bg-zinc-800 rounded-full flex items-center p-1 cursor-pointer">
              <div className="w-4 h-4 bg-zinc-500 rounded-full" />
            </div>
          </div>
          <div className="border-t border-zinc-800" />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Allow Direct Messages</h3>
              <p className="text-sm text-zinc-500">Receive messages from anyone.</p>
            </div>
            <div className="w-12 h-6 bg-accent rounded-full flex items-center p-1 justify-end cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </Card>
    </main>
  )
}
