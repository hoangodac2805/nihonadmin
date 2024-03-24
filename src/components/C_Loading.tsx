import useLoading from "../customHooks/useLoading"

const Loading = () => {
    const loadingStore = useLoading();
    if(!loadingStore.isLoading) return '';
    return (
        <div className="fixed inset-0 h-screen w-screen flex justify-center items-center z-50 opacity-50 bg-white">
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>
    )
}

export default Loading