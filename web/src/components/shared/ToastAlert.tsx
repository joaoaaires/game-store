interface ToastAlertProps {
  title: string
  close: () => void
}

export function ToastAlert({ title, close }: ToastAlertProps) {
  return (
    <div
      className="mb-4 flex justify-center rounded-lg border border-red-700 bg-red-100 px-6 py-5 text-base text-red-700"
      role="alert"
    >
      {title}
      <button
        type="button"
        className="ml-auto inline-flex h-5 w-5 rounded-lg  text-red-700  hover:text-red-900  focus:ring-gray-300"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={close}
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  )
}
