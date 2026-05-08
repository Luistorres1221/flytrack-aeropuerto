function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-xl text-blue-100 mb-8">La página que buscas no existe.</p>
        <a href="/" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition inline-block">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

export default NotFound;
