function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-bold mb-4">FlyTrack</h4>
          <p className="text-gray-400 text-sm">Gestión inteligente de aeropuertos</p>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Producto</h5>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Características</a></li>
            <li><a href="#" className="hover:text-white">Precios</a></li>
            <li><a href="#" className="hover:text-white">Seguridad</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Empresa</h5>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Sobre nosotros</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Legal</h5>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Privacidad</a></li>
            <li><a href="#" className="hover:text-white">Términos</a></li>
            <li><a href="#" className="hover:text-white">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-slate-700 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2026 FlyTrack. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
