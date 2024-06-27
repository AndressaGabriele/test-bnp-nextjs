import { NextApiRequest, NextApiResponse } from 'next/types';
import { IUser } from '@/types/user.d';

const users: Array<IUser> = [
    { id: 1, name: 'Usuário 1', email: 'user1@mail.com' },
    { id: 2, name: 'Usuário 2', email: 'user2@mail.com' },
	{ id: 3, name: 'Usuário 3', email: 'user3@mail.com' },

];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return res.status(200).json(users);
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}