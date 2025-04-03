import { SendIcon } from '@/components/icons/SendIcon'

export type TextAreaProps = {
    todo: string
    setTodo: (value: string) => void
    addTask: () => void
    className?: string
}

export const TextArea = ({ todo, setTodo, addTask, className }: TextAreaProps) => {

    const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            addTask()
        }
    }

    return (

        <div className=" sticky bottom-0 left-0 w-full dark:bg-gray-900 bg-white">
            <div className="relative max-w-xl mx-auto px-4 pb-4">

                <textarea
                    className="rounded-xl resize-none w-full h-32 p-2 text-left outline outline-1 outline-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300 shadow-xl bg-white dark:bg-gray-800 text-black dark:text-white"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onKeyDown={handleEnterPress}
                    placeholder="Введите текст задачи..."
                />

                <button
                    onClick={addTask}
                    className="absolute right-2 inset-y-1 px-2 pb-4 rounded-full"
                >
                    <SendIcon className="h-8 md:h-10 lg:h-12 px-2"/>
                </button>

            </div>
        </div>
    )
}

export default TextArea
