export interface RouteType {
    path: string;
    name: string;
    title: string;
    leftIcon?: string;
    rightIcon?:string;
}
export const navigationList : RouteType[] = [
    {
        path: "/dashboard",
        name: "dashboard",
        title: "Dashboard",
        leftIcon: "",
        rightIcon : "",
    },
    {
        path: "/permissions",
        name: "roles-permissions",
        title: "Role's Permissions",
        leftIcon: "",
        rightIcon : "",
    },
    {
        path: "/roles",
        name: "roles",
        title: "Roles",
        leftIcon: "",
        rightIcon : "",
    },
    {
        path: "/user-list",
        name: "user-list",
        title: "Users",
        leftIcon: "",
        rightIcon : "",
    },
    {
        path: "/branch-list",
        name: "branch-list",
        title: "Branch",
        leftIcon: "",
        rightIcon : "",
    },
    {
        path: "/branch-managers",
        name: "branch-managers",
        title: "Branch Managers",
        leftIcon: "",
        rightIcon : "",
    },
    {
        path: "/customer-list",
        name: "customer-list",
        title: "Customers",
        leftIcon: "",
        rightIcon : "",
    },
    {
        path: "/customer-applications",
        name: "customer-applications",
        title: "Applications",
        leftIcon: "",
        rightIcon : "",
    }
]