import { useNavigate } from "react-router-dom";

function NavLink({ to, label, active = false }: { to: string; label: string; active?: boolean }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`text-sm font-medium transition ${
        active
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-600 hover:text-blue-600"
      }`}
    >
      {label}
    </button>
  );
}

export default NavLink;
