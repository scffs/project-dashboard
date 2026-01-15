"use client"

import { useState } from "react"
import { Paperclip, Microphone, UploadSimple, Tag } from "@phosphor-icons/react/dist/ssr"

import type { User } from "@/lib/data/project-details"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type CreateNoteModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    currentUser: User
    onCreateNote: (title: string, content: string) => void
    onUploadAudio: () => void
}

export function CreateNoteModal({
    open,
    onOpenChange,
    currentUser,
    onCreateNote,
    onUploadAudio,
}: CreateNoteModalProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)

    const handleCreate = () => {
        onCreateNote(title, content)
        setTitle("")
        setContent("")
        onOpenChange(false)
    }

    const handleUploadClick = () => {
        onUploadAudio()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 gap-0 rounded-3xl border border-border shadow-2xl">
                <DialogHeader className="p-6 pb-0">
                    <VisuallyHidden>
                        <DialogTitle>Create Note</DialogTitle>
                    </VisuallyHidden>
                    <div className="flex items-center justify-between">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note title"
                            className="border-none text-xl font-medium p-0 h-auto focus-visible:ring-0 shadow-none placeholder:text-muted-foreground/60"
                        />
                    </div>
                </DialogHeader>

                <div className="px-6 py-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your note here"
                        className={cn(
                            "w-full resize-none border-none bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground/60",
                            isExpanded ? "min-h-[260px]" : "min-h-[120px]"
                        )}
                    />
                </div>

                <div className="flex justify-end px-6 -mt-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-muted-foreground"
                        onClick={() => setIsExpanded((prev) => !prev)}
                    >
                        {isExpanded ? "Collapse" : "Expand"}
                    </Button>
                </div>

                <div className="px-6 py-4 border-t border-border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50">
                                <Avatar className="h-5 w-5">
                                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                                    <AvatarFallback className="text-[10px]">
                                        {currentUser.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{currentUser.name}</span>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border">
                                <Tag className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">General note</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                                <Paperclip className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                                <Microphone className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={handleUploadClick}>
                                <UploadSimple className="h-4 w-4" />
                                Upload audio file
                            </Button>
                            <Button size="sm" onClick={handleCreate}>
                                Create Note
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
