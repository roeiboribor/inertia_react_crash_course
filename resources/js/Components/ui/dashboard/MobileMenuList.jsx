import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { routes } from "@/Utils/constants/routes.js";

const MobileMenuList = () => {
    return (
        <>
            {routes.length !== 0 &&
                routes.map((item, index) => (
                    <ResponsiveNavLink
                        key={`responsive-nav-link-${index}`}
                        href={item.value ? route(item.value) : item.link}
                        active={route().current(
                            item.value ? item.value : item.link
                        )}
                    >
                        {item.name}
                    </ResponsiveNavLink>
                ))}
        </>
    );
};

export default MobileMenuList;
