import { useEffect, useState } from "react";
import type { User } from "../pages/admin/Users";
import { AuthService, OpenAPI } from "../openapi-request";
// export class AuthUser {
//     public [currentUser, setCurrentUser] = useState<User | null>(null);
// }
export const AuthUserState = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const getCurrentUser = async (): Promise<User | null> => {
        const token = localStorage.getItem("_token");
        if (token) {
            OpenAPI.TOKEN = token;
            try {
                const response = await AuthService.currentUser();
                setCurrentUser(response.user); // still set in internal state
                return response.user;
            } catch (error) {
                console.error("Failed to fetch current user:", error);
                localStorage.removeItem("_token");
            }
        }
        return null;
    };
    // useEffect(() => {
    //     async function load() {
    //         await getCurrentUser()
    //     }
    //     load()
    // }, [currentUser]);
    return {
        getCurrentUser,
        currentUser
    }
}