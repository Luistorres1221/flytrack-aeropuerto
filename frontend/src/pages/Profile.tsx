function Profile() {
  const user = {
    name: "Juan García",
    email: "juan@example.com",
    phone: "+34 912 345 678",
    joined: "2024-01-15",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
              JG
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">Miembro desde {user.joined}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 bg-gray-100 rounded border disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                value={user.phone}
                disabled
                className="w-full px-4 py-2 bg-gray-100 rounded border disabled:opacity-50"
              />
            </div>
          </div>

          <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
