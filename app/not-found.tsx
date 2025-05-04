export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-140">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tighter text-gray-900 dark:text-gray-100">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Página não encontrada
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Parece que você se perdeu. Não há nada aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
