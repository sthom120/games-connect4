function BottomNav({ currentScreen, onChangeScreen }) {
  const navItems = [
    {
      id: "dashboard",
      label: "Games",
      icon: `${import.meta.env.BASE_URL}icons/bottom-nav-games-icon.svg`,
    },
    {
      id: "support",
      label: "Support",
      icon: `${import.meta.env.BASE_URL}icons/bottom-nav-messages-icon.svg`,
    },
    {
      id: "settings",
      label: "Settings",
      icon: `${import.meta.env.BASE_URL}icons/bottom-nav-settings-icon.svg`,
    },
  ];

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={
              isActive ? "bottom-nav-button active" : "bottom-nav-button"
            }
            onClick={() => onChangeScreen(item.id)}
            aria-current={isActive ? "page" : undefined}
          >
            <img
              className="bottom-nav-icon"
              src={item.icon}
              alt=""
              aria-hidden="true"
            />

            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;