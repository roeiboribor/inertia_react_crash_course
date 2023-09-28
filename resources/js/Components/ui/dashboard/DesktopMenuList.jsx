import NavLink from "@/Components/NavLink";
import { routes } from "@/Utils/constants/routes.js";

const DesktopMenuList = () => {
    return (
        <>
            {routes.length !== 0 &&
                routes.map((item, index) => (
                    <NavLink
                        key={`nav-link-${index}`}
                        href={item.value ? route(item.value) : item.link}
                        active={route().current(
                            item.value ? item.value : item.link
                        )}
                    >
                        {item.name}
                    </NavLink>
                ))}
        </>
    );
};

export default DesktopMenuList;
