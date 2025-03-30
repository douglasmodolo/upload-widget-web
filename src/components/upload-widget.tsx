import * as Collapsible from "@radix-ui/react-collapsible";
import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";
import { motion, useCycle } from 'motion/react';
import { UploadWidgetMinimizedButton } from "./upload-widget-minimized-button";
import { usePendingUploads } from "../store/uploads";

export function UploadWidget() {
    const { isThereAnyPendingUploads } = usePendingUploads();

    const [ isWidgetOpen, toggleWidgetOpen ] = useCycle(false, true);
    
    return (
        <Collapsible.Root onOpenChange={() => toggleWidgetOpen()} asChild>
            <motion.div 
                data-progress={isThereAnyPendingUploads}
                className="bg-zinc-900 overflow-hidden w-[360px] animate-rotate-border rounded-xl border 
                            data-[state=open]:border-zinc-900
                            data-[state=closed]:data-[progress=false]:border-zinc-900 
                            data-[state=closed]:data-[progress=true]:border-zinc-900
                            data-[state=closed]:data-[progress=true]:bg-conic/[from_var(--border-angle)] 
                            data-[state=closed]:data-[progress=true]:from-zinc-900
                            data-[state=closed]:data-[progress=true]:via-indigo-500 
                            data-[state=closed]:data-[progress=true]:to-zinc-900 
                            data-[state=closed]:data-[progress=true]:from-80% 
                            data-[state=closed]:data-[progress=true]:via-90% 
                            data-[state=closed]:data-[progress=true]:to-100%"
                animate={isWidgetOpen ? 'open' : 'closed'}
                variants={{
                    closed: { 
                        width: 'max-content', 
                        height: 30,
                        transition: {
                            type: 'keyframe',
                        }
                    },
                    open: { 
                        width: 360, 
                        height: 'auto',
                        transition: {
                            duration: 0.2,

                        }
                    },
                }}
            >
                <div
                    className="bg-zinc-900 overflow-hidden rounded-xl w-[calc(100%-px)] h-[calc(100%-3px)] m-0.5"                    
                >
                    {!isWidgetOpen && <UploadWidgetMinimizedButton />}

                    <Collapsible.Content>
                        <UploadWidgetHeader />

                        <div className="flex flex-col gap-4 py-3">
                            <UploadWidgetDropzone />

                            <div className="h-px bg-zinc-800 border-t border-black/50 box-content" />

                            <UploadWidgetUploadList />
                        </div>
                    </Collapsible.Content>
                </div>
            </motion.div>
        </Collapsible.Root>
    )
}