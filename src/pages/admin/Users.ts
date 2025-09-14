import { useState } from 'react';
import { faker } from '@faker-js/faker'
// import { useNavigate } from 'react-router-dom';
export interface User {
    id?: number;
    _oid?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    photo?: string;
    username?: string;
}
export const generateUsers = (count: number = 10000): User[] => {
    const authors: User[] = [];

    for (let i = 0; i < count; i++) {
        // const prefixes = ['7', '8', '9'];
        // const prefix = faker.helpers.arrayElement(prefixes);
        authors.push({
            id: i + 1,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            phone: faker.phone.number({style: 'international'}),
            photo: faker.image.avatar(),
        });
    }

    return authors;
};
export const useUserList = () => {
    // const navigate = useNavigate();
    // const [formData, setFormData] = useState<User>({
    //     email: '',
    //     name: '',
    //     _oid: ''
    // });
    // const users: User[] = []
    const fetchUsers = async (): Promise<User[]> => {
        try {
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // const authors: Author[] = generateAuthors(10000);
            return generateUsers(100);
        } catch (error) {
            console.error("Error fetching authors:", error);
            return [];
        }
    }

    return {
        fetchUsers,
        // getAuthors
        // formData
    }
}