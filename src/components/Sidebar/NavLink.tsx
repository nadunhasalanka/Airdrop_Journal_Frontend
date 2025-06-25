const NavLink = ({ href, icon, children, isActive = false }: { href: string; icon: React.ReactNode; children: React.ReactNode; isActive?: boolean; }) => (
    <li>
        <a 
            href={href}
            className={`flex items-center p-3 my-1 rounded-lg transition-colors ${
                isActive 
                ? 'bg-indigo-500/20 text-slate-50 font-semibold' 
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
        >
            <div className="w-6 h-6 mr-3">{icon}</div>
            <span>{children}</span>
        </a>
    </li>
);

export default NavLink;